#!/usr/bin/env node

import fs from "fs";
import { loadConfig } from "../lib/config.js";
import { updateRepo } from "../lib/git.js";
import { buildSite } from "../lib/build.js";
import { releaseSite } from "../lib/release.js";
import { renderCaddy } from "../lib/caddy.js";
import { listSites, getSiteConfigPath } from "../lib/sites.js";

const cmd = process.argv[2];

// ----------------------------
// LIST SITES (filesystem-driven)
// ----------------------------
if (cmd === "list") {
  const sites = listSites();

  console.log("Available sites:");
  sites.forEach(s => console.log(" -", s));

  process.exit(0);
}

// ----------------------------
// DEPLOY SITE
// ----------------------------
if (!cmd) {
  console.log("Usage: deploy <site>|list");
  process.exit(0);
}

const cfgPath = getSiteConfigPath(cmd);

if (!fs.existsSync(cfgPath)) {
  console.error("Site not found:", cmd);
  process.exit(1);
}

const cfg = loadConfig(cfgPath);
const date = new Date().toISOString().slice(0, 10);

console.log("Deploying:", cfg.name);

// pipeline
updateRepo(cfg);
buildSite(cfg);
const releaseDir = releaseSite(cfg, date);

console.log("Released to:", releaseDir);

console.log("\n--- CADDY CONFIG ---\n");
console.log(renderCaddy(cfg));
