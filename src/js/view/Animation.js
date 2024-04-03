const FULL_ROTATION_DEGREES = 360;
const MAX_TRANSLATE_DISTANCE = 2000;
const MAX_MOVE_DOWN_DISTANCE = 15.5;
const PROGRESS_THRESHOLD = 0.25;
const SECONDARY_PROGRESS_THRESHOLD = 0.75;
const MAX_PRGORESS_THRESHOLD = 1;
const ANIMATION_DURATION = 2000;

const createAnimationStep = (element, transformFunction) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;
    
    transformFunction(element, progress);
    requestAnimationFrame(step);
  }
  return step;
};

const animateElement = (element, transformFunction) => {
  const step = createAnimationStep(element, transformFunction);
  requestAnimationFrame(step);
};

const rotateTransform = (element, progress) => {
  element.style.transform = `rotate(${progress * FULL_ROTATION_DEGREES}deg)`;
};

const slideInOutTransform = (element, progress) => {
  if (progress < MAX_PRGORESS_THRESHOLD) {
    element.style.transform = `translateY(${-(progress - SECONDARY_PROGRESS_THRESHOLD) * MAX_TRANSLATE_DISTANCE}px)`;
  }
  if (progress < SECONDARY_PROGRESS_THRESHOLD) {
    element.style.transform = `translateY(0)`;
  }
  if (progress < PROGRESS_THRESHOLD) {
    element.style.transform = `translateY(${(- PROGRESS_THRESHOLD + progress) * MAX_TRANSLATE_DISTANCE}px)`;
  }
};

const pushTopInTransform = (element, progress) => {
  if (progress > PROGRESS_THRESHOLD) {
    element.style.transform = `translateY(0)`;
    return;
  }

  element.style.transform = `translateY(${(- PROGRESS_THRESHOLD + progress) * MAX_TRANSLATE_DISTANCE}px)`;
};

const pushLeftInTransform = (element, progress) => {
  if (progress > PROGRESS_THRESHOLD) {
    element.style.transform = `translateX(0)`;
    return;
  }

  element.style.transform = `translateX(${(PROGRESS_THRESHOLD - progress) * MAX_TRANSLATE_DISTANCE}px)`;
};

const moveDownTransform = (element, progress) => {
  if (progress > PROGRESS_THRESHOLD) return;

  element.style.transform = `translateY(${progress / PROGRESS_THRESHOLD * MAX_MOVE_DOWN_DISTANCE}px)`;
};

const moveLeftOutTransform = (element, progress) => {
  if (progress > PROGRESS_THRESHOLD) return;

  element.style.transform = `translateX(${-progress / PROGRESS_THRESHOLD * MAX_TRANSLATE_DISTANCE}px)`;
};

const moveRightOutTransform = (element, progress) => {
  if (progress > PROGRESS_THRESHOLD) return;

  element.style.transform = `translateX(${progress / PROGRESS_THRESHOLD * MAX_TRANSLATE_DISTANCE}px)`;
};

const animateRoate = (element) => {
  animateElement(element, rotateTransform);
}

const animateSlideInOut = (box) => {
  animateElement(box.firstElementChild, slideInOutTransform);
};

const animatePushTopIn = (box) => {
  animateElement(box.lastElementChild, pushTopInTransform);
};

const animatePushLeftIn = (box) => {
  animateElement(box.lastElementChild, pushLeftInTransform);
};

const animatePopLeft = (box) => {
  const elementsToMoveDown = [...box.children];
  const elementToMoveLeftOut = elementsToMoveDown.shift();

  elementsToMoveDown.forEach((element) => animateElement(element, moveDownTransform));
  animateElement(elementToMoveLeftOut, moveLeftOutTransform);
};

const animatePopRight = (box) => {
  const elementsToMoveDown = [...box.children];
  const elementToMoveRightOut = elementsToMoveDown.shift();

  elementsToMoveDown.forEach((element) => animateElement(element, moveDownTransform));
  animateElement(elementToMoveRightOut, moveRightOutTransform);
};