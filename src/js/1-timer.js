import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const inputCurrent = document.getElementById('datetime-picker');
const startButton = document.querySelector('button');

const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');

let userSelectedDate;
startButton.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() > 1000) {
      startButton.removeAttribute('disabled');
      iziToast.destroy();
    } else {
      startButton.setAttribute('disabled', true);
      iziToast.destroy();
      iziToast.show({
        message: '❌ Please choose a date in the future',
        close: false,
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: 20,
        timeout: 0,
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
    }
  },
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() > 1000) {
      iziToast.destroy();
      startButton.removeAttribute('disabled');
      userSelectedDate = selectedDates[0].getTime();
    } else {
      startButton.setAttribute('disabled', true);
    }
  },
};
const timers = flatpickr('input#datetime-picker', options);

startButton.addEventListener('click', startButtonHandler);

function startButtonHandler() {
  const timerInterval = setInterval(fillTime, 1000);
  inputCurrent.setAttribute('disabled', true);
  startButton.setAttribute('disabled', true);
  setTimeout(() => {
    clearInterval(timerInterval);
    inputCurrent.removeAttribute('disabled');
    startButton.removeAttribute('disabled');
  }, userSelectedDate - Date.now());
}

function fillTime() {
  const selected = convertMs(userSelectedDate - Date.now());
  if (userSelectedDate - Date.now() > 0) {
    daysCounter.textContent = addLeadingZero(selected.days);
    hoursCounter.textContent = addLeadingZero(selected.hours);
    minutesCounter.textContent = addLeadingZero(selected.minutes);
    secondsCounter.textContent = addLeadingZero(selected.seconds);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
