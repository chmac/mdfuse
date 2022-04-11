import { fs, readdirp } from "./deps.ts";

type IndexEntry = {
  name: string;
};

export const buildIndex = async ({
  path,
}: {
  path: string;
}): Promise<IndexEntry[]> => {
  const files = await readdirp.promise(path);

  for (const file in files) {
    // Load the file
    // Parse the content
    console.log("#M9xl0k Got file", file);
  }

  return [];
};
