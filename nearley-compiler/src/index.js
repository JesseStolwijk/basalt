const fs = require("fs");
const nearley = require("nearley");
const grammar = require("../dist/grammar.js");
const path = require("path");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const data = fs.readFileSync(path.resolve(process.argv[2]), "utf-8");

parser.feed(data);

if (parser.results.length === 0) {
  console.error("Expected more input");
} else if (parser.results.length === 1) {
  console.log("Good parse");
  parser.results[0]
    .filter((item) => item.type !== "newline")
    .forEach((line) => console.log(line));
} else {
  console.error("Ambiguous parse");
  console.log(JSON.stringify({ result: parser.results[0] }));
  console.log(JSON.stringify({ result: parser.results[1] }));
}

parser.finish();
