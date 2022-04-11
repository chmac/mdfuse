import { IndexEntry } from "../types.ts";

export const filterIndexForTag = (index: IndexEntry[], tag?: string) => {
  if (typeof tag === "undefined") {
    return index;
  }

  const filtered = index.filter((entry) => entry.tags.includes(tag));

  return filtered;
};
