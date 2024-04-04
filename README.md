# fe-eventloop

## AST(acorn)
 - [X] 입력받은 함수를 분리.
 - [X] microtask queue, macrotask queue를 구분해 콜백을 추출.
 - [X] 일반 함수, microtask queue, macrotask queue를 구분
   - fetch, then, setTimeout만 구분하기로 변경

## main.js
 - [X] 동작시키기 클릭 시 input 값을 받아옴
 - [X] 입력받은 코드를 AST로 파싱해 코드를 하나씩 call stack에 전달
 - [ ] 함수안에 뎁스가 있는지 확인해 뎁스가 있다면 콜스택에 추가로 전달
   -  뎁스 확인 x(fetch, then, setTimeout만 구분하기로 변경)
 - [X] 콜스택이 비어있는지 확인

## callStack.js
 - [X] 전달받은 함수를 박스로 만들어 html에 랜더
 - [X] 콜스택 in 애니메이션 실행
 - [X] 애니메이션 종료 시 콜백 분리 후 webApi.js에 전달
   - [X] microtask queue, macrotask queue를 구분할 수 있는 비교값이 필요함(함수로 분리)
 - [X] 콜스택을 제외한 나머지 코드는 콜스택 out 애니메이션 실행

## webApi.js
 - [X] callStack에서 전달받은 값을 기준으로 콜백 박스를 만든 후 랜더
 - [X] webApi in 애니메이션 실행
 - [X] callStack에서 전달받은 값으로 microtask queue, macrotask queue를 구분해 microtask queue, macrotask queue중 어떤 곳에 값을 전달할지 결정(container의 class명으로 구분)
 - [X] microtask queue, macrotask queue에 값 전달

## queue.js
 - [X] callStack이 비어있는지 확인
   - [X] macrotask는 microtask가 비어있는지도 확인
 - [X] 비어있다면 이벤트 루프를 걸쳐 콜스택에 전달 애니메이션 실행
 - [X] 콜스택 out 애니메이션 실행

## boxModel.js
 - [X] html에 그려줄 박스를 생성하는 객체

## locationCalulater.js
 - [X] 애니메이션을 그려줄 각 박스의 상대값 계산
 - [ ] 박스가 쌓일때의 위치 계산 - 보류

 ---------------
 # marron fe-eventloop_2
 ## 이번주 목표
- [ ] 코드 분석
- [ ] 코드 개선 
- [ ] 테스트코드 구현
  - [ ]단위 테스트 도구를 선택
  - [ ]코드의 일부분을 선택해서 단위 테스트를 구현
- [ ] 버그 isuue
  - [ ] 현재 동작되는 버그를 issue에 등록하고, 수정
  - [ ] 해당 버그를 수정하고, 이슈를 어떻게 해결했는지 작성하고 close
- [ ] 튜토리얼 보여주기 또는 동작 취소
