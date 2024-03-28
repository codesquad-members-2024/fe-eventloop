import { parse } from '/node_modules/.vite/deps/acorn.js?v=ca8a5aa0';

import * as acornWalk from '/node_modules/.vite/deps/acorn-walk.js?v=ca8a5aa0';

const code = `const a = 1;`;
const ast = parse(code, { ecmaVersion: 2020 }); // 'parse' 함수를 사용합니다.
console.log(ast);
