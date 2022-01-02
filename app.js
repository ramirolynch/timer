const secondsSpan = document.querySelector('#secondsSpan');
const minutesSpan = document.querySelector('#minutesSpan');
const hoursSpan = document.querySelector('#hoursSpan');
//every button
const buttons = document.querySelectorAll('[id^=button]');

let timeGoal;
//global flag to indicate if an interval is running
let intervalRunning = false;

// helper function to add a zero to single digits

function addZero(num) {
  
    return num.toString().length > 1 ? num : `0${num.toString()}`;
}


function reset() {
    timeGoal = 0;
    intervalRunning = false;
}

function timeOptions(num) {
    let minutes = 0;
    let hours = num;
    let hoursFast = hours * 60 * 60 * 1000;
    let minutesFast = minutes * 1000 * 60;
    let now = new Date().getTime();
    let timeGoalToReturn = now + hoursFast + minutesFast;
    console.log(timeGoalToReturn);
    if (!intervalRunning) { clearInt = timerInterval(); };
    return timeGoalToReturn;
}

function timerInterval() {
    let timeInt = setInterval(countDown, 1000);
    intervalRunning = true;
    return function () {
        clearInterval(timeInt);
        intervalRunning = false;
    }
}

// start the interval for the first time, and set clearInt equal to the anonymous function returned by timerInterval (our clearinterval)
var clearInt = timerInterval();

//iterate over each button and attach a click event to them - this could be simplified even more!

buttons.forEach(
    (button) => button.addEventListener('click', event => {
        
        if(intervalRunning) {
            console.log(`forEach clicked`)

            if (event.target.innerText === '24 Hs.') {
    
                timeGoal = timeOptions(24);
    
            }
            else if (event.target.innerText === '20 Hs.') {

                console.log(`20 hr button hit`)
    
                timeGoal = timeOptions(20);
    
            }
            //remove when you're done testing
            else if (event.target.innerText === 'Test') {

                console.log(`this button hit`)
    
                timeGoal = timeOptions(.002);
    
            }
            else {
                timeGoal = timeOptions(18);
            }
        }
        // a button was clicked to fast again, if an interval isn't already going run it. start the interval and store the function in clearInt again.. this could be made better, but you get the idea
        if (!intervalRunning) {
            clearInt = timerInterval;
        }
    })
);

// this countdown function is called by the timer function

function countDown() {

    let timeNow = new Date().getTime();

    console.log(`timeGoal is: ${timeGoal}`)

    console.log(`timeNow is: ${timeNow}`);

    console.log(`timeGoal > timeNow is: ${timeGoal > timeNow}`);

    if (timeGoal >= timeNow) {
        let timeLeft = timeGoal - timeNow;
        // remove congrats message

        let hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
        //retain the leading zero when appropriate. You can make some logic to only do this for single digit values.
        hoursSpan.innerText = addZero(hoursLeft);
        minutesSpan.innerText = addZero(minutesLeft);
        secondsSpan.innerText = addZero(secondsLeft);

    } else if (!timeGoal) {
        //the interval is running but no time goal has been set, keep checking for a time goal.
        return;
    } else {
        //stop the timer and reset the global values where necessary
        clearInt();
        reset();
    }
}