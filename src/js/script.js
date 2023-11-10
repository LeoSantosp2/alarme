const h1Hour = document.querySelector('.hour');
const inputHour = document.getElementById('hour');
const inputMinute = document.getElementById('minute');
const btnAddAlarm = document.querySelector('.add-alarm');
const btnClearAlarm = document.querySelector('.clear-alarm');
const alarmList = document.querySelector('.alarm-list');
const alarmSound = document.querySelector('.alarm-sound');

// Create and set elements

let listAlarm = [];
let idAlarm = 1;

const currentTime = () => {
  const time = new Date().toLocaleTimeString('pt-BR');

  h1Hour.innerHTML = time;

  listAlarm.forEach((alarm) => {
    if (alarm.isActive && alarm.time + ':00' === time) {
      alarmSound.play();
    }
  });
};

const appendZero = (value) => (value < 10 ? '0' + value : value);

const setAlarm = (hour, minute) => {
  const p = document.createElement('p');
  const alarmsDiv = document.createElement('div');
  const funcionsDiv = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const span = document.createElement('span');
  const deleteButton = document.createElement('i');

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    alert('Horário inserido, é inválido.');
    return;
  }

  const alarm = {
    id: idAlarm++,
    time: `${hour === '' ? '00' : appendZero(hour)}:${
      minute === '' ? '00' : appendZero(minute)
    }`,
    isActive: false,
  };

  listAlarm.push(alarm);

  alarmsDiv.classList.add('alarm');
  funcionsDiv.classList.add('functions');
  label.classList.add('switch');
  deleteButton.classList.add('bx', 'bx-trash');

  listAlarm.forEach((alarms) => {
    p.textContent = alarms.time;
    alarmsDiv.id = alarms.id;
  });

  deleteButton.addEventListener('click', () => {
    deleteAlarm(alarmsDiv);
  });

  input.setAttribute('type', 'checkbox');

  input.addEventListener('change', () => toggleAlarm(alarm));

  label.append(input, span);
  funcionsDiv.append(label, deleteButton);

  alarmsDiv.append(p, funcionsDiv);

  alarmList.append(alarmsDiv);

  inputHour.value = '';
  inputMinute.value = '';
};

const deleteAlarm = (alarmDiv) => {
  listAlarm = listAlarm.filter((alarm) => String(alarm.id) !== alarmDiv.id);

  alarmDiv.remove();
};

const toggleAlarm = (alarm) => {
  const time = new Date().toLocaleTimeString('pt-BR').slice(0, 5);

  alarm.isActive = !alarm.isActive;

  console.log(alarm.time === time);

  if (alarm.isActive) {
    if (alarm.time === time) {
      alarmSound.play();
    }
  } else {
    alarmSound.pause();
  }
};

btnAddAlarm.addEventListener('click', () => {
  setAlarm(inputHour.value, inputMinute.value);
});

btnClearAlarm.addEventListener('click', () => {
  listAlarm = [];

  alarmList.remove();
  location.reload();
});

window.onload = () => {
  setInterval(currentTime, 1000);
};
