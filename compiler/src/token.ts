export interface Token {
  tokenType: TokenType;
  lexeme: String;
  literal?: any;
  line: number;
}

export enum TokenType {
  // Single-character tokens.
  LEFT_PAREN = "LEFT_PAREN",
  RIGHT_PAREN = "RIGHT_PAREN",
  LEFT_BRACE = "LEFT_BRACE",
  RIGHT_BRACE = "RIGHT_BRACE",
  COMMA = "COMMA",
  DOT = "DOT",
  MINUS = "MINUS",
  PLUS = "PLUS",
  SLASH = "SLASH",
  STAR = "STAR",

  // One or two character tokens.
  BANG = "BANG",
  BANG_EQUAL = "BANG_EQUAL",
  EQUAL = "EQUAL",
  EQUAL_EQUAL = "EQUAL_EQUAL",
  GREATER = "GREATER",
  GREATER_EQUAL = "GREATER_EQUAL",
  LESS = "LESS",
  LESS_EQUAL = "LESS_EQUAL",
  ARROW = "ARROW",

  // Literals.
  IDENTIFIER = "IDENTIFIER",
  STRING = "STRING",
  NUMBER = "NUMBER",

  // Keywords.
  AND = "AND",
  OR = "OR",
  TRUE = "TRUE",
  FALSE = "FALSE",
  LET = "LET",

  EOF = "EOF",
}

export const keywords: { [key: string]: TokenType } = {
  and: TokenType.AND,
  false: TokenType.FALSE,
  or: TokenType.OR,
  true: TokenType.TRUE,
  let: TokenType.LET,
};
