import { jest } from "@jest/globals";
import { removeMatchingElement, createAnimationDivMarkup, appendTag } from "./components.js";

test('Html을 반환하는지 확인', () => {
    const callbackTest = {callBackCode: "test"}
    const expectedHtml = `<div class="animation__stuff">test</div>`;
    expect(createAnimationDivMarkup(callbackTest)).toBe(expectedHtml);
});

