
export interface UnicornStudioNamespace {
    scenes: UnicornScene[]; // not public api btw

    init(): Promise<any>;
    destroy(): void;
    addScene(opts: UnicornSceneOpts): Promise<UnicornScene>;
}

// incomplete of course
export interface UnicornSceneOpts {
    element: HTMLElement,
    fps?: number,
    scale?: number,
    dpi?: number,
    filePath: string,
    lazyLoad: boolean,
    fixed: boolean,
    production: boolean
}

export interface UnicornScene {
    paused: boolean;
    element: HTMLElement;

    resize(): void;
    destroy(): void;
}
