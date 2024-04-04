import { jest } from "@jest/globals";
import {removeMatchingElement, createAnimationDivMarkup, appendTag} from "./components.js";

test("Html을 반환하는지 확인", () => {
    const callbackTest = { callBackCode: "test" };
    const expectedHtml = `<div class="animation__stuff">test</div>`;
    expect(createAnimationDivMarkup(callbackTest)).toBe(expectedHtml);
});

describe("appendTag, removeMatchingElement함수 테스트", () => {
    document.body.innerHTML = `
    <div class="animation__call_stack_box">
        <div>Callback 1</div>
        <div>Callback 2</div>
        <div>Callback 3</div>
    </div>
    `;

    const callBack = { callBackCode: "Callback 2" };
    const className = ".animation__call_stack_box";
    const memoryMock = { updateStatusByClassName: jest.fn() };
    test("removeMatchingElement 함수가 요소를 제거하는지 확인", () => {
        removeMatchingElement(callBack, className, memoryMock);

        const callStackTarget = document.querySelector(className);
        const children = Array.from(callStackTarget.children);
        expect(children.map((child) => child.textContent)).not.toContain(callBack.callBackCode);

        expect(memoryMock.updateStatusByClassName).toHaveBeenCalled();
    });

    test("appendTag 함수가 올바른 요소를 삽입하는지 확인", () => {

        appendTag(callBack, className, memoryMock);
        
        const animationDivHtml = document.querySelector(".animation__call_stack_box").innerHTML;
        expect(animationDivHtml).toContain(callBack.callBackCode);
        expect(memoryMock.updateStatusByClassName).toHaveBeenCalledWith(callBack, className, "push");
        });
});
