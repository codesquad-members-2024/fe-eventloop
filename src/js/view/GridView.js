import { renderBaseComponents } from "./Component.js";

const FIRST_INDEX = 0;

const isFirstIndex = (index) => index === FIRST_INDEX;

const isEven = (number) => number % 2 === 0;

const isLastIndex = (index, maxLength) => index >= maxLength - 1;

const isToCopy = (index, maxLength) =>
  !isFirstIndex(index) &&
  isEven(index) &&
  !isLastIndex(index, maxLength);

const renderEmptyComponent = (className) => {
  return `<div class="${className}__component" style="border: 0.01rem solid transparent; background-color:transparent;"></div>`;
};

const renderEmptyComponents = (contentsLength, className, maxLength) => {
  const emptyComponentsCount = 9 - Array.from({ length: contentsLength }).reduce((acc, _, index) => isToCopy(index, maxLength) ? acc + 2 : acc + 1, 0);

  return Array(emptyComponentsCount)
    .fill(renderEmptyComponent(className))
    .join("");
};

export const updateGridComponents = ({ className, contents, maxLength }) => {
  const contentsToRender = contents.slice(FIRST_INDEX, maxLength);
  const baseComponents = renderBaseComponents({ contents: contentsToRender, className, maxLength, condition: isToCopy });
  const emptyComponents = renderEmptyComponents(contentsToRender.length, className, maxLength);

  return `<div class="${className}__components" style="animation-play-state: paused;">${baseComponents}${emptyComponents}</div>`;
};