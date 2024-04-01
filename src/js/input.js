/**
 *
 * @param {*} event
 * @returns {string} code
 */
export function getCode(event) {
  event.preventDefault();
  const code = document.querySelector('#inputCode').value;
  console.log(code);
  return code;
}
