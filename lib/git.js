import { execSync } from "child_process";

export function updateRepo(cfg) {
  execSync(
    `cd ${cfg.buildDir} && git fetch origin && git checkout ${cfg.gitBranch} && git pull`,
    { stdio: "inherit" }
  );
}
