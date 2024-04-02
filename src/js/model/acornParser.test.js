import { isMicroTask, isMacroTask } from "./acornParser.js";

describe('isMicroTask함수 테스트', () => {
    test('MemberExpression, then을 인수로 전달했을때 true를 반환하는지 확인합니다.', () => {
        const callee = {type: 'MemberExpression', property: { name: 'then' }};
        const result = isMicroTask(callee);
        expect(result).toBe(true);
    });

    test('MemberExpression, catch을 인수로 전달했을때 true를 반환하는지 확인합니다.', () => {
        const callee = {type: 'MemberExpression', property: { name: 'catch' }};
        const result = isMicroTask(callee);
        expect(result).toBe(true);
    });
});

describe('isMacroTask함수 테스트', () => {
    test('Identifier, setTimeout를 인수로 전달했을때 true를 반환하는지 확인합니다.', () => {
        const callee = {type: 'Identifier', name: 'setTimeout'};
        const result = isMacroTask(callee);
        expect(result).toBe(true);
    });
});