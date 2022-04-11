import { Cliffy } from "./deps.ts";
import { getMarkdownFiles } from "./src/getMarkdownFiles.ts";
import { buildIndex } from "./src/buildIndex.ts";

await new Cliffy.Command()
  .name("md-fuse")
  .version("0.1.0")
  .arguments("<query:string>")
  .description("Simple fuse based search of markdown documents")
  .action(async (options, query) => {
    const files = await getMarkdownFiles();

    const index = buildIndex(files);

    console.log(`#7Gbiec Run with query ${query}`);
    console.log(`#dWkpM0 Index`);
    console.log(index);
  })
  .parse(Deno.args);

// console.log(`Your query was ${search}`);
