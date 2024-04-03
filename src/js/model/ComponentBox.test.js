import { ComponentBox, Observable } from "./ComponentBox";

describe('Observable 단위 테스트', () => {
  let observable;
  let mockObserver;

  beforeEach(() => {
    //given
    observable = new Observable();
    mockObserver = jest.fn();
  });

  test('subscribe로 _observers에 mockObserver 추가', () => {
    // when
    observable.subscribe(mockObserver);
    const result = observable._observers.has(mockObserver);

    // then
    expect(result).toBe(true);
  });

  test('unsubscribe로 _observers에 추가된 observer를 제거', () => {
    // when
    observable.subscribe(mockObserver);
    observable.unsubscribe(mockObserver);
    const result = observable._observers.has(mockObserver);

    //
    expect(result).toBe(false);
  });

  test('notify로 테스트 데이터가 모든 옵저버에 추가되어 호출', () => {
    // given 
    const anotherMockObserver = jest.fn();
    const testData = { data: 'test' };

    // when
    observable.subscribe(mockObserver);
    observable.subscribe(anotherMockObserver);
    observable.notify(testData);

    // then
    expect(mockObserver).toHaveBeenCalledWith(testData);
    expect(anotherMockObserver).toHaveBeenCalledWith(testData);
  });
});

describe('ComponentBox 단위 테스트', () => {
  let componentBox;
  const className = 'test-class';
  const maxLength = 10;
  const mockObserver = jest.fn();

  beforeEach(() => {
    componentBox = new ComponentBox(className, maxLength);
    componentBox.subscribe(mockObserver);
    mockObserver.mockClear();
  });

  test('초기화를 할 시에 알맞은 className과 maxLength를 초기화', () => {
    // given in beforeEach()
    
    // when
    const classNameResult = componentBox.getClassName();
    const maxLengthResult = componentBox.maxLength;

    // then
    expect(classNameResult).toBe(className);
    expect(maxLengthResult).toBe(maxLength);
  });

  test('setComponents가 components를 업데이트하고, 구독한 옵저버에게 notify를 전송', () => {
    // given additionally after beforeEach()
    const newComponents = ['component1', 'component2'];

    // when
    componentBox.setComponents(newComponents);
    const componentsResult = componentBox.getComponents();

    // then
    expect(componentsResult).toEqual(newComponents);
    expect(mockObserver).toHaveBeenCalledWith({
      className: className,
      contents: newComponents.map(component => component.toString()),
      maxLength: maxLength,
    });
  });
});