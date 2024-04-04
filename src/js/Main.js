import { EventLoop } from "./controller/EventLoop.js";
import { ComponentBox } from "./model/ComponentBox.js";
import { animatePopLeft, animatePopRight, animatePushLeftIn, animatePushTopIn, animateRoate, animateSlideInOut } from "./view/Animation.js";

function main() {
  const componentBox = {
    callbacks: new ComponentBox("callbacks", null, null),
    callStack: new ComponentBox("call-stack-box", null, animateSlideInOut),
    webApis: new ComponentBox("web-api-box", animatePushTopIn, animatePopRight),
    microTask: new ComponentBox("microtask-box", animatePushLeftIn, animatePopLeft),
    macroTask: new ComponentBox("macrotask-box", animatePushLeftIn, animatePopLeft),
    endTask: new ComponentBox("endtask", null, null),
  };
  const loopIcon = document.querySelector(".event-loop");

  new EventLoop(componentBox);
  animateRoate(loopIcon);
}

main();
