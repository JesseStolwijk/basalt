import { runFile, runPrompt } from "./interpreter";
const commandLineArgs = require("command-line-args");

const definitions = [
  {
    name: "input",
    alias: "i",
    multiple: true,
    defaultOption: true,
    type: String,
  },
];

const main = commandLineArgs(definitions);

console.log("Arguments", main);

if (main.input) {
  console.log("Called with file input");
  main.input.forEach(runFile);
} else {
  console.log("Starting prompt");
  runPrompt();
}
