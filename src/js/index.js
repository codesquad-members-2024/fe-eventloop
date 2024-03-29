import { getCodeInput } from "./codeInput.js";
import { parseLiteral } from "./codeParser.js";
import { controllEventLoop } from "./ eventloop.js";

async function main() {
  getCodeInput();
  const callbacks = await parseLiteral();
  controllEventLoop(callbacks);
}

main();
