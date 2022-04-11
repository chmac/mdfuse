import { Fuse } from "../deps.ts";
import { IndexEntry } from "../types.ts";

export const applyQuery = (
  index: IndexEntry[],
  query?: string,
  limit?: number
) => {
  if (typeof query === "undefined") {
    return index;
  }

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
    includeMatches: false,
    // keys: ["content", "type", "path", "name"],
    keys: ["content"],
  });

  const options = typeof limit === "undefined" ? undefined : { limit };

  const results = fuse.search(query, options);

  return results;
};
