export const astParser = {
    splitCodeByFunctions(code){
        const ast = acorn.parse(code, { ecmaVersion: "latest" });
        const astNode = ast.body.map(node => code.substring(node.start, node.end))
        return this.isChain(astNode)
    },

    isChain(astNode){
        astNode.forEach((element, idx) => {
            if (element.includes("then")) {
                const splitSegments = element.split(/(?=\.then)/).map(segment => segment.trim());
                astNode.splice(idx, 1, ...splitSegments);
            }
        });
        return astNode
    },
}


