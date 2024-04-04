import { jest } from "@jest/globals";
import { addEventHandler, checkQueue } from "./eventHandler";

describe("event 확인", () => {
    document.body.innerHTML = `
    <form id="code-form">
        <textarea id="code-input" type="text" placeholder="여기에 비동기 콜백이 포함된 코드를 입력하세요."></textarea>
        <button type="submit" id="code-run-btn">동작시키기</button>
    </form>
    `;
    it("클릭시 이벤트 콜백이 실행되는지 확인", () => {
        addEventHandler();

        const handleFormSubmitMock = jest.fn();

        const formElement = document.getElementById("code-form");
        formElement.addEventListener("click", handleFormSubmitMock);

        formElement.click();

        expect(handleFormSubmitMock).toHaveBeenCalled();
    });
});

describe("queue type 확인", () => {
    test("type이 macro일때", () => {
        const callBack = { type: "setTimeout" };
        expect(checkQueue(callBack)).toHaveLength(2);
    });
    test("type이 micro일때", () => {
        const callBack = { type: "" };
        expect(checkQueue(callBack)).toHaveLength(1);
    });
});
