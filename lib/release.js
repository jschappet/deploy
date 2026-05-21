import fs from "fs-extra";

export function releaseSite(cfg, date) {
  const releaseDir = `${cfg.deployDir}/releases/${date}`;
  const current = `${cfg.deployDir}/current`;

  fs.ensureDirSync(releaseDir);

  fs.copySync(
    `${cfg.buildDir}/${cfg.outputDir}`,
    releaseDir
  );

  if (fs.existsSync(current)) {
    const stat = fs.lstatSync(current);

    if (!stat.isSymbolicLink()) {
      throw new Error(`${current} exists and is not a symlink`);
    }

    fs.removeSync(current);
  }
  fs.symlinkSync(releaseDir, current, "dir");

  return releaseDir;
}
