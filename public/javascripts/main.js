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
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const btnStep1 = document.getElementById('btnStep1');
const btnStep2 = document.getElementById('btnStep2');

// methods
const getCountryList = () => {
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
    console.error(e)
  });
};

const postFormData = async (formData) => {
  fetch('/save', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(formData)
  }).then((res) => {
    if (res.status === 200) {
      console.log('Saved to DB successfully');
    }
  });
}

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

const hasClass = (el, className) => {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

const addClass = (el, className) => {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += ' ' + className
};

const removeClass = (el, className) => {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
};

getCountryList();

previewButton.onclick = () => {

};

clearButton.onclick = () => {
  form.reset();
};

saveButton.onclick = () => {
  let countries = getSelectedCountries(select);
  let formData = {
    title: title.value,
    description: description.value,
    country: countries,
    image: image.value
  };

  postFormData(formData).then(() => {
    output.append(JSON.stringify(formData));

    removeClass(step2, 'is-hidden');
    addClass(step1, 'is-hidden');

    removeClass(btnStep1, 'active');
    addClass(btnStep2, 'active');
  }).catch((e) => {
    console.error(e)
  })
};

// TODO: create a public method for revealing step 2
