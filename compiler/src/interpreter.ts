import { readFileSync } from "fs";
import { hadError, reset } from "./error";
import { Scanner } from "./scanner";
const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const quit = () => {
  process.exit(0);
};

readlineInterface.on("close", quit);

export const runFile = (path: string) => {
  const fileContents = readFileSync(path, "utf-8");

  run(fileContents);

  if (hadError()) {
    process.exit(0);
  }
};

export const runPrompt = () => {
  const handler = (value: String) => {
    if (value === "quit" || value === "exit" || value.length === 0) {
      quit();
    } else {
      run(value);
    }
    runPrompt();
  };

  readlineInterface.question("> ", handler);
};

const run = (code: String) => {
  reset();

  const scanner = new Scanner(code);
  const tokens = scanner.scanTokens();

  console.log("Tokens: ", tokens);
};
