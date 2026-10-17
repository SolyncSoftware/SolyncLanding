import performanceStore from '$lib/stores/performance.js';
import { runGlobalCachedPerfCheck } from '$lib/utils/performanceCheck.js';
import { get } from 'svelte/store';
import type { UnicornScene, UnicornSceneOpts } from './unicornTypes.js';

let initPromise: Promise<void> | null = null;
let unicornInitialized = false;
let nextRuntimePromise: Promise<typeof UnicornStudioNext> | null = null;

async function loadNextRuntime() {
    if (typeof UnicornStudioNext !== 'undefined') return UnicornStudioNext;
    if (!nextRuntimePromise) {
        nextRuntimePromise = new Promise((resolve, reject) => {
            const baseScript = [...document.scripts].find((script) => script.src.endsWith('/vendor/unicornStudio.umd.js'));
            if (!baseScript) {
                nextRuntimePromise = null;
                reject(new Error('UnicornStudio runtime script not found'));
                return;
            }

            const script = document.createElement('script');
            script.src = new URL('unicornStudio-v2.3.0.umd.js', baseScript.src).href;
            script.async = true;
            script.onload = () => {
                if (typeof UnicornStudioNext === 'undefined') {
                    nextRuntimePromise = null;
                    reject(new Error('UnicornStudio v2 runtime failed to load'));
                    return;
                }
                resolve(UnicornStudioNext);
            };
            script.onerror = () => {
                nextRuntimePromise = null;
                reject(new Error('Unable to load UnicornStudio v2 runtime'));
            };
            document.head.appendChild(script);
        });
    }
    return nextRuntimePromise;
}

export async function tryAddScene(unicornOpts: UnicornSceneOpts): Promise<UnicornScene> {
    try {
        await initIfAllowed();
        const runtime = unicornOpts.filePath === '/solync_dots.json' ? await loadNextRuntime() : UnicornStudio;
        const scene = await runtime.addScene(unicornOpts);
        checkPerfAndMaybeDisable();
        return scene;
    } catch (error) {
        console.error('Error adding a scene ', error);
        throw error;
    }
}

async function checkPerfAndMaybeDisable() {
    await runGlobalCachedPerfCheck();
    const state = get(performanceStore);
    if (!state.canUseWebgl) {
        stopUnicorn(state.disableReason ?? 'low-fps');
    }
}

async function initIfAllowed() {
    const state = get(performanceStore);
    if (state.globalHardDisabled) throw new Error('Global Unicorn disabled');
    if (state.checked && !state.canUseWebgl) throw new Error('canUseWebgl is false');
    if (typeof UnicornStudio === 'undefined') return;
    if (unicornInitialized) return;
    if (initPromise) return initPromise;

    // this promise genuinely never resolves
    UnicornStudio.init().catch((error) => {
        stopUnicorn('unicorn-init-error');
        console.error('Error initializing UnicornStudio', error);
    });
    unicornInitialized = true;
}

function destroyCanvas(canvas: HTMLCanvasElement) {
    try {
        canvas.width = 1;
        canvas.height = 1;
        const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
        if (gl) {
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        }
        canvas.remove();
    } catch (e) {
        console.warn('failed to clean up canvas:', e);
    }
}

export function stopUnicorn(reason?: string) {
    if (!unicornInitialized) return;
    try {
        if (typeof UnicornStudio !== 'undefined' && typeof UnicornStudio.destroy === 'function') {
            UnicornStudio.destroy();
        }

        const canvases = document.querySelectorAll('.unicorn-embed canvas');
        canvases.forEach((canvas) => destroyCanvas(canvas as HTMLCanvasElement));

        const killEveryone = document.querySelectorAll('.unicorn-embed');
        killEveryone.forEach((killEveryone) => killEveryone.remove());

        unicornInitialized = false;
        performanceStore.update((s) => ({ ...s, globalHardDisabled: true, canUseWebgl: false, disableReason: reason ?? 'global-failure' }));
        console.log('KILLED UNICORN DIE DIE DIE. this should fix the cpu thread issue');
    } catch (e) {
        console.error('error trying to kill unicorn:', e);
    }
}

export function disposeUnicorn() {
    if (!unicornInitialized) return;
    try {
        if (typeof UnicornStudio !== 'undefined' && typeof UnicornStudio.destroy === 'function') {
            UnicornStudio.destroy();
        }

        const canvases = document.querySelectorAll('.unicorn-embed canvas');
        canvases.forEach((canvas) => destroyCanvas(canvas as HTMLCanvasElement));

        const killEveryone = document.querySelectorAll('.unicorn-embed');
        killEveryone.forEach((killEveryone) => killEveryone.remove());

        unicornInitialized = false;
    } catch (e) {
        console.error('error trying to dispose unicorn:', e);
    }
}

export default { initIfAllowed, stopUnicorn, disposeUnicorn };
