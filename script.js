const mydate = document.querySelector('#mydate');
const btn = document.getElementById('btn');
const result = document.querySelector('.result');

let countdownInterval;

// Function to start the countdown
function startCountdown() {
  countdownInterval = setInterval(() => {
    if (comingBirth) {
      let currentDate = new Date();
      comingBirth = new Date(comingBirth);
      comingBirth = new Date(currentDate.getFullYear() + '-' + (comingBirth.getMonth() + 1) + '-' + comingBirth.getDate());
      let today = new Date();
      let nowToday = new Date().setHours(0, 0, 0, 0);

      if (nowToday === comingBirth.getTime()) {
        clearInterval(countdownInterval);
        let ok = randomColor();
        result.style.color = "#" + ok;
        result.innerText = "🥰🥰🥰 Happy Birthday 🥰🥰🥰";
        
      } else {
        if (today > comingBirth) {
          comingBirth = new Date((currentDate.getFullYear() + 1) + '-' + (comingBirth.getMonth() + 1) + '-' + comingBirth.getDate());
        }
        today = today.getTime();
        comingBirth = comingBirth.getTime();
        let diff = comingBirth - today;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor(diff / (1000 * 60 * 60) % 24);
        let minutes = Math.floor((diff / (1000 * 60)) % 60);
        let seconds = Math.floor((diff / 1000) % 60);
        let message = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds Left For Your Birthday`;
        result.innerText = ''; // Clear the content before adding new text
        message.split(' ').forEach(word => {
          let span = document.createElement('span');
          span.style.color = '#' + randomColor(); // Apply random color to each word
          span.innerText = word + ' '; // Add space after each word
          result.appendChild(span);
        });
        // let ok = randomColor();
        // result.style.color = "#" + ok;
      }
    
    }
  }, 1000);
}

function randomColor(){
  return Math.floor(Math.random()*16777215).toString(16);
}

// Function to handle form submission
function handleSubmit() {
  takeDate();
  clearInterval(countdownInterval); // Clear existing countdown interval
  startCountdown(); // Start the countdown with the new date
}

// Event listener for pressing Enter on the input field
mydate.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSubmit(); // Call handleSubmit function on Enter key press
  }
});

// Event listener for button click
btn.addEventListener('click', handleSubmit);

// Function to update the comingBirth variable with the selected date
function takeDate() {
  comingBirth = mydate.value;
}
