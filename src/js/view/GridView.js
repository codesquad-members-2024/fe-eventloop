import { renderComponent } from "./Component.js";

const FIRST_INDEX = 0;

const isFirstIndex = (index) => index === FIRST_INDEX;

const isEven = (number) => number % 2 === 0;

const isLastIndex = (index, maxLength) => index >= maxLength - 1;

const isToCopy = (index, maxLength) =>
  !isFirstIndex(index) &&
  isEven(index) &&
  !isLastIndex(index, maxLength);

const renderBaseComponents = (contents, className, maxLength) => {
  const baseComponents = contents.reduce((acc, content, index) => {
    let component = renderComponent({ className, content });
    
    if (isToCopy(index, maxLength)) component += renderComponent({ className, content });

    return acc + component;
  }, "");

  return baseComponents;
};

const renderEmptyComponent = (className) => {
  return `<div class="${className}__component" style="border: none; background-color:transparent;"></div>`;
};

const renderEmptyComponents = (contentsLength, className, maxLength) => {
  const emptyComponentsCount = 9 - Array.from({ length: contentsLength }).reduce((acc, _, index) => isToCopy(index, maxLength) ? acc + 2 : acc + 1, 0);

  return Array(emptyComponentsCount)
    .fill(renderEmptyComponent(className))
    .join("");
};

const renderGridComponents = (contents, className, maxLength) => {
  const contentsToRender = contents.slice(FIRST_INDEX, maxLength);
  const baseComponents = renderBaseComponents(contentsToRender, className, maxLength);
  const emptyComponents = renderEmptyComponents(contentsToRender.length, className, maxLength);

  return `<div class="${className}__components" style="animation-play-state: paused;">${baseComponents}${emptyComponents}</div>`;
};

export const updateGridComponents = ({ className, contents, maxLength }) => {
  const components = renderGridComponents(contents, className, maxLength);

  return components;
};