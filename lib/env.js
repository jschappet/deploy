import "dotenv/config";
import path from "path";

export const SITES_ROOT = process.env.DEPLOY_SITES_ROOT
  ? path.resolve(process.env.DEPLOY_SITES_ROOT)
  : path.resolve(process.env.HOME, "git/sites");
