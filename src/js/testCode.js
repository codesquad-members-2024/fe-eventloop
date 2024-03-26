fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error('There was a problem with your fetch operation:', error));

setTimeout(function () {
  alert('This message is shown after 3 seconds');
}, 3000);
