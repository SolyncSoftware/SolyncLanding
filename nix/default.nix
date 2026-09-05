{bun2nix, ...}:
bun2nix.writeBunApplication {
  packageJson = ../package.json;

  src = ../.;

  bunDeps = bun2nix.fetchBunDeps {
    bunNix = ./bun.nix;
  };

  buildPhase = ''
    bun run build
  '';

  startScript = ''
    bun ./build/index.js
  '';
}
