import { IndexEntry } from "../types.ts";

export const filterIndexForHeading = (
  index: IndexEntry[],
  heading?: string
) => {
  if (typeof heading === "undefined") {
    return index;
  }

  const filtered = index.filter((entry): boolean => {
    if (typeof entry.segment.heading === "undefined") {
      return false;
    }

    return entry.segment.heading.toLowerCase().includes(heading);
  });

  return filtered;
};
