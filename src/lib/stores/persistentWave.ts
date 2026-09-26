import { writable, type Writable } from 'svelte/store';

export interface PersistentWaveStoreState {
    hostEl: HTMLElement | null;
    waveEl: HTMLElement | null;
}

function makeStore() {
    return writable<PersistentWaveStoreState>({ hostEl: null, waveEl: null });
}

export const stores = {
    homepageCubes: makeStore(),
    dottyLogo: makeStore() // reused waves on /about and /donate
};

export function setHost(store: Writable<PersistentWaveStoreState>, el: HTMLElement | null) {
    store.update((s) => {
        const next = { ...s, hostEl: el };
        if (el && s.waveEl && s.waveEl.parentElement !== el && !document.body.contains(s.waveEl.parentElement)) {
            el.appendChild(s.waveEl);
        }
        return next;
    });
};

export function setWave(store: Writable<PersistentWaveStoreState>, el: HTMLElement | null) {
    store.update((s) => {
        const next = { ...s, waveEl: el };
        if (el && s.hostEl && el.parentElement !== s.hostEl) {
            s.hostEl.appendChild(el);
        }
        return next;
    });
};

export function attachTo(store: Writable<PersistentWaveStoreState>, targetEl: HTMLElement | null) {
    store.update((s) => {
        if (s.waveEl && targetEl) {
            targetEl.appendChild(s.waveEl);
            notifyResize();
        }
        return s;
    });
};

export function resetToHost(store: Writable<PersistentWaveStoreState>, fromEl?: HTMLElement | null) {
    store.update((s) => {
        if (s.waveEl && s.hostEl) {
            if (!fromEl || s.waveEl.parentElement === fromEl) {
                s.hostEl.appendChild(s.waveEl);
            }
        }
        return s;
    });
};

export function notifyResize() {
    if (typeof window !== 'undefined') {
        requestAnimationFrame(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }
};
