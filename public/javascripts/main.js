let formData = {};
let countries = [];

const URLregex = new RegExp(
  "^" +
  // protocol identifier
  "(?:(?:https?|ftp)://)" +
  // user:pass authentication
  "(?:\\S+(?::\\S*)?@)?" +
  "(?:" +
  // IP address exclusion
  // private & local networks
  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
  "|" +
  // host name
  "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
  // domain name
  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
  // TLD identifier
  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
  // TLD may end with dot
  "\\.?" +
  ")" +
  // port number
  "(?::\\d{2,5})?" +
  // resource path
  "(?:[/?#]\\S*)?" +
  "$", "i"
);

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
const notification = document.getElementById('notification');
const closeNot = document.getElementById('closeNot');
const notTitle = document.getElementById('notTitle');
const notBody = document.getElementById('notBody');
const notIcon = document.getElementById('notIcon');

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
  fetch('/post', {
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
};

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
    return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
};

const addClass = (el, className) => {
  if (el.classList)
    el.classList.add(className);
  else if (!hasClass(el, className)) el.className += ' ' + className
};

const removeClass = (el, className) => {
  if (el.classList)
    el.classList.remove(className);
  else if (hasClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ')
  }
};

const validateForm = () => {
  let required = [];
  if (title.value === '') required.push('Title');
  if (description.value === '') required.push('Description');
  if (image.value === '') required.push('Image');
  if (countries.length === 0) required.push('Country');
  
  if (required.length > 0) {
    alert('Please fill the following field(s): ' + required);
    return false;
  } else if (!URLregex.test(image.value)) {
    alert('Image URL must be a valid URL');
    return false;
  } else return true
};

getCountryList();

previewButton.onclick = () => {
  notTitle.innerHTML = title.value;
  notBody.innerHTML = description.value;
  notIcon.src = image.value;
  addClass(notification, 'in-view');
};

closeNot.onclick = (e) => {
  e.preventDefault();
  removeClass(notification, 'in-view');
};

clearButton.onclick = () => {
  form.reset();
};

saveButton.onclick = () => {
  countries = getSelectedCountries(select);
  formData = {
    title: title.value,
    description: description.value,
    country: countries,
    image: image.value
  };
  
  const valid = validateForm();
  
  if (valid) {
    postFormData(formData).then(() => {
      output.append(JSON.stringify(formData));

      removeClass(step2, 'is-hidden');
      addClass(step1, 'is-hidden');

      removeClass(btnStep1, 'active');
      addClass(btnStep2, 'active');
    }).catch((e) => {
      console.error(e)
    })
  }
};