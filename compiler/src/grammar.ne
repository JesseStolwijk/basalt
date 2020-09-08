@{%
const moo = require("moo");

const lexer = moo.compile({
  ws:     /[ \t]+/,
  comment: /#.*?$/,
  boolean: /True|False/,
  newline: { match: /\r\n|\n/, lineBreaks: true },
  decimal_number: /\d+\.\d+/,
  number_with_underscores: /\d{1,3}(?:_\d{3})+/,
  number: /[0-9]+/,
  label: /[a-zA-Z0-9_]+/,
  word: /[a-z]+/,
  times:  /\*|x/,
  equals: /=/,
  digit: /[0-9]/,
  string: /"[^\"]*"/
});
%}


# Pass your lexer object using the @lexer option:
@lexer lexer

program -> input program | input

input -> %newline | %comment | assignment | value

atom -> atom_char | atom_char atom
atom_char -> [A-Z_0-9]

assignment -> "let" %ws %label %ws %equals %ws value

value ->  %boolean | number | %string

# Numbers
number -> %decimal_number | %number_with_underscores | %number
