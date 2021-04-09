My EBNF's syntax

Operation      Action

rule & rule    adjacent
rule | rule    or
rule *         0 or more
rule +         1 or more
rule ?         0 or 1
(rule)         packaging
{rule}(name);  naming
[rule]         choosing root
('rule')       converting AST to string
"str"          string
