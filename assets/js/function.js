// time counter

const timerFunction = (curTime, date, time, interVal = null, audio) => {
  const setTime = new Date(date + " " + time);
  let orderTime = Math.floor(setTime.getTime() - Date.now());
  let total_sec = Math.floor(orderTime / 1000);
  let total_min = Math.floor(total_sec / 60);
  let total_hour = Math.floor(total_min / 60);
  let total_day = Math.floor(total_hour / 24);
  let hour = total_hour - total_day * 24;
  let min = total_min - total_day * 24 * 60 - hour * 60;
  let second = total_sec - total_day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;

  if (orderTime > 0) {
    return `Day <span class="text-warning">${total_day} </span>: Hour <span class="text-warning"> ${hour} </span> : Min <span class="text-warning">${min} </span>: Sec <span class="text-warning">${second}</span>`;
  } else if (orderTime <= 0) {
    audio.play();
    return `<span class="text-white bg-danger d-block px-4 ">time over</span>`;
  }
};

// progress bar

const progressBar = (date, time, interval = null, curTime) => {
  let setTime = new Date(date + " " + time);
  let timeDiff = setTime.getTime() - curTime;

  let timeChange = setTime.getTime() - Date.now();
  let Final = `${100 - Math.floor((100 * timeChange) / timeDiff)}%`;

  if (timeChange > 0) {
    return Final;
  } else if (timeChange <= 0) {
    return `100%`;
  }
};

// set alert

const setAlert = (msg, type = "danger") => {
  return `<h5 class="alert alert-${type} text-center">${msg}</h5>`;
};

// set ls data

const setLsData = (key, value) => {
  let data = [];
  if (localStorage.getItem(key)) {
    data = JSON.parse(localStorage.getItem(key));
  }
  data.push(value);
  return localStorage.setItem(key, JSON.stringify(data));
};

// get ls data

const getLsData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
};

// update Ls Data

const updateLsData = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};
