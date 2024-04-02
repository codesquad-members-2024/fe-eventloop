# 구현할 기능 목록

## 코드 분석

- [ ] AST 파서 사용
  - [ ] AST 파서로 동기 함수, 비동기 함수 추출 및 분리
  - [ ] 비동기 함수 중 `Micro Task Queue`와 `Macro Task Queue`에 포함될 함수들 분리

## View

- [ ] 콜 스택, WEB APIs, micro 태스크 큐, macro 태스크 큐를 렌더링 할 `Container` 컴포넌트 구현
- [ ] 각 컨테이너들에 포함될 `Function` 컴포넌트 구현
- [ ] 코드를 입력하는 `Input` 컴포넌트 구현
- [ ] WEB APIs에서 태스크 큐로 이동하는 애니메이션
- [ ] 태스크 큐에서 콜 스택으로 이동하는 애니메이션

## Model

- [ ] `Function` 프로토타입 구현
- [ ] `Callback` 클래스 구현 (`Function` 확장)
- [ ] `MicroCallback` 클래스 구현 (`Callback` 확장)
- [ ] `MacroCallback` 클래스 구현 (`Callback` 확장)
- [ ] AST 파서를 활용하여 이벤트 루프에 필요한 `expression` 들과 `expression` 들의 실행 순서를 분석하는 `CodeAnalyzer` 클래스 구현

## Controller

- [ ] 클릭 이벤트 관리
- [ ] `Input` 컴포넌트에서 입력된 코드를 `CodeAnalyzer` 로 전달
- [ ] `CodeAnalyzer`에서 분석된 값을 저장
- [ ] 분석한 값들을 `View`에 넘겨 `Function` 컴포넌트 출력

<br>

---

<br>

## 🧸 Woody 예상 manday

### 4/1 ~ 4/4 (4d)

- [x] 코드 분석 - 그림으로 그려보기
- [ ] 코드 분석 - [mermaid](https://www.mermaidchart.com/landing)로 다이어그램 사용해보기 (Option)
- [ ] 테스트 코드 - [jest](https://jestjs.io/docs/getting-started) 학습
- [ ] 테스트 코드 - 비 ui요소를 먼저 테스트 해보자 (유틸리티)

### 4/5 (1d) ?

- [ ] 튜토리얼 보여주기 기능 - 노출 영역은 임의 공간을 활용한다.
- [ ] 튜토리얼 보여주기 기능 - 옵저버 패턴을 적용해서 단계별로 진행되는 과정을 텍스트 형태로 화면에 노출

### 🔧 Setting

<b>🃏 Jest</b>

- package.json 파일 만들기  
  $ `npm init -y`

- Jest 라이브러리를 개발 의존성으로 설치  
  $ `npm install --save-dev jest`

  - @types/jest 를 설치 해줘야 코드 자동완성 기능이 활성화된다.
    $ `npm install --save-dev jest @types/jest`

- package.json 파일 수정

  ```json
  "script" : {
    "test": "jest --watch"
  }
  ```

  `--watch`옵션은 파일을 수정하고 저장하면 자동으로 파일의 변경을 감지하고 테스트 코드를 실행한다.

- 그럼 이제, 터미널에 $ `npm test`를 입력하면 jest 커맨드가 실행된다.

<br>

<b>⚡ Babel</b>

jest 실행 시($ `npm test`) import(ES6+)가 안되는 이슈.

- Babel 관련 패키지 설치  
   `npm install --save-dev jest @babel/preset-env`

- babel.config.cjs 파일 생성

  ```js
  module.exports = {
    presets: ['@babel/preset-env'],
  };
  ```

- jest.config.cjs 파일 생성

  ```js
  module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
  ```
