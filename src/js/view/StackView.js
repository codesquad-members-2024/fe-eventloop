import { renderComponent } from './Component.js';

const renderBaseComponents = (contents, className, maxLength) => {
  const baseComponents = contents.reduce((acc, content) => acc + renderComponent({ className, content }), "");

  return baseComponents;
}

export const updateStackComponents = ({ className, contents, maxLength }) => {
  const contentsToRender = contents.slice(contents.length - 1);
  const baseComponents = renderBaseComponents(contentsToRender, className, maxLength);

  return `<div class="${className}__components" style="animation-play-state: paused;">${baseComponents}</div>`;
}