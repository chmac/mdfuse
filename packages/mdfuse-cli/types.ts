export type MarkdownFileWithContent = {
  path: string;
  name: string;
  content: string;
};

export type IndexEntry = {
  segment: {
    type: string;
    content: string;
  };
  frontmatter: unknown;
  file: MarkdownFileWithContent;
};
