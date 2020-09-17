import { reportError } from "./error";
import { keywords, Token, TokenType } from "./token";

export class Scanner {
  private code: String;
  private tokens: Token[] = [];
  private start: number = 0;
  private current: number = 0;
  private line: number = 1;

  public constructor(code: String) {
    this.code = code;
  }

  public scanTokens = (): Token[] => {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    const eofToken: Token = {
      tokenType: TokenType.EOF,
      lexeme: "",
      line: this.line,
    };

    return [...this.tokens, eofToken];
  };

  scanToken = () => {
    const char = this.advance();

    switch (char) {
      case "(":
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case "{":
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      case ".":
        this.addToken(TokenType.DOT);
        break;
      case "-":
        this.addToken(this.match(">") ? TokenType.ARROW : TokenType.MINUS);
        break;
      case "+":
        this.addToken(TokenType.PLUS);
        break;
      case "*":
        this.addToken(TokenType.STAR);
        break;
      case "!":
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
        break;
      case "=":
        this.addToken(
          this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
        );
        break;
      case "<":
        this.addToken(this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER
        );
        break;
      case "#":
        // Ignore comment
        let literal = "";
        while (this.peek() !== "\n" && !this.isAtEnd())
          literal += this.advance();
        this.addToken(TokenType.COMMENT, literal);
        break;
      case "/":
        this.addToken(TokenType.SLASH);
        break;
      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        this.line++;
        break;
      case '"':
        this.string();
        break;
      default:
        if (this.isDigit(char)) {
          this.number();
        } else if (this.isAlpha(char)) {
          this.identifier();
        } else {
          reportError(this.line, `Unexpected character '${char}'.`);
        }
        break;
    }
  };

  number = () => {
    while (this.isDigit(this.peek())) this.advance();

    if (this.peek() == "." && this.isDigit(this.peekNext())) {
      // Consume "." char
      this.advance();

      while (this.isDigit(this.peek())) this.advance();
    }

    this.addToken(
      TokenType.NUMBER,
      parseFloat(this.code.substring(this.start, this.current))
    );
  };

  identifier = () => {
    while (this.isAlphaNumeric(this.peek())) this.advance();
    const text = this.code.substring(this.start, this.current);

    this.addToken(keywords[text] ?? TokenType.IDENTIFIER);
  };

  peekNext = () => {
    if (this.current + 1 >= this.code.length) return "\0";
    return this.code.charAt(this.current + 1);
  };

  isDigit = (char: String): boolean => char >= "0" && char <= "9";
  isAlpha = (char: String): boolean =>
    (char >= "a" && char <= "z") ||
    (char >= "A" && char <= "Z") ||
    char === "_";

  isAlphaNumeric = (char: String): boolean =>
    this.isDigit(char) || this.isAlpha(char);

  string = () => {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === "\n") this.line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      reportError(this.line, "Unterminated string.");
      return;
    }

    this.advance();

    const value = this.code.substring(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value);
  };

  addToken = (tokenType: TokenType, literal?: any) => {
    const lexeme = this.code.substring(this.start, this.current);
    this.tokens.push({ tokenType, lexeme, literal, line: this.line });
  };

  advance = (): String => {
    this.current++;
    return this.code.charAt(this.current - 1);
  };

  isAtEnd = () => this.current >= this.code.length;

  peek = () => {
    if (this.isAtEnd()) return "\0";
    return this.code.charAt(this.current);
  };

  match = (expectedChar: String): boolean => {
    if (this.isAtEnd()) return false;
    if (this.code.charAt(this.current) != expectedChar) return false;

    this.current++;
    return true;
  };
}
