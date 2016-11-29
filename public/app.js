'use strict';
(function() {
  const form = document.getElementsByTagName('form')[0];
  const input = document.getElementById('file');
  const label = input.nextElementSibling;
  const filename = document.getElementsByClassName('filename')[0];
  const results = document.getElementById('results');
  let file = '';
  input.addEventListener('change', function(event) {
    file = event.target.value.split('\\').pop();
    if (file) {
      filename.textContent = file;
    }
  });
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    fetch(form.action, {
      method: 'post',
      body: new FormData(form)
    })
    .then(res => res.json())
    .then(res => results.textContent = JSON.stringify(res, null, 2));
  })
})();
