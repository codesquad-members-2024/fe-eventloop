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

const animateBounceInOut = (box) => {

};

const createPushTopInStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;

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
  const elementToAnimate = box.firstElementChild;
  const step = createPushLeftInStep(elementToAnimate);

  requestAnimationFrame(step);
};

const animatePopLeft = (box) => {

};

const animatePopRight = (box) => {

};

const createRotateStep = (element) => {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / ANIMATION_DURATION;
    const degrees = progress * 360;

    if (progress >= 1) start = null;
    element.style.transform = `rotate(${degrees}deg)`;
    requestAnimationFrame(step);
  }

  return step;
}

const anmiateRotateElement = (element) => {
  const step = createRotateStep(element);
  requestAnimationFrame(step);
}