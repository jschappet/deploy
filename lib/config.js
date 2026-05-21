import fs from "fs";
import nodePath from "path";
import toml from "toml";

export function loadConfig(configPath) {
  const raw = fs.readFileSync(configPath, "utf-8");
  const cfg = toml.parse(raw);

  return {
    name: cfg.name,
    domain: cfg.domain,
    deployDir: cfg.deploy_dir,
    buildDir: nodePath.dirname(configPath),
    gitRepo: cfg.git_repo,
    gitBranch: cfg.git_branch,
    buildCmd: cfg.build_cmd,
    outputDir: cfg.output_dir,
    backend: cfg.backend
  };
}
