let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    running = false;
    timeDisplay.textContent = '00:00:00.00';
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function addLap() {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = `Lap: ${lapTime}`;
        lapsList.appendChild(li);
    }
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);
