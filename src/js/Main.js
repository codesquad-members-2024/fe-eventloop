import EventLoopVisualizer from "./controller/EventLoopVisualizer.js";
import { renderIndex } from "./view/Component.js";

const main = () => {
  renderIndex();
  new EventLoopVisualizer();
};

main();