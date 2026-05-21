import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function renderCaddy(cfg) {
  const tpl = fs.readFileSync(path.join(__dirname, "../templates/Caddyfile.tpl"), "utf-8");

  return tpl
    .replaceAll("{{domain}}", cfg.domain)
    .replaceAll("{{deployDir}}", cfg.deployDir)
    .replaceAll("{{backend}}", cfg.backend || "localhost:3000");
}
