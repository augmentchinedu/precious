{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.git
    pkgs.nodejs_22
  ];

  idx = {
    workspace = {
      onStart = {
      };
    };
  };
}