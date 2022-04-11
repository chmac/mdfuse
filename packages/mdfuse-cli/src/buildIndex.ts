import { frontmatter, split } from "../deps.ts";
import { MarkdownFileWithContent, IndexEntry } from "../types.ts";

const caughtFrontmatter = (input: string) => {
  try {
    return frontmatter.parse(input);
  } catch (error) {
    console.error("#ayzgJ4 Error parsing frontmatter. Error:");
    console.error(error);
    console.error("#ayzgJ4 Input:");
    console.error(input);
    throw error;
  }
};

export const buildIndex = (files: MarkdownFileWithContent[]): IndexEntry[] => {
  const results = files.map((file) => {
    const parseResult = caughtFrontmatter(file.content);
    const segments = split(parseResult.content);
    const augmentedSegments = segments
      .map((segment) => {
        if (Array.isArray(segment)) {
          const listSegements = segment.map((item) => {
            return { type: "listItem", content: item };
          });
          return listSegements;
        }
        return { type: "text", content: segment };
      })
      .flat();
    const results = augmentedSegments.map((segment) => {
      return {
        segment,
        frontmatter: parseResult.data,
        file,
      };
    });
    return results;
  });
  return results.flat();
};
