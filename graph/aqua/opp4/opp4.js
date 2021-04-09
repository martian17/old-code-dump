class OPP2{
    evaluate(tokens){//linked list of tokens
        var ast = listcpy(tokens);
        for(var i = 0; i < this.rules.length; i++){
            var rule = this.rules[i];
            console.log(rule);
            switch(rule.type){
                case "separator":
                this.separator(rule,ast);
                break;
                case "adjacent":
                this.adjacent(rule,ast);
                break;
                case "left":
                //this.left(rule,ast);
                break;
                case "right":
                this.right(rule,ast);
                break;
                case "suffix":
                this.suffix(rule,ast);
                break;
                case "prefix":
                //this.prefix(rule,ast);
                break;
                case "paren":
                this.paren(rule,ast);
                break;
            }
        }
        return this.beautify(ast);//removes all the double lists
    }
}