const submitCode = (e) => {
  e.preventDefault();

  const usercode = document.querySelector('#code-input').value;
  document.querySelector('#code-input').value = '';

  const parseCode = acorn.parse(usercode, {
    sourceType: 'module',
  });

  // console.log(parseCode);
};

document.querySelector('#code-form').addEventListener('submit', submitCode);
