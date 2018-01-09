let formData = {};

// cache DOM
const form = document.getElementById('notificationForm');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const previewButton = document.getElementById('preview');
const select = document.getElementById('country');
const title = document.getElementById('title');
const description = document.getElementById('description');
const image = document.getElementById('image');
const output = document.getElementById('output');

// methods
const getSelectedCountries = (select) => {
  let result = [];
  let options = select && select.options;
  let opt;
  
  for (let i in options) {
    opt = options[i];
    
    if (opt.selected) {
      result.push(opt.value)
    }
  }
  
  return result;
};

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

previewButton.onclick = () => {
  
};

clearButton.onclick = () => {
  form.reset();
};

saveButton.onclick = () => {
  let countries = getSelectedCountries(select);
  formData = {
    title: title.value,
    description: description.value,
    countries: countries,
    imageUrl: image.value
  };
  output.append(JSON.stringify(formData));
};