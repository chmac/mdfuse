import { Cliffy } from "./deps.ts";
import { getMarkdownFiles } from "./src/getMarkdownFiles.ts";
import { buildIndex } from "./src/buildIndex.ts";
import { filterIndexForTag } from "./src/filterIndexForTag.ts";
import { applyQuery } from "./src/applyQuery.ts";

await new Cliffy.Command()
  .name("md-fuse")
  .version("0.1.0")
  .option(
    "-l <count:integer>, --limit <count:integer>",
    "Limit the number of results"
  )
  .option("-t <tag> --tag <tag>", "Tags to match before applying the query")
  .arguments("[query:string]")
  .description("Simple fuse based search of markdown documents")
  .action(async ({ tag, limit }, query) => {
    const files = await getMarkdownFiles();

    const index = buildIndex(files);

    const filteredIndex = filterIndexForTag(index, tag);

    const results = applyQuery(filteredIndex, query, limit);

    console.log(
      `#7Gbiec Run with tag ${tag} query ${query} and limit ${limit}`
    );
    console.log(
      `#kzKuGe Got ${results.length} results from ${index.length} items`
    );
    console.log(results);
  })
  .parse(Deno.args);

// console.log(`Your query was ${search}`);
