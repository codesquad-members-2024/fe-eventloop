import { renderComponent } from './Component.js';

const FIRST_INDEX = 0;

const isLessThanZero = (number) => number < 0;

const renderBaseComponents = (contents, className, maxLength) => {
  const baseComponents = contents.reduce((acc, content) => acc + renderComponent({ className, content }), "");

  return baseComponents;
}

const renderEmptyComponent = (className) => {
  return `<div class="${className}__component" style="border: 0.01rem solid transparent; background-color:transparent;"></div>`;
};

const renderEmptyComponents = (contentsLength, className, maxLength) => {
  const emptyComponentsCount = isLessThanZero(maxLength - contentsLength) ? 0 : maxLength - contentsLength;

  return Array(emptyComponentsCount)
    .fill(renderEmptyComponent(className))
    .join("");
}

export const updateQueueComponents = ({ className, contents, maxLength }) => {
  const contentsToRender = contents.slice(FIRST_INDEX, maxLength);
  const baseComponents = renderBaseComponents(contentsToRender, className, maxLength);
  const emptyComponents = renderEmptyComponents(contentsToRender.length, className, maxLength);

  return `<div class="${className}__components" style="animation-play-state: paused;">${emptyComponents}${baseComponents}</div>`;
}