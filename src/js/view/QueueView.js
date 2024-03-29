import { renderBaseComponents } from './Component.js';

const FIRST_INDEX = 0;
const EMPTY = 0;

const isLessThanZero = (number) => number < 0;

const isTransparent = (tag) => tag.style["background-color"] === "transparent";

const renderEmptyComponent = (className) => {
  return `<div class="${className}__component" style="border: 0.01rem solid transparent; background-color:transparent;"></div>`;
};

const renderEmptyComponents = (contentsLength, className, maxLength) => {
  const webApisComponent = document.querySelector(".web-apis__component");
  const emptyComponentsCount = isTransparent(webApisComponent) || isLessThanZero(maxLength - contentsLength) 
    ? EMPTY
    : maxLength - contentsLength;

  return Array(emptyComponentsCount)
    .fill(renderEmptyComponent(className))
    .join("");
};

export const updateQueueComponents = ({ className, contents, maxLength }) => {
  const contentsToRender = contents.slice(FIRST_INDEX, maxLength);
  const baseComponents = renderBaseComponents({ contents: contentsToRender, className, maxLength });
  const emptyComponents = renderEmptyComponents(contentsToRender.length, className, maxLength);

  return `<div class="${className}__components" style="animation-play-state: paused;">${emptyComponents}${baseComponents}</div>`;
};