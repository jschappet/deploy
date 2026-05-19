import { execSync } from "child_process";

export function buildSite(cfg) {
  execSync(`cd ${cfg.buildDir} && ${cfg.buildCmd}`, {
    stdio: "inherit"
  });
}
