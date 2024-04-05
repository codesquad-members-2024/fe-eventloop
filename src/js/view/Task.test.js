/**
 * @jest-environment jsdom
 */

import Task from "./Task";

describe("Task", () => {
	let task;

	beforeEach(() => {
		//Test를 위한 DOM 요소를 생성
		document.body.innerHTML = `
        <div class="test">test</div>
        <div class="explain">test</div>
        `;

		task = new Task("test");
	});

	//removeTask 메서드 테스트
	test("should remove task and explanation", () => {
		task.removeTask();
		expect(document.querySelector(".test").innerHTML).toBe("");
		expect(document.querySelector(".explain").innerHTML).toBe("");
	});

	test("should append task and explanation", async () => {
		jest.useFakeTimers(); // 시간을 가짜로 조작
		const startAnimation = jest.fn();
		task.appendTask("then", startAnimation);

		expect(document.querySelector(".test").innerHTML).toContain(
			`<div class="task center">then</div>`
		);
		expect(document.querySelector(".explain").innerHTML).toContain("promise의 상태(Fulfilled)");
		expect(startAnimation).toHaveBeenCalled(); //애니메이션 fn이 불렸는지 확인
		jest.advanceTimersByTime(8000); //8초 전진

        //제거 됐는지 확인
        expect(document.querySelector(".test").innerHTML).toBe("");
		expect(document.querySelector(".explain").innerHTML).toBe("");
	});
});
