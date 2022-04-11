import { Cliffy } from "./deps.ts";

await new Cliffy.Command()
  .name("md-fuse")
  .version("0.1.0")
  .arguments("<query:string>")
  .description("Simple fuse based search of markdown documents")
  .action(async (options, args) => {
    console.log("#7Gbiec Run");
    console.log(args);
  })
  .parse(Deno.args);

// console.log(`Your query was ${search}`);
