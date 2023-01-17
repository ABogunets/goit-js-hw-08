import { save, load } from "./storage.js";
import throttle from 'lodash.throttle';

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
// у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. 
// В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, 
// message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту
//  і використовуй бібліотеку lodash.throttle.

const STORAGE_KEY = "feedback-form-state";

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(onFormInput, 500));

const createCurrentFormState = (email, message) => ({email, message});

function onFormInput(evt) {
  evt.preventDefault();
  const currentEmail = evt.currentTarget.email.value;
  const currentMessage = evt.currentTarget.message.value;
  save(STORAGE_KEY, createCurrentFormState(currentEmail, currentMessage));
}

formRef.addEventListener('submit', onFormSubmit);
function onFormSubject(evt) {
  evt.preventDefault();
}