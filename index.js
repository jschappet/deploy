#!/usr/bin/env node

import { loadConfig } from "../lib/config.js";
import { execSync } from "child_process";
import fs from "fs-extra";

const configPath = process.argv[2];

if (!configPath) {
  console.error("Usage: deploy <config.toml>");
  process.exit(1);
}

const cfg = loadConfig(configPath);

console.log("Deploying:", cfg.name);

// ----------------------------
// Git update
// ----------------------------
execSync(`cd ${cfg.buildDir} && git fetch origin && git checkout ${cfg.gitBranch} && git pull`);

// ----------------------------
// Build
// ----------------------------
execSync(`cd ${cfg.buildDir} && ${cfg.buildCmd}`, { stdio: "inherit" });

// ----------------------------
// Release
// ----------------------------
const date = new Date().toISOString().slice(0, 10);
const releaseDir = `${cfg.deployDir}/releases/${date}`;
const current = `${cfg.deployDir}/current`;

fs.ensureDirSync(releaseDir);

// copy output
fs.copySync(
  `${cfg.buildDir}/${cfg.outputDir}`,
  releaseDir
);

// atomic switch
fs.symlinkSync(releaseDir, current, "dir");

console.log("Deploy complete:", date);
