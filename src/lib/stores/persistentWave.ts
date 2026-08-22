import { writable } from 'svelte/store';

export interface PersistentWaveStoreState {
    hostEl: HTMLElement | null;
    waveEl: HTMLElement | null;
}

const store = writable<PersistentWaveStoreState>({
    hostEl: null,
    waveEl: null
});

export const persistentWaveStore = {
    subscribe: store.subscribe,
    setHost: (el: HTMLElement | null) => {
        store.update((s) => {
            const next = { ...s, hostEl: el };
            if (el && s.waveEl && s.waveEl.parentElement !== el && !document.body.contains(s.waveEl.parentElement)) {
                el.appendChild(s.waveEl);
            }
            return next;
        });
    },
    setWave: (el: HTMLElement | null) => {
        store.update((s) => {
            const next = { ...s, waveEl: el };
            if (el && s.hostEl && el.parentElement !== s.hostEl) {
                s.hostEl.appendChild(el);
            }
            return next;
        });
    },
    attachTo: (targetEl: HTMLElement | null) => {
        store.update((s) => {
            if (s.waveEl && targetEl) {
                targetEl.appendChild(s.waveEl);
                persistentWaveStore.notifyResize();
            }
            return s;
        });
    },
    resetToHost: (fromEl?: HTMLElement | null) => {
        store.update((s) => {
            if (s.waveEl && s.hostEl) {
                if (!fromEl || s.waveEl.parentElement === fromEl) {
                    s.hostEl.appendChild(s.waveEl);
                }
            }
            return s;
        });
    },
    notifyResize: () => {
        if (typeof window !== 'undefined') {
            requestAnimationFrame(() => {
                window.dispatchEvent(new Event('resize'));
            });
        }
    }
};

export default persistentWaveStore;
