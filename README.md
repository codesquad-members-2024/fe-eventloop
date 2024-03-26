# fe-eventloop

## `#promise` `#비동기` `#이벤트루프`

### 🔧 설치

- acorn 라이브러리 설치  
  `npm install acorn`

### ✨

- [x] 화면 레이아웃 짜기
- [x] form 태그로 입력한 코드 데이터 보내는 작업하기
- [ ] 받은 코드 데이터를 AST라이브러리로 코드 분석하기

### 🤔 실수 및 고민 사항

class의 메서드에서
addEventListener에서 일반 함수를 이벤트 핸들러로 전달하여 콜백 함수를 실행하려고 했다.  
이벤트 핸들러 내부의 this는 해당 이벤트 리스너가 부착된 DOM 요소를 가리키게 됩니다.

```js
 addEventHandler() {
    document.getElementById(this.formId).addEventListener('submit', this.handleFormSubmit);
  }
```

```js
  handleFormSubmit(e) {
    e.preventDefault();
    this.parseCode(); // 콜백 함수를 호출하며 usercode를 매개변수로 전달
  }
```

근데 this.parseCode();를 함수로 인식을 못하는 에러가 발생했다.  
<i>this.parseCode is not a function at HTMLFormElement.handleFormSubmit</i>

this가 예상과 다른 컨텍스트(여기서는 HTMLFormElement)를 가리키고 있기 때문에 발생했다.  
JavaScript에서 this의 값은 함수가 호출되는 방식에 따라 달라지며,  
특히 이벤트 핸들러와 같이 콜백 함수에서 this의 값이 자주 예상치 않게 변할 수 있다.

🔽

```js
handleFormSubmit = (e) => {
  e.preventDefault();
  this.parseCode();
};
```

해결 방법: 화살표 함수 사용

화살표 함수는 자신을 포함하고 있는 외부 스코프에서 this 값을 가져온다.  
따라서, addEventListener의 콜백으로 화살표 함수를 사용하면,  
그 화살표 함수 내부의 this는 addEventListener를 호출한 스코프의 this,  
즉 SubmitHandler 인스턴스를 정확히 가리키게 된다.
