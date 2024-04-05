const AST = {
	get({ value }) {
		return acorn.parse(value, { ecmaVersion: 2020 });
	},
	getCalleeName({ callee }, calleeNames) {
		if (callee?.object) {
			calleeNames.push(callee.property.name);
			return this.getCalleeName(callee.object, calleeNames);
		}
		if (callee.type === "Identifier") {
			calleeNames.push(callee.name);
			return;
		}
	},
	findCallExpressions({ body }) {
		const callExpressions = body.map((exp) => {
			const calleeNames = [];
			this.getCalleeName(exp.expression, calleeNames);
			return calleeNames.reverse();
		});
		return callExpressions.flat();
	},
};

export default AST;
