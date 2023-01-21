export * as fs from "https://deno.land/std@0.134.0/fs/mod.ts";
export * as colours from "https://deno.land/std@0.134.0/fmt/colors.ts";
export * as Cliffy from "https://deno.land/x/cliffy@v0.23.0/mod.ts";
import { default as Debug } from "https://deno.land/x/debuglog/debug.ts";
// export * as frontmatter from "https://deno.land/x/frontmatter@v0.1.2/mod.ts";
export * as frontmatter from "https://raw.githubusercontent.com/chmac/frontmatter/371b2b8afcb736903ab1c8b4355829ceb519486e/mod.ts";
export { split } from "https://raw.githubusercontent.com/chmac/util-md-to-arrays/bdc5ace0d60646c87393040de01fe60bf948c41a/src/index.ts";
// @deno-types="https://deno.land/x/fuse@v6.4.1/dist/fuse.d.ts"
export { default as Fuse } from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.min.js";

const debug = Debug("md-fuse");
export { debug };
