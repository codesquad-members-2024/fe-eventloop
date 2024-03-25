const code = `
setTimeout(function() {
  alert('This message is shown after 3 seconds');
}, 3000);
`;

function getAst(code) {
  return acorn.parse(code, { ecmaVersion: 2020 });
}

console.log(getAst(code));

export default getAst;
