import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { SITES_ROOT } from "./env.js";

export function cloneSite(repoUrl) {
  const repoName = path.basename(repoUrl, ".git");
  const siteDir = path.join(SITES_ROOT, repoName);

  if (fs.existsSync(siteDir)) {
    console.error(`Site directory already exists: ${siteDir}`);
    process.exit(1);
  }

  console.log(`Cloning ${repoUrl} into ${siteDir}...`);
  execSync(`git clone ${repoUrl} ${siteDir}`, { stdio: "inherit" });

  const configPath = path.join(siteDir, "deploy.site.toml");
  if (!fs.existsSync(configPath)) {
    console.error(`No deploy.site.toml found in cloned repo. Expected: ${configPath}`);
    process.exit(1);
  }

  console.log(`\nReady. Deploy with:`);
  console.log(` deploy ${repoName}`);
}
