import { fs } from "../deps.ts";
import { MarkdownFileWithContent } from "../types.ts";

export const getMarkdownFiles = async (
  excludeCsv?: string
): Promise<MarkdownFileWithContent[]> => {
  const exclude =
    typeof excludeCsv === "undefined" || excludeCsv.length === 0
      ? []
      : excludeCsv.split(",");

  const results = [];
  for await (const file of fs.expandGlob("**/*.md", { exclude })) {
    const { path, name } = file;

    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(file.path);
    const content = decoder.decode(data);

    results.push({ path, name, content });
  }
  return results;
};
