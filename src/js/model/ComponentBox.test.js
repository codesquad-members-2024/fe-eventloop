import { ComponentBox, Observable } from "./ComponentBox";

describe("Observable 단위 테스트", () => {
  let observable;
  let mockObserver;

  beforeEach(() => {
    //given
    observable = new Observable();
    mockObserver = jest.fn();
  });

  test("subscribe로 _observers에 mockObserver 추가", () => {
    // when
    observable.subscribe(mockObserver);
    const result = observable._observers.has(mockObserver);

    // then
    expect(result).toBe(true);
  });

  test("unsubscribe로 _observers에 추가된 observer를 제거", () => {
    // when
    observable.subscribe(mockObserver);
    observable.unsubscribe(mockObserver);
    const result = observable._observers.has(mockObserver);

    //
    expect(result).toBe(false);
  });

  test("notify로 테스트 데이터가 모든 옵저버에 추가되어 호출", () => {
    // given
    const anotherMockObserver = jest.fn();
    const testData = { data: "test" };

    // when
    observable.subscribe(mockObserver);
    observable.subscribe(anotherMockObserver);
    observable.notify(testData);

    // then
    expect(mockObserver).toHaveBeenCalledWith(testData);
    expect(anotherMockObserver).toHaveBeenCalledWith(testData);
  });
});

describe("ComponentBox 단위 테스트", () => {
  let componentBox;
  const className = "test-class";
  const mockObserver = jest.fn();

  beforeEach(() => {
    componentBox = new ComponentBox(className);
    componentBox.subscribe(mockObserver);
    mockObserver.mockClear();
  });

  test("초기화를 할 시에 알맞은 className를 초기화", () => {
    // given in beforeEach()

    // when
    const classNameResult = componentBox.getClassName();

    // then
    expect(classNameResult).toBe(className);
  });

  test("pushComponents가 components를 업데이트하고, 구독한 옵저버에게 notify를 전송", () => {
    // given additionally after beforeEach()
    const newComponents = ["component1", "component2"];

    // when
    newComponents.forEach((component) => componentBox.pushComponent(component));
    const componentsResult = componentBox.getComponents();

    // then
    expect(componentsResult).toEqual(newComponents);
    expect(mockObserver).toHaveBeenCalledWith({
      className: className,
      contents: newComponents.map((component) => component.toString()),
    });
  });

  test("unshiftComponent가 components의 첫번째 엘리먼트를 삭제하고, 1초 후 구독한 옵저버에게 notify를 전송한 후 삭제한 요소를 반환", () => {
    // given additionally after beforeEach()
    const newComponents = ["component1", "component2"];

    // when
    newComponents.forEach((component) => componentBox.pushComponent(component));
    const componentResult = componentBox.unshiftComponent();

    // then
    expect(componentResult).toEqual(newComponents[0]);
    setTimeout(() => {
      expect(mockObserver).toHaveBeenCalledWith({
        className: className,
        contents: newComponents[1],
      });
    }, 1000);
  });
});
