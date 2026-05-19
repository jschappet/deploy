import fs from "fs";
import toml from "toml";

export function loadConfig(path) {
  const raw = fs.readFileSync(path, "utf-8");
  const cfg = toml.parse(raw);

  return {
    name: cfg.name,
    domain: cfg.domain,
    deployDir: cfg.deploy_dir,
    buildDir: cfg.build_dir,
    gitRepo: cfg.git_repo,
    gitBranch: cfg.git_branch,
    buildCmd: cfg.build_cmd,
    outputDir: cfg.output_dir,
    backend: cfg.backend
  };
}
