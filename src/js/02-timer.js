import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from 'notiflix';

const datetimePickerEl = document.querySelector('input#datetime-picker');
const dataBtnStartEl = document.querySelector('button[data-start]');
let selectedDate = null;
// Блокування кнопки Start
dataBtnStartEl.disabled = true;
// Об'єкт налаштування для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    // console.log(selectedDate);
    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      //   console.log(Date.now());
    } else {
      dataBtnStartEl.disabled = false;
    }
  },
};

flatpickr(datetimePickerEl, options);
// Прослуховування кнопки Start для виклику Таймера
dataBtnStartEl.addEventListener('click', () => {
  timer.start();
});
// Обєкт ТАЙМЕР
const timer = {
  delta: null,
  intervalId: null,
  rootSelector: document.querySelector('.timer'),
  // метод запуску ТАЙМЕРА
  start() {
    this.intervalId = setInterval(() => {
      this.delta = selectedDate - Date.now();
      if (this.delta <= 0) {
        this.stop;
        return;
      }
      //   console.log(this.delta);
      // виклик і реструктуризація результатів виконання функці (Переведення мс у дн, год, хв, сек)
      dataBtnStartEl.disabled = true;
      datetimePickerEl.disabled = true;
      const { days, hours, minutes, seconds } = this.convertMs(this.delta);
      // присвоєння значень в спани + додавання "0" спереду якщо символ один
      this.rootSelector.querySelector('[data-days]').textContent =
        this.addLeadingZero(days);
      this.rootSelector.querySelector('[data-hours]').textContent =
        this.addLeadingZero(hours);
      this.rootSelector.querySelector('[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      this.rootSelector.querySelector('[data-seconds]').textContent =
        this.addLeadingZero(seconds);
    }, 1000);
  },
  // Зупинка таймера
  stop() {
    clearInterval(this.intervalId);
  },
  // Переведення мілісекунд у дні, години, хвилини, секунди
  convertMs(ms) {
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
    //   console.log({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
  },
  // метод автозаповнення, Start - спереду, якщо менше "n"(тут 2) символів додай "0" (символ) спереду.
  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};
