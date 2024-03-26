# fe-eventloop

## 기본 설계
 - acorn을 활용하여 구현한다.
 - 화면에 그려주는 박스를 생성하는 것은 class로 구현한다.
   - 코드 text를 constructor에 넣으면 코드를 담고있는 박스를 생성한다.
 - promise는 macotask부터 구현한 후 구현한다.

## macrotask queue순서
 - 코드를 입력받는다
 - 코드를 콜스택에 그려준다
 - 콜스택 클래스에서 콜백을 분리한다.
 - 분리한 콜백을 wepApi에 넘겨준다
 - wepApi에 그려준다 

main > callStack > wepApi > micro/macro task Queue > callStack
 -astparser