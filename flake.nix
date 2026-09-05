{
  # use cache cuz no way we are compiling rust
  nixConfig = {
    extra-substituters = [
      "https://nix-community.cachix.org"
    ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

    bun2nix = {
      url = "github:nix-community/bun2nix";
      inputs.systems.url = "github:nix-systems/default";

      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs: let
    inherit (inputs.nixpkgs) lib;

    systems = [
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ];
    forAllSystems = lib.genAttrs systems;

    pkgsFor = forAllSystems (
      system:
        import inputs.nixpkgs {
          inherit system;
          overlays = [inputs.bun2nix.overlays.default];
        }
    );
  in {
    packages = forAllSystems (system: {
      default = pkgsFor.${system}.callPackage ./nix/default.nix {};
    });

    devShells = forAllSystems (system: {
      default = pkgsFor.${system}.mkShell {
        packages = with pkgsFor.${system}; [
          bun
          bun2nix

          # svelte-check
          # vite
          # typescript
        ];
      };
    });
  };
}
