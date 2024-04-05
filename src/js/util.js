export function millisecondToSecond(number) {
  return number / 1000;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function filterTasksByType(tasks, type) {
  return tasks.filter((task) => task.type === type);
}

export function getFirstElementInArr(arr) {
  return arr[0];
}
