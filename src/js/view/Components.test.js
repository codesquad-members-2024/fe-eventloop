import { renderComponents } from "./Components";

describe("Components 단위 테스트", () => {
  test("", () => {
    // given
    const className = "web-api-box";
    document.body.innerHTML = `
    <div class="${className}"></div>
    `;
    const contents = [
    "<div>Promise.then</div>",
    "<div>Promise.catch</div>"];
    const expectedHTML = `<div>Promise.then</div><div>Promise.catch</div>`;

    // when
    const result = renderComponents({ className, contents });
    
    // then
    expect(result).toEqual(expectedHTML);
  });
});