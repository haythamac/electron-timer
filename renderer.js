let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const statusLight = document.getElementById('status-light');
const statusText = document.getElementById('status-text');

function updateDisplay() {
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateStatus(isActive, text) {
  if (isActive) {
    statusLight.classList.add('active');
    document.title = `⏱️ Running - ${display.textContent}`;
  } else {
    statusLight.classList.remove('active');
    document.title = 'Electron Timer';
  }
  statusText.textContent = text;
}

function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
    updateDisplay();
    document.title = `⏱️ ${display.textContent}`;
  }, 1000);
  
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  updateStatus(true, 'Running');
  
  // Visual feedback
  addRippleEffect(startButton);
}

function stopTimer() {
  if (!isRunning) return;
  
  clearInterval(timer);
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  updateStatus(false, 'Paused');
  
  // Visual feedback
  addRippleEffect(stopButton);
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDisplay();
  updateStatus(false, 'Ready');
  startButton.disabled = false;
  stopButton.disabled = false;
  resetButton.disabled = false;
  
  // Visual feedback
  addRippleEffect(resetButton);
}

function addRippleEffect(button) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  button.appendChild(ripple);
  
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

// Initialize button states
stopButton.disabled = true;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', event => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
});