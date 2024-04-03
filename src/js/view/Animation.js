const ANIMATION_DURATION = 2000;

const createSlideInOutStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;
    
    if (progress < 1) {
      element.style.transform = `translateY(${-(progress - 0.75) * 2000}px)`;
    }
    if (progress < 0.75) {
      element.style.transform = `translateY(0)`;
    }
    if (progress < 0.25) {
      element.style.transform = `translateY(${(- 0.25 + progress) * 2000}px)`;
    }
    requestAnimationFrame(step);
  }

  return step;
}

const animateSlideInOut = (box) => {
  const elementToAnimate = box.firstElementChild;
  const step = createSlideInOutStep(elementToAnimate);
  requestAnimationFrame(step);
};

const createBounceInOutStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;
    
    if (progress < 1) element.style.transform = `translateY(-500%)`;
    if (progress <= 0.7) element.style.transform = `translateY(120%)`;
    if (progress <= 0.3) element.style.transform = `translateY(120%)`;
    if (progress <= 0.1) element.style.transform = `translateY(110%)`;
    if (progress === 0) element.style.transform = `translateY(300%)`;
    requestAnimationFrame(step);
  }

  return step;
}

const animateBounceInOut = (box) => {
  const elementToAnimate = box.firstElementChild;
  const step = createBounceInOutStep(elementToAnimate);

  requestAnimationFrame(step);
};

const createPushTopInStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;

    if (progress > 1) start = null;
    if (progress <= 0.25) {
      element.style.transform = `translateY(${(- 0.25 + progress) * 2000}px)`;
    } else {
      element.style.transform = `translateY(0)`;
    }
    requestAnimationFrame(step);
  }

  return step;
}

const animatePushTopIn = (box) => {
  const elementToAnimate = box.lastElementChild;
  const step = createPushTopInStep(elementToAnimate);

  requestAnimationFrame(step);
};

const createPushLeftInStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;

    if (progress <= 0.25) {
      element.style.transform = `translateX(${(0.25 - progress) * 2000}px)`;
    } else {
      element.style.transform = `translateX(0)`;
    }
    requestAnimationFrame(step);
  }

  return step;
}

const animatePushLeftIn = (box) => {
  const elementToAnimate = box.lastElementChild;
  const step = createPushLeftInStep(elementToAnimate);

  requestAnimationFrame(step);
};

const createMoveDownStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;

    if (progress <= 0.25) {
      element.style.transform = `translateY(${progress / 0.25 * 42.5}px)`;
    }
    requestAnimationFrame(step);
  }

  return step;
}

const createMoveLeftOutStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;

    if (progress <= 0.25) {
      element.style.transform = `translateX(${-progress / 0.25 * 1000}px)`;
    }
    requestAnimationFrame(step);
  }

  return step;
}

const animatePopLeft = (box) => {
  const elementsToMoveDown = [...box.children];
  const elementToMoveLeftOut = elementsToMoveDown.shift();
  const moveDownSteps = elementsToMoveDown.map((element) => createMoveDownStep(element))
  const moveLeftOutStep = createMoveLeftOutStep(elementToMoveLeftOut);

  moveDownSteps.forEach((step) => requestAnimationFrame(step));
  requestAnimationFrame(moveLeftOutStep);
};

const createMoveRightOutStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;

    if (progress <= 0.25) {
      element.style.transform = `translateX(${progress / 0.25 * 1000}px)`;
    }
    requestAnimationFrame(step);
  }

  return step;
}

const animatePopRight = (box) => {
  const elementsToMoveDown = [...box.children];
  const elementToMoveRightOut = elementsToMoveDown.shift();
  const moveDownSteps = elementsToMoveDown.map((element) => createMoveDownStep(element))
  const moveRightOutStep = createMoveRightOutStep(elementToMoveRightOut);

  moveDownSteps.forEach((step) => requestAnimationFrame(step));
  requestAnimationFrame(moveRightOutStep);
};

const createRotateStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;
    const degrees = progress * 360;

    element.style.transform = `rotate(${degrees}deg)`;
    requestAnimationFrame(step);
  }

  return step;
}

const anmiateRotateElement = (element) => {
  const step = createRotateStep(element);
  requestAnimationFrame(step);
}