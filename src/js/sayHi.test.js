import { sayHi } from "./SubmitHandler.js";

test("sayHi unit test", () => {
    expect(typeof sayHi()).toBe("string");
    expect(sayHi('Merlin').includes('Merlin')).toBe(true);
})