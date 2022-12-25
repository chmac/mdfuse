export type MarkdownFileWithContent = {
  path: string;
  name: string;
  content: string;
};

export type IndexSegment = {
  type: string;
  content: string;
  heading?: string;
};

export type IndexEntry = {
  segment: IndexSegment;
  frontmatter: unknown;
  file: MarkdownFileWithContent;
  tags: string[];
};
