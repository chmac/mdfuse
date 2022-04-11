import { Cliffy } from "./deps.ts";
import { getMarkdownFiles } from "./src/getMarkdownFiles.ts";
import { buildIndex } from "./src/buildIndex.ts";
import { buildFuse } from "./src/buildFuse.ts";

await new Cliffy.Command()
  .name("md-fuse")
  .version("0.1.0")
  .option(
    "-l <count:integer>, --limit <count:integer>",
    "Limit the number of results"
  )
  .arguments("<query:string>")
  .description("Simple fuse based search of markdown documents")
  .action(async ({ limit }, query) => {
    const files = await getMarkdownFiles();

    const index = buildIndex(files);

    const fuse = buildFuse(index);

    const options = typeof limit === "undefined" ? undefined : { limit };
    const results = fuse.search(query, options);

    console.log(`#7Gbiec Run with query ${query}`);
    console.log(
      `#kzKuGe Got ${results.length} results from ${index.length} items`
    );
    console.log(results);
  })
  .parse(Deno.args);

// console.log(`Your query was ${search}`);
