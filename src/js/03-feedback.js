import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector(`.feedback-form`),
  email: document.querySelector(`input`),
  textarea: document.querySelector(`.feedback-form textarea`),
};

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

refs.form.addEventListener(`submit`, onFormSubmit);
refs.form.addEventListener(`input`, throttle(onFormInput, 500));

populateForm();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  console.log(event.target.value);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
}

function populateForm() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  const parsedSavedMessage = JSON.parse(savedMessage);
  if (parsedSavedMessage) {
    refs.email.value = parsedSavedMessage.email;
    refs.textarea.value = parsedSavedMessage.message;
  }
}
console.log(formData);
