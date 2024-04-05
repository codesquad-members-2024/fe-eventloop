export const updateTutorialComponents = ({ className, contents }) => {
  return `<div class="${className}__components" style="animation-play-state: paused;">${contents}</div>`;
};
