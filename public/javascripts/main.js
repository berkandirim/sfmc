const form = document.getElementById('notificationForm');
const saveButton = document.getElementById('save');
const previewButton = document.getElementById('preview');
const select = document.getElementById('country');

fetch('https://mock-countries.herokuapp.com/list/').then((res) => {
  res.json().then((data) => {
    data.forEach((item) => {
      let option = document.createElement('option');
      option.value = item.code;
      option.text = item.name;
      select.add(option);
    })
  })
}).catch((e) => {
  console.log(e)
});