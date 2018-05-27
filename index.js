document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

let hourHand = document.querySelector('.hour-hand');
let minuteHand = document.querySelector('.minute-hand');
let secondHand = document.querySelector('.second-hand');

function setTime() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hoursDegrees = (hours / 12 + minutes/720) * 360 + 90;
  const minutesDegrees = (hours + (minutes/60)) * 360 + 90;
  const secondsDegrees = (minutes + (seconds/60)) * 360 + 90;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

  createNotification(hours, minutes, seconds);

}

setInterval(setTime, 1000);

function createNotification(hours, minutes, seconds) {
  if (Notification.permission == 'granted' && minutes === 0) {
    let notification = new Notification('Tik tak!', { body:'Jest godzina ' + hours + ':' + minutes + "!" });
  }

}

const controls = document.querySelectorAll('.property-panel input');

function handleControls() {
  document.documentElement.style.setProperty(`--${this.name}`, this.value);
}

controls.forEach(control => control.addEventListener('change', handleControls));
