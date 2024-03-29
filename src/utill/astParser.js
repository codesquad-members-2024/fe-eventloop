export const astParser = {
    splitCodeByFunctions(code) {
        const ast = acorn.parse(code, { ecmaVersion: "latest" });
        const astNode = ast.body.map(node => code.substring(node.start, node.end));
        this.isChain(astNode)
        const modifyString = astNode.map((cur) => {
            if (cur[0] === '.') return cur.substr(1)
            return cur
    });
        return modifyString;
    },
    
    isChain(astNode) {
        astNode.forEach((element, idx) => {
            if (element.includes("then")) {
                const splitSegments = element.split(/(?=\.then)/).map(segment => segment.trim());
                astNode.splice(idx, 1, ...splitSegments);
            }
        });
        return astNode;
    },

    splitFetchCallBack(node, code) {
        return {
            code: code,
            type: "fetch",
            callBack: undefined
        }
    },

    splitMicroCallBack(node, code) {
        let results = [];
        if (node.type === "CallExpression" && node.callee.name === "then") {
                const callBack = node.arguments[0];
                results.push({
                    code: code,
                    type: "then",
                    callBack: this.transformNode(callBack, code)
                });
        }
        for (const key in node) {
            if (node.hasOwnProperty(key) && typeof node[key] === "object" && node[key] !== null) {
                results = results.concat(this.splitMicroCallBack(node[key], code));
            }
        }
        return results;
    },

    splitMacroCallBack(node, code) {
        let results = [];
        if (node.type === "CallExpression" && node.callee.name === "setTimeout"){
            const callBack = node.arguments[0];
            results.push({
                code: code,
                type: "setTimeout",
                callBack: this.transformNode(callBack, code)
            });
        } 
        for (const key in node) {
            if (node.hasOwnProperty(key) && typeof node[key] === "object" && node[key] !== null) {
                results = results.concat(this.splitMacroCallBack(node[key], code));
            }
        }
        return results;
    },

    transformNode(node, code) {
        return code.substring(node.start, node.end);
    },
}