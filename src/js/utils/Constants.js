export const GREEN_CODE = `console.log("start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

new Promise((resolve)=>resolve("Promise"))
.then((res) => console.log(res));

console.log("End");
`;

export const RED_CODE = `fetch('https://api.example.com/data', {
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
.then(data => { 
    console.log(data) 
})
.catch(error => console.error('There was a problem', error));

setTimeout(function() {
    alert('This message is shown after 3 seconds');
}, 3000);
`;

export const BTN_CLASS_NAME = {
	green: "green",
	red: "red",
	excute: "code__input__excute",
};

export const ANIMATION = {
	delay: 1500,
};

export const PARSER = {
	firstChar: 1,
	lastChar: -1,
	maxLength: 40,
	FETCH: "fetch",
	CATCH: "catch",
};
