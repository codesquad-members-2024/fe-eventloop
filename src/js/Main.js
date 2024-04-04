import { EventLoop } from "./controller/EventLoop.js";
import { ComponentBox } from "./model/ComponentBox.js";
import { animatePopLeft, animatePopRight, animatePushLeftIn, animatePushTopIn, animateRoate, animateSlideInOut } from "./view/Animation.js";

function main() {
  const CLASS_NAME = {
    callbacks: "callbacks",
    callStack: "call-stack-box",
    webApis: "web-api-box",
    microTask: "microtask-box",
    macroTask: "macrotask-box",
    endTask: "endtask",
  }
  const componentBox = {
    callbacks: new ComponentBox(CLASS_NAME.callbacks),
    callStack: new ComponentBox(CLASS_NAME.callStack, null, animateSlideInOut),
    webApis: new ComponentBox(CLASS_NAME.webApis, animatePushTopIn, animatePopRight),
    microTask: new ComponentBox(CLASS_NAME.microTask, animatePushLeftIn, animatePopLeft),
    macroTask: new ComponentBox(CLASS_NAME.macroTask, animatePushLeftIn, animatePopLeft),
    endTask: new ComponentBox(CLASS_NAME.endTask),
  }
  const loopIcon = document.querySelector(".event-loop");

  new EventLoop(componentBox);
  animateRoate(loopIcon)
}

main();
