import parserUtils from "./ParserUtils.js";

describe("isEmpty 단위 테스트", () => {
  test("배열의 길이가 0일 때 true를 반환", () => {
    // given
    const input = [];

    // when
    const result = parserUtils.isEmpty(input);

    // then
    expect(result).toBe(true);
  });

  test.each([
    undefined,
    null,
    "",
    0,
    {},
    BigInt(Number.MAX_SAFE_INTEGER),
    Symbol("foo"),
  ])("입력된 값이 배열이 아닐 때 false를 반환", (input) => {
    // given input

    // when
    const result = parserUtils.isEmpty(input);

    // then
    expect(result).toBe(false);
  });

  test.each([[1], [1, 2], [1, 2, 3]])(
    "입력된 배열의 길이가 0보다 클 때 false를 반환",
    (input) => {
      // given input

      // when
      const result = parserUtils.isEmpty(input);

      // then
      expect(result).toBe(false);
    }
  );
});

describe("isObjectType 단위 테스트", () => {
  test.each([
    undefined,
    null,
    0,
    "string",
    BigInt(Number.MAX_SAFE_INTEGER),
    Symbol("foo"),
  ])("입력된 값이 Object 타입이 아니면 false를 반환", (input) => {
    // given input

    // when
    const result = parserUtils.isObjectType(input);

    // then
    expect(result).toBe(false);
  });

  test.each([{ node: {} }, [{ node: {} }], [1, "2"], [], {}])(
    "입력된 값이 Object 타입이면 true를 반환",
    (input) => {
      // given input

      // when
      const result = parserUtils.isObjectType(input);

      // then
      expect(result).toBe(true);
    }
  );
});

describe("isValidNodeType 단위 테스트", () => {
  test.each([{ type: "FirstExpression" }, { type: "SecondExpression" }])(
    "입력한 노드의 타입이 types 배열에 포함되면 true를 반환",
    (node) => {
      // given node and types
      const types = ["FirstExpression", "SecondExpression"];

      // when
      const result = parserUtils.isValidNodeType(node, types);

      // then
      expect(result).toBe(true);
    }
  );

  test("입력한 노드의 타입이 types 배열에 포함되지 않으면 false를 반환", () => {
    // given
    const node = { type: "ThirdExpression" };
    const types = ["FirstExpression", "SecondExpression"];

    // when
    const result = parserUtils.isValidNodeType(node, types);

    // then
    expect(result).toBe(false);
  });
});

describe("isCallbackExpression 단위 테스트", () => {
  test.each([{ type: "CallExpression" }, { type: "NewExpression" }])(
    "입력한 노트의 타입이 CallExpression 이거나 NewExpression 이면 true를 반환",
    (node) => {
      // given node

      // when
      const result = parserUtils.isCallbackExpression(node);

      // then
      expect(result).toBe(true);
    }
  );

  test("입력한 노드의 타입이 CallExpression 이거나 NewExpression이 아니면 false를 반환", () => {
    // given
    const node = { type: "FunctionExpression" };

    // when
    const result = parserUtils.isCallbackExpression(node);

    // then
    expect(result).toBe(false);
  });
});

describe("isFunction 단위 테스트", () => {
  test.each([
    { type: "FunctionExpression" },
    { type: "ArrowFunctionExpression" },
  ])(
    "입력한 노트의 타입이 FunctionExpression 이거나 ArrowFunctionExpression 이면 true를 반환",
    (node) => {
      // given node

      // when
      const result = parserUtils.isFunction(node);

      // then
      expect(result).toBe(true);
    }
  );

  test("입력한 노드의 타입이 CallExpression 이거나 NewExpression이 아니면 false를 반환", () => {
    // given
    const node = { type: "CallExpression" };

    // when
    const result = parserUtils.isFunction(node);

    // then
    expect(result).toBe(false);
  });
});

describe("isMicroTask 단위 테스트", () => {
  test.each([
    { callee: { name: "then" } },
    { callee: { name: "catch" } },
    { callee: { name: "finally" } },
    { callee: { name: "MutationObserver" } },
    { callee: { name: "Promise" } },
    { callee: { name: "queueMicrotask" } },
    { callee: { name: "nextTick" } },
  ])("노드의 callee.name이 Microtask 호출자 이름일 때 true를 반환", (node) => {
    // given node

    // when
    const result = parserUtils.isMicroTask(node);

    // then
    expect(result).toBe(true);
  });

  test.each([
    { callee: { property: { name: "then" } } },
    { callee: { property: { name: "catch" } } },
    { callee: { property: { name: "finally" } } },
    { callee: { property: { name: "MutationObserver" } } },
    { callee: { property: { name: "Promise" } } },
    { callee: { property: { name: "queueMicrotask" } } },
    { callee: { property: { name: "nextTick" } } },
  ])(
    "노드의 callee.property.name이 Microtask 호출자 이름일 때 true를 반환",
    (node) => {
      // given node

      // when
      const result = parserUtils.isMicroTask(node);

      // then
      expect(result).toBe(true);
    }
  );

  test("노드의 callee.name이 Microtask 호출자 이름이 아닐 때 false를 반환", () => {
    // given
    const node = { callee: { name: "setTimeout" } };

    // when
    const result = parserUtils.isMicroTask(node);

    // then
    expect(result).toBe(false);
  });

  test("노드의 callee.property.name이 Microtask 호출자 이름이 아닐 때 false를 반환", () => {
    // given
    const node = { callee: { property: { name: "setTimeout" } } };

    // when
    const result = parserUtils.isMicroTask(node);

    // then
    expect(result).toBe(false);
  });
});

describe("isMacroTask 단위 테스트", () => {
  test.each([
    { callee: { type: 'Identifier', name: 'setTimeout' } },
    { callee: { type: 'Identifier', name: 'setInterval' } },
    { callee: { type: 'Identifier', name: 'setImmediate' } },
    { callee: { type: 'Identifier', name: 'clearInterval' } },
    { callee: { type: 'Identifier', name: 'clearTimeout' } },
    { callee: { type: 'Identifier', name: 'requestAnimationFrame' } },
    { callee: { type: 'Identifier', name: 'cancelAnimationFrame' } },
    { callee: { type: 'Identifier', name: 'requestIdleCallback' } },
    { callee: { type: 'Identifier', name: 'cancelIdleCallback' } },
  ])("노드의 callee.type이 Identifier이고 callee.name이 Macrotask 호출자 이름일 때 true를 반환", (node) => {
    // given node

    // when
    const result = parserUtils.isMacroTask(node);

    // then
    expect(result).toBe(true);
  });

  test("노드의 callee.type이 Identifier이지만 callee.name이 Macrotask 호출자 이름이 아닐 때 false를 반환", () => {
    // given
    const node = { callee: { type: "Identifier", name: "then" }};

    // when
    const result = parserUtils.isMacroTask(node);

    // then
    expect(result).toBe(false);
  });

  test("노드의 callee.type이 Identifier가 아닐 때 false를 반환", () => {
    // given
    const node = { callee: { type: "MemberExpression", name: "setTimeout" } };

    // when
    const result = parserUtils.isMacroTask(node);

    // then
    expect(result).toBe(false);
  });
});

describe("isAsyncFunction 단위 테스트", () => {
  test("노드가 Microtask 콜백 함수일 때, true를 반환", () => {
    // given
    const microTaskNode = { callee: { name: "then" } };

    // when
    const result = parserUtils.isAsyncFunction(microTaskNode);

    // then
    expect(result).toBe(true);
  });

  test("노드가 Macrotask 콜백 함수일 때, true를 반환", () => {
    // given
    const macroTaskNode = { callee: { type: "Identifier", name: "setTimeout" } };

    // when
    const result = parserUtils.isAsyncFunction(macroTaskNode);

    // then
    expect(result).toBe(true);
  });

  test("노드가 비동기 콜백 함수가 아닐 때, false를 반환", () => {
    // given
    const node = { callee: { type: "Identifier", name: "log" } };

    // when
    const result = parserUtils.isAsyncFunction(node);

    // then
    expect(result).toBe(false);
  });
});

describe("getCalleeName 단위 테스트", () => {
  test("노드의 callee.type이 Identifier일 때, callee.name을 반환", () => {
    // given
    const node = { callee: { type: "Identifier", name: "setTimeout" } };

    // when
    const result = parserUtils.getCalleeName(node);

    // then
    expect(result).toBe("setTimeout");
  });

  test("노드의 callee.property.type이 Identifier일 때, callee.property.name을 반환", () => {
    // given
    const node = { callee: { property: { type: "Identifier", name: "setTimeout" } } };

    // when
    const result = parserUtils.getCalleeName(node);

    // then
    expect(result).toBe("setTimeout");
  });

  test("노드의 callee.type이 Identifier가 아니면서 callee.property가 없거나 callee.property.type이 Identifier가 아닐때, null을 반환", () => {
    // given
    const node = { callee: { type: "MemberExpression" } };

    // when
    const result = parserUtils.getCalleeName(node);

    // then
    expect(result).toBeNull();
  });

  test("노드의 callee가 undefined일 때, null을 반환", () => {
    // given
    const node = {};

    // when
    const result = parserUtils.getCalleeName(node);

    // then
    expect(result).toBeNull();
  });

  test("노드의 callee.property가 있으나 type이 Identifier가 아닐 때, null을 반환", () => {
    // given
    const node = { callee: { property: { type: "MemberExpression", name: "setTimeout" } } };

    // when
    const result = parserUtils.getCalleeName(node);

    // then
    expect(result).toBeNull();
  });
})