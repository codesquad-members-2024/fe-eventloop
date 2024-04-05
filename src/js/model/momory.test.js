import { Memory } from "./memory.js";

describe("Memory class 테스트", () => {
    let memory;
    const callback = "callback";
    const selectorsMap = [
        ".animation__call_stack_box",
        ".animation__web_api_box",
        ".animation__micro_task_box",
        ".animation__macro_task_box",
    ];

    beforeEach(() => {
        memory = new Memory();
    });

    test("Memory 클래스의 생성자가 정상적으로 동작하는지 확인", () => {
        expect(memory.classNameMap.size).toBeGreaterThan(0);
    });

    test("isEmpty 메서드가 클래스 이름에 따라 올바르게 비어있는지 확인", () => {
        selectorsMap.forEach((className) => {
            expect(memory.isEmpty(className)).toBe(true);

            memory.classNameMap.get(className).push("callback");
            expect(memory.isEmpty(className)).toBe(false);
        });
    });

    test("getCallBack 메서드가 클래스 이름에 따라 올바른 콜백을 반환하는지 확인", () => {
        selectorsMap.forEach((className) => {
            if (!memory.classNameMap.has(className)) {
                memory.classNameMap.set(className, []);
            }

            memory.updateStatusByClassName(callback, className, "push");
            expect(memory.isEmpty(className)).toBe(false);

            const retrievedCallback = memory.getCallBack(className);
            expect(retrievedCallback).toBe(callback);
        });
    });

    test("updateStatusByClassName 메서드가 클래스 이름에 따라 올바르게 상태를 업데이트하는지 확인", () => {
        selectorsMap.forEach((className) => {
            memory.updateStatusByClassName(callback, className, "push");
            expect(memory.classNameMap.get(className)).toContain(callback);

            memory.updateStatusByClassName(callback, className, "pop");
            expect(memory.classNameMap.get(className)).not.toContain(callback);
        });
    });
});
