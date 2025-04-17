import { Cliffy } from "./deps.ts";
import { getMarkdownFiles } from "./src/getMarkdownFiles.ts";
import { buildIndex } from "./src/buildIndex.ts";
import { filterIndexForHeading } from "./src/filterIndexForHeading.ts";
import { filterIndexForTag } from "./src/filterIndexForTag.ts";
import { applyQuery } from "./src/applyQuery.ts";
import { renderJsonOutput } from "./src/renderJsonOutput.ts";
import { renderResults } from "./src/renderResults.ts";

await new Cliffy.Command()
  .name("md-fuse")
  .version("0.2.0")
  .option(
    "-l <count:integer>, --limit <count:integer>",
    "Limit the number of results"
  )
  .option(
    "-H <heading> --heading <heading>",
    "Heading to match before applying the query"
  )
  .option("-t <tag> --tag <tag>", "Tags to match before applying the query")
  .option(
    "-x <exclude>, --exclude <exclude>",
    "Exclude paths from search, comma separated"
  )
  .option("-j --json", "Output in JSON format")
  .option("-v --verbose", "Enable more detailed error logging")
  .arguments("[query:string]")
  .description("Simple fuse based search of markdown documents")
  .action(async ({ limit, heading, tag, exclude, json, verbose }, query) => {
    try {
      const files = await getMarkdownFiles(exclude);

      const index = buildIndex(files, verbose);

      const filteredForHeadingsIndex = filterIndexForHeading(index, heading);

      const filteredIndex = filterIndexForTag(filteredForHeadingsIndex, tag);

      const results = applyQuery(filteredIndex, query, limit);

      if (json) {
        renderJsonOutput(results);
      } else {
        renderResults(results);
      }
    } catch (error) {
      if (!(error instanceof Deno.errors.BrokenPipe)) {
        console.error("#E9F571 uncaught error");
        console.error(error);
      }
    }
  })
  .parse(Deno.args);

// console.log(`Your query was ${search}`);
