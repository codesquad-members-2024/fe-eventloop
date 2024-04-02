/**
 * @jest-environment jsdom
 */

import AST from "./AST.js";
import acorn from "acorn";

const expectedCode = [
	`fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('There was a problem with your fetch operation:', error));

setTimeout(function() {
    alert('This message is shown after 3 seconds');
}, 3000);
`,
	`new Promise((resolve)=>resolve("Promise"))
    .then((res) => console.log(res));
    
setTimeout(function(){
    console.log('check')
}, 3000);
`,
];

const results = [
	["fetch", "then", "then", "catch", "setTimeout"],
	["Promise", "then", "setTimeout"],
];

describe("AST findCallExpressions 함수 테스트", () => {
	test("코드 파싱 결과 테스트", () => {
		const options = { ecmaVersion: "latest" };

		expectedCode.forEach((code, i) => {
			const ast = acorn.parse(code, options);
			const calleeNames = AST.findCallExpressions(ast);
			expect(calleeNames).toEqual(results[i]);
		});
	});
});
