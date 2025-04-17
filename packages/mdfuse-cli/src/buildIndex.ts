import { debug, frontmatter, split } from "../deps.ts";
import { MarkdownFileWithContent, IndexSegment, IndexEntry } from "../types.ts";
import { hasKey } from "./utils.ts";

const caughtFrontmatter = (input: string) => {
  try {
    return frontmatter.parse(input);
  } catch (error) {
    console.error("#ayzgJ4 Error parsing frontmatter. Error:");
    console.error(error);
    console.error("#ayzgJ4 Input:");
    console.error(input);
  }
};

const caughtSplit = (input: string) => {
  try {
    return split(input);
  } catch (error) {
    console.error("#rLm6rV Error in split");
    console.error(error);
  }
};

export const buildIndex = (files: MarkdownFileWithContent[]): IndexEntry[] => {
  const results = files.flatMap((file) => {
    const parseResult = caughtFrontmatter(file.content);

    if (typeof parseResult === "undefined") {
      return;
    }

    const segments = caughtSplit(parseResult.content);

    if (typeof segments === "undefined") {
      return;
    }

    const { segments: augmentedSegments } = segments
      .map((segment) => {
        if (Array.isArray(segment)) {
          const listSegments = segment.map((item) => {
            return { type: "listItem", content: item };
          });
          return listSegments;
        }
        return { type: "text", content: segment };
      })
      .flat()
      .reduce<{ lastHeading?: string; segments: IndexSegment[] }>(
        (accumulator, segment, _index) => {
          const lastHeading = segment.content.startsWith("#")
            ? segment.content
            : accumulator.lastHeading;

          const segments = accumulator.segments.concat({
            ...segment,
            heading: lastHeading,
          });

          return {
            lastHeading,
            segments,
          };
        },
        { lastHeading: undefined, segments: [] }
      );

    debug(`#3BbRSg augmentedSegments`, augmentedSegments);

    const results = augmentedSegments.map((segment) => {
      return {
        segment,
        frontmatter: parseResult.data,
        file,
      };
    });

    const resultsWithTags = results.map((result) => {
      const frontmatterTags =
        typeof result.frontmatter === "object" &&
        result.frontmatter !== null &&
        hasKey("tags", result.frontmatter) &&
        Array.isArray(result.frontmatter.tags)
          ? result.frontmatter.tags
          : [];
      const hashtags = result.segment.content.match(/(#[\w\.]+)/g) || [];
      const contentTags = hashtags.map((hashtag) => hashtag.slice(1));
      const tags = frontmatterTags.concat(contentTags);
      return { ...result, tags };
    });

    return resultsWithTags;
  });

  const filteredResults = results.filter((v) => typeof v !== "undefined");

  return filteredResults;
};
