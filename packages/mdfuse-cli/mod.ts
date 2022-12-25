import { Cliffy } from "./deps.ts";
import { getMarkdownFiles } from "./src/getMarkdownFiles.ts";
import { buildIndex } from "./src/buildIndex.ts";
import { filterIndexForHeading } from "./src/filterIndexForHeading.ts";
import { filterIndexForTag } from "./src/filterIndexForTag.ts";
import { applyQuery } from "./src/applyQuery.ts";
import { renderResults } from "./src/renderResults.ts";

await new Cliffy.Command()
  .name("md-fuse")
  .version("0.1.0")
  .option(
    "-l <count:integer>, --limit <count:integer>",
    "Limit the number of results"
  )
  .option(
    "-H <heading> --heading <heading>",
    "Heading to match before applying the query"
  )
  .option("-t <tag> --tag <tag>", "Tags to match before applying the query")
  .arguments("[query:string]")
  .description("Simple fuse based search of markdown documents")
  .action(async ({ limit, heading, tag }, query) => {
    const files = await getMarkdownFiles();

    const index = buildIndex(files);

    const filteredForHeadingsIndex = filterIndexForHeading(index, heading);

    const filteredIndex = filterIndexForTag(filteredForHeadingsIndex, tag);

    const results = applyQuery(filteredIndex, query, limit);

    renderResults(results);
  })
  .parse(Deno.args);

// console.log(`Your query was ${search}`);
