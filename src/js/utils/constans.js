export const CODE = `fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('There was a problem with your fetch operation:', error));

setTimeout(function() {
    alert('This message is shown after 3 seconds');
}, 3000);

new Promise((resolve)=>resolve("Promise"))
.then((res) => console.log(res));
`;

export const MICRO_TASK = ["Promise", "then"];
export const MACRO_TASK = ["setTimeout", "setInterval"];
export const TASK_DELAY = 7000;

export const EXPLIAN_CODE = {
	fetch:
		"fetch는 요청을 생성하고 리소스를 취득합니다. 반환 값은 해당 요청에 대한 Response로 이행하는 Promise입니다. ",
	then: "promise의 상태(Fulfilled)에 실행하려고 하는 콜백함수를 웹 API에 등록합니다.",
	catch: "promise의 상태(Rejected)에 실행하려고 하는 콜백함수를 웹 API에 등록합니다.",
	setTimeout: "해당하는 시간 뒤에 실행하려는 콜백함수를 웹 API에 등록합니다",
	Promise: "콜백함수를 웹 API에 등록하고 Promise 객체를 반환합니다.",
	"then cb":
		"웹 API에 등록된 콜백함수는 마이크로 큐에 들어가고 이밴트 루프에 의해 큐에서 콜스택으로 들어가 실행됩니다",
	"setTimeout cb":
		"웹 API에 등록된 콜백함수는 매크로 큐에 들어가고 이밴트 루프에 의해 큐에서 콜스택으로 들어가 실행됩니다. 우선순위는 마이크로 큐보다 낮습니다",
	"catch cb": "웹 API에 등록되어 있다가 promise의 상태가 Rejected가 될 경우 실행됩니다.",
	"Promise cb":
		"웹 API에 등록된 콜백함수는 마이크로 큐에 들어가고 이밴트 루프에 의해 큐에서 콜스택으로 들어가 실행됩니다",
};
