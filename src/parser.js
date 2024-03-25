const code = `
setTimeout(function() {
  alert('This message is shown after 3 seconds');
}, 3000);
`;

const ast = acorn.parse(code, { ecmaVersion: 2020 });

console.log(ast);
