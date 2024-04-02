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
export const TASK_DELAY = 3000;
