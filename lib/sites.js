import fs from "fs";
import path from "path";
import { SITES_ROOT } from "./env.js";

export { SITES_ROOT };

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
