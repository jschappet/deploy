import fs from "fs";
import path from "path";

const SITES_ROOT = path.resolve(process.env.HOME, "git/sites");

export function listSites() {
  if (!fs.existsSync(SITES_ROOT)) return [];

  return fs.readdirSync(SITES_ROOT)
    .filter(dir => {
      const configPath = path.join(SITES_ROOT, dir, "deploy.site.toml");
      return fs.existsSync(configPath);
    });
}

export function getSiteConfigPath(name) {
  return path.join(SITES_ROOT, name, "deploy.site.toml");
}
