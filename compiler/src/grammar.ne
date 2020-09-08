input -> assignment | value

atom -> atom_char | atom_char atom
atom_char -> [A-Z_0-9]

assignment -> "let" ws name ws "=" ws value

name -> name_char | name name_char
name_char -> [a-zA-Z0-9]

value -> number | boolean | string

# String
string ->  "\"" characters "\""

characters -> character | character characters
character -> [^\"]

ws -> s | s ws
s -> [ ]

# Boolean
boolean -> "True" | "False"

# Numbers
number -> numeric_underscores | decimal_number | digits

decimal_number -> digits "." digits

numeric_underscores -> numeric_underscores_rest "_" digit digit digit | numeric_underscores "_" digit digit digit
numeric_underscores_rest -> digit | digit digit | digit digit digit 

digits -> digit | digit digits
digit -> [0-9]