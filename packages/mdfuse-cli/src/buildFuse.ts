import { Fuse } from "../deps.ts";
import { IndexEntry } from "../types.ts";

export const buildFuse = (index: IndexEntry[]) => {
  const flatIndex = index.map((entry) => {
    return {
      content: entry.segment.content,
      type: entry.segment.type,
      path: entry.file.path,
      name: entry.file.name,
    };
  });

  const fuse = new Fuse(flatIndex, {
    includeScore: true,
    includeMatches: true,
    // keys: ["content", "type", "path", "name"],
    keys: ["content"],
  });

  return fuse;
};
