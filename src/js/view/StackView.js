import { renderComponent } from './Component.js';

const FIRST_INDEX = 0;

const renderBaseComponents = (contents, className, maxLength) => {
  const baseComponents = contents.reduce((acc, content) => acc + renderComponent({ className, content }), "");

  return baseComponents;
}

export const updateStackComponents = ({ className, contents, maxLength }) => {
  const contentsToRender = contents.slice(FIRST_INDEX, maxLength);
  const baseComponents = renderBaseComponents(contentsToRender, className, maxLength);

  return `<div class="${className}__components" style="animation-play-state: paused;">${baseComponents}</div>`;
}