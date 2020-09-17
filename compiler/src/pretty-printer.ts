import { Token } from "./token";

export type Expression = {
  type: "LITERAL" | "UNARY" | "BINARY" | "GROUPING";
  expr: Literal | Unary | Binary | Grouping;
};

export type Literal = { value: any };
export type Unary = { operator: Token; right: Expression };
export type Grouping = { expression: Expression };
export type Binary = { left: Expression; operator: Token; right: Expression };

export const prettyPrint = (expression: Expression): String => {
  switch (expression.type) {
    case "LITERAL":
      const literal = expression.expr as Literal;
      return literal.value?.toString() ?? "nil";
    case "UNARY":
      const unary = expression.expr as Unary;
      return parenthesize(unary.operator.lexeme, [unary.right]);
    case "BINARY":
      const binary = expression.expr as Binary;
      return parenthesize(binary.operator.lexeme, [binary.left, binary.right]);
    case "GROUPING":
      const grouping = expression.expr as Grouping;
      return parenthesize("group", [grouping.expression]);
  }
};

const parenthesize = (name: String, expressions: Expression[]) => {
  return `(${name} ${expressions.map(prettyPrint).join(" ")})`;
};
