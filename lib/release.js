import fs from "fs-extra";

export function releaseSite(cfg, date) {
  const releaseDir = `${cfg.deployDir}/releases/${date}`;
  const current = `${cfg.deployDir}/current`;

  fs.ensureDirSync(releaseDir);

  fs.copySync(
    `${cfg.buildDir}/${cfg.outputDir}`,
    releaseDir
  );

  fs.symlinkSync(releaseDir, current, "dir");

  return releaseDir;
}
