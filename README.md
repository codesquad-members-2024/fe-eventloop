# fe-eventloop

## `#promise` `#비동기` `#이벤트루프`

### 🔧 설치

- acorn 라이브러리 설치  
  `npm install acorn`

### ✨

- [x] 화면 레이아웃 짜기
- [x] form 태그로 입력한 코드 데이터 보내는 작업하기
- [x] 받은 코드 데이터를 AST라이브러리로 코드 분석하기

### 🤔 실수 및 고민 사항

📓 [Wiki Link](https://github.com/minjeongHEO/fe-eventloop/wiki/%5BEvent-Loop%5D-%EC%8B%A4%EC%88%98,-%EA%B3%A0%EB%AF%BC-%EC%82%AC%ED%95%AD,-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC-%F0%9F%93%93)


-------------------
## 우선 순위
1. 
 - [X] 코드 분석
 - [X] jest학습
 - [X] jest 테스트코드 작성/ 테스트 코드에 맞춰 리펙토링/ 진행중

2. 
 - [ ] 버그 및 할일 이슈 등록
 - [X] 버그 수정
   - [ ] input에 커서를 올렸을때 body태그가 무한 리로딩됨
   - [X] 처음 코드만 동작되고 뒤에 queue에 쌓인 코드들은 callStack으로 넘어가지 않음

3. 기능 추가 사항
 - [X] callStack이 비었을때 queue에서 callStack으로 넘어가는 기능
 - [X] callStack, queue(micro, macro)비어있는지 확인할 수 있는 로직 X
 - [ ] input에 새로운 코드를 입력하고 동작시키기를 누르면 현재 동작을 멈추고 새로 입력한 코드가 동작해야한다. 

4. 애니메이션 변경
 - [X] html을 만들어 박스에 넣고 빼는 방식은 동일하게 진행하되, keyframe으로 애니메이션 효과 추가
 - [X] keyframe 이름을 지정해 class를 빼고 넣는 방식으로 애니메이션
 - 
## 코드 구성도
![KakaoTalk_Photo_2024-04-02-10-16-39](https://github.com/minjeongHEO/fe-eventloop/assets/126482821/a557f55c-e5e3-4705-9ff2-aa0671057279)
![KakaoTalk_Photo_2024-04-02-10-16-32](https://github.com/minjeongHEO/fe-eventloop/assets/126482821/17544d77-4de0-47f4-a1e1-92b5b1c027ed)

