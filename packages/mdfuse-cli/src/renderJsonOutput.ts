import { Fuse } from "../deps.ts";
import { IndexEntry } from "../types.ts";

export const renderJsonOutput = (results: Fuse.FuseResult<IndexEntry>[]) => {
  console.log(JSON.stringify(results));
};
