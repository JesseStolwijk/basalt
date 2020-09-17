import { Token, TokenType } from "./token";

let errors = [];
let errorOccured = false;

export class ParseError implements Error {
  name: string;
  message: string;
  stack?: string;

  public constructor(message: string) {
    this.name = "ParseError";
    this.message = message;
  }
}

export const error = (token: Token, message: String) => {
  if (token.tokenType === TokenType.EOF) {
    handleError(token.line, " at end", message);
  } else {
    handleError(token.line, "at '" + token.lexeme + "'", message);
  }
};

export const reportError = (line: number, message: String) => {
  handleError(line, "", message);
};

export const handleError = (line: number, where: String, message: String) => {
  console.log(`[line ${line}] Error${where}: ${message}`);
  errorOccured = true;
};

export const hadError = () => errorOccured;

export const reset = () => {
  errorOccured = false;
  errors = [];
};
