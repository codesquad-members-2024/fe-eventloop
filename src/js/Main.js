import { EventLoop } from "./controller/EventLoop.js";
import { ComponentBox } from "./model/ComponentBox.js";

function main() {
  const CLASS_NAME = {
    callbacks: "callbacks",
    callStack: "call-stack-box",
    webApis: "web-api-box",
    microTask: "microtask-box",
    macroTask: "macrotask-box",
  }
  const componentBox = {
    callbacks: new ComponentBox(CLASS_NAME.callbacks),
    callStack: new ComponentBox(CLASS_NAME.callStack),
    webApis: new ComponentBox(CLASS_NAME.webApis),
    microTask: new ComponentBox(CLASS_NAME.microTask),
    macroTask: new ComponentBox(CLASS_NAME.macroTask),
  }

  new EventLoop(componentBox);
}

main();
