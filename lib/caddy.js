import fs from "fs";

export function renderCaddy(cfg) {
  const tpl = fs.readFileSync("./templates/Caddyfile.tpl", "utf-8");

  return tpl
    .replaceAll("{{domain}}", cfg.domain)
    .replaceAll("{{deployDir}}", cfg.deployDir)
    .replaceAll("{{backend}}", cfg.backend || "localhost:3000");
}
