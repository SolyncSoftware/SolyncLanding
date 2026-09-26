import performanceStore from '$lib/stores/performance.js';
import { browser } from '$app/environment';
import { get } from 'svelte/store';

let cachedCheck: Promise<void> | null = null;

export const DEFAULT_FPS_THRESHOLD = 45;
export const DEFAULT_FPS_SAMPLE_MS = 2000;
export const PERFORMANCE_CHECK_TTL_MS = 24 * 60 * 60 * 1000;
const PERFORMANCE_CHECK_STORAGE_KEY = 'solync:performance-check:v1';

type PersistedPerformanceCheck = {
    timestamp: number;
    canUseWebgl: boolean;
    initialFps: number | null;
    postInitFps: number | null;
    disableReason: string | null;
    softwareRenderer?: boolean;
};

function doCaching(
    canUseWebgl: boolean,
    disableReason: string | null,
    initialFps: number | null = null,
    postInitFps: number | null = null
) {
    try {
        const payload: PersistedPerformanceCheck = {
            timestamp: Date.now(),
            canUseWebgl,
            initialFps,
            postInitFps,
            disableReason
        };
        localStorage.setItem(PERFORMANCE_CHECK_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
        console.warn('Unable to persist performance check cache', e);
    }
}

function isHardwareAccelerated(): boolean {
    if (!browser) return true;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    if (!gl) return false;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return true;

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

    const softwareKeywords = ['swiftshader', 'llvmpipe', 'software', 'basic render', 'mesa offscreen'];
    const combined = (renderer + ' ' + vendor).toLowerCase();
    return !softwareKeywords.some((keyword) => combined.includes(keyword));
}

export const fpsMonitor = (duration: number): Promise<number> => {
    return new Promise((resolve) => {
        let frames = 0;
        const start = performance.now();

        const check = (now: number) => {
            frames++;
            if (now - start >= duration) {
                resolve((frames * 1000) / (now - start));
                return;
            }
            requestAnimationFrame(check);
        };
        requestAnimationFrame(check);
    });
};

export async function runGlobalCachedPerfCheck(opts?: { duration?: number; fpsThreshold?: number }) {
    if (!browser) return;
    if (cachedCheck) return cachedCheck;

    const duration = opts?.duration ?? DEFAULT_FPS_SAMPLE_MS;
    const fpsThreshold = opts?.fpsThreshold ?? DEFAULT_FPS_THRESHOLD;

    cachedCheck = (async () => {
        if (browser) {
            try {
                const raw = localStorage.getItem(PERFORMANCE_CHECK_STORAGE_KEY);
                if (raw) {
                    const cached = JSON.parse(raw) as PersistedPerformanceCheck;
                    if (Date.now() - cached.timestamp < PERFORMANCE_CHECK_TTL_MS) {
                        performanceStore.update((s) => ({
                            ...s,
                            checked: true,
                            canUseWebgl: cached.canUseWebgl,
                            initialFps: cached.initialFps,
                            postInitFps: cached.postInitFps,
                            disableReason: cached.disableReason
                        }));
                        return;
                    }
                }
            } catch (e) {
                console.warn('Unable to persist performance check cache', e);
            }
        }

        const current = get(performanceStore);
        if (current.prefersReducedMotion || current.hardwareConcurrency <= 2) {
            const disableReason = 'low-power or reduced-motion';
            performanceStore.update((s) => ({ ...s, checked: true, canUseWebgl: false, disableReason }));
            doCaching(false, disableReason);
            return;
        }

        if (browser && !isHardwareAccelerated()) {
            const disableReason = 'software-renderer';
            performanceStore.update((s) => ({ ...s, checked: true, canUseWebgl: false, disableReason }));
            doCaching(false, disableReason);
            return;
        }

        try {
            const initialFps = await fpsMonitor(duration);
            const can = initialFps >= fpsThreshold;
            const disableReason = can ? null : 'low-fps';
            performanceStore.update((s) => ({ ...s, checked: true, canUseWebgl: can, initialFps, disableReason }));
            doCaching(can, disableReason, initialFps);
        } catch (e) {
            performanceStore.update((s) => ({ ...s, checked: true, canUseWebgl: false, disableReason: 'error' }));
            doCaching(false, 'error');
        }
    })();

    return cachedCheck;
}

export function cachePostInitFpsDecision(postInitFps: number | null, canUseWebgl: boolean, disableReason: string | null) {
    if (browser) {
        try {
            const raw = localStorage.getItem(PERFORMANCE_CHECK_STORAGE_KEY);
            if (raw) {
                const cached = JSON.parse(raw) as PersistedPerformanceCheck;
                const updated: PersistedPerformanceCheck = {
                    ...cached,
                    postInitFps,
                    canUseWebgl,
                    disableReason
                };
                localStorage.setItem(PERFORMANCE_CHECK_STORAGE_KEY, JSON.stringify(updated));
            }
        } catch (e) {
            console.warn('Unable to update performance check cache with post-init results', e);
        }
    }
}

export default runGlobalCachedPerfCheck;
