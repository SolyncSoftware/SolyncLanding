import performanceStore from '$lib/stores/performance.js';
import { runGlobalCachedPerfCheck } from '$lib/utils/performanceCheck.js';
import { get } from 'svelte/store';
import type { UnicornScene, UnicornSceneOpts } from './unicornTypes.js';

let initPromise: Promise<void> | null = null;
let unicornInitialized = false;

export async function tryAddScene(unicornOpts: UnicornSceneOpts): Promise<UnicornScene> {
    try {
        await initIfAllowed();
        let scene = await UnicornStudio.addScene(unicornOpts);
        checkPerfAndMaybeDisable();
        window.scrollBy({top: 5});
        setTimeout(() => {
            window.scrollBy({top: -5});
        }, 100);
        return scene
    } catch (error) {
        console.error('Error adding a scene ', error);
        throw error
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
    })
    unicornInitialized = true;
}

export function stopUnicorn(reason?: string) {
    if (!unicornInitialized) return;
    try {
        if (typeof UnicornStudio !== 'undefined' && typeof UnicornStudio.destroy === 'function') {
            UnicornStudio.destroy();
        }

        const canvases = document.querySelectorAll('canvas');
        canvases.forEach((canvas) => {
            canvas.width = 1;
            canvas.height = 1;

            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            if (gl) {
                gl.getExtension('WEBGL_lose_context')?.loseContext();
            }

            canvas.remove();
        });
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

        const canvases = document.querySelectorAll('canvas');
        canvases.forEach((canvas) => {
            canvas.width = 1;
            canvas.height = 1;

            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            if (gl) {
                gl.getExtension('WEBGL_lose_context')?.loseContext();
            }

            canvas.remove();
        });

        unicornInitialized = false;
    } catch (e) {
        console.error('error trying to dispose unicorn:', e);
    }
}

export default { initIfAllowed, stopUnicorn, disposeUnicorn };
