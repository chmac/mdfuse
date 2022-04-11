import { Fuse } from "../deps.ts";
import { IndexEntry } from "../types.ts";

export const applyQuery = (
  index: IndexEntry[],
  query?: string,
  limit?: number
): Fuse.FuseResult<IndexEntry>[] => {
  if (typeof query === "undefined") {
    return index.map((item) => {
      return { score: 1, refIndex: -1, item };
    });
  }

  // const flatIndex = index.map((entry) => {
  //   return {
  //     content: entry.segment.content,
  //     type: entry.segment.type,
  //     path: entry.file.path,
  //     name: entry.file.name,
  //   };
  // });

  const fuse = new Fuse(index, {
    includeScore: true,
    includeMatches: false,
    keys: ["segment.content"],
  });

  const options = typeof limit === "undefined" ? undefined : { limit };

  const results = fuse.search(query, options);

  return results;
};
