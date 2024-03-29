# ➰이벤트 루프 시각화

# 🚩기능 요구사항

## 🎨UI

- [x] 사용자로부터 코드를 입력받는 textarea
- [x] 입력받은 코드를 동작시키는 view component
- [ ] 코드 실행시 하이라이트(class='excute')
- [x] call stack
- [x] wep api
- [x] microtask queue
- [x] macrotask queue
- [x] event loop
- [x] **각각 item의 애니매이션은 class로 부여**

## object literal

- [x] 입력받은 함수를 파싱
- [ ] 위 파싱에 걸리지 않으면 결과는 callstack

## call stack

- [x] class형태
- [x] pop/push
- [x] 이하 경우의 수를 나누는 함수(css class부여)
  - 1.wep api경우 : callback이 wep api로 이동(class='move-wep-api')
  - 2.promise인 경우 : callback이 마이크로 테스크로 이동(class='move-task-queue')
  - return 값은 item

## wep api

- [x] prototype이어도 될 것 같다. (함수1개)
- [x] 함수 실행이 끝나자마자 태스크 큐로 이동(class 부여)

## animation manager

- [x] 각 객체들의 애니메이션 컨트롤

---

# 📝메모

- 고차함수의 콜백 자체가 비동기이기 때문에 고차함수는 흐름제어를 할 수 없다
