const COMPONENT_BOX = {
  "call-stack-box": document.querySelector(".call-stack-box"),
  "web-api-box": document.querySelector(".web-api-box"),
  "microtask-box": document.querySelector(".microtask-box"),
  "macrotask-box": document.querySelector(".macrotask-box"),
}

export const renderComponents = ({ className, contents = "" }) => {
  const box = COMPONENT_BOX[className];

  box.innerHTML = contents;
};
