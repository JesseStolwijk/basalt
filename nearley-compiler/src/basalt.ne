@{%
const moo = require("moo");

const lexer = moo.compile({
  ws:     /[ \t]+/,
  boolean: /True|False/,
  decimal_number: /\d+\.\d+/,
  number_with_underscores: /\d{1,3}(?:_\d{3})+/,
  string: /"[^\"]*"/,
  unary: /-|!/,
  operator: /==|!=|<|<=|>|>=|\+|-|\*|\//,
  open: /\(/,
  close: /\)/
});
%}

@lexer lexer

expression -> literal
           | unary
           | binary
           | grouping

number -> %decimal_number | %number_with_underscores
string -> %string

literal    -> number | string | %boolean
grouping   -> %open expression %close
unary      -> %unary expression
binary     -> expression %ws %operator %ws expression
