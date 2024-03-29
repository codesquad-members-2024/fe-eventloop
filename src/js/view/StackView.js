import { renderBaseComponents } from './Component.js';

export const updateStackComponents = ({ className, contents, maxLength }) => {
  const contentsToRender = contents.slice(contents.length - 1);
  const baseComponents = renderBaseComponents({ contents: contentsToRender, className, maxLength });

  return `<div class="${className}__components" style="animation-play-state: paused;">${baseComponents}</div>`;
};