(function(){

const secondsSpan = document.querySelector('#secondsSpan')
const minutesSpan = document.querySelector('#minutesSpan')
const hoursSpan = document.querySelector('#hoursSpan')

let timeGoal;
let timeInt;


function timeOptions(num) {


let minutes = 0;
let hours = num;
let hoursFast = hours * 60 * 60 * 1000
let minutesFast = minutes * 1000 * 60
let now = new Date().getTime();
timeGoal = now +  hoursFast + minutesFast;
console.log(timeGoal)

timeInt = setInterval(countDown, 1000)

return timeGoal;

}

function timeChoice(event) {

    if (event.target.innerText === '24 Hs.') {

        timeOptions(24)
    
        }
        else if (event.target.innerText === '20 Hs.') {
    
        timeOptions(20)
    
        }
        else {
    
        timeOptions(18)
        }
}

// this function will be fired after the click and return the timeGoal depending on the button clicked

function timeChoice() {

document.body.addEventListener('click', event => {


    if (event.target.innerText === '24 Hs.') {

    timeOptions(24)

    }
    else if (event.target.innerText === '20 Hs.') {

    timeOptions(20)

    }
    else {

    timeOptions(18)
    }

})

}

// interval that triggers the countDown function every second

function clearTimer() {
 
    clearInterval(timeInt)

    console.log(`timer cleared`)
}

// this countdown function is called by the timer function

function countDown () {

    timeChoice();

    let timeNow = new Date().getTime();

    console.log(timeGoal)
    console.log(timeNow)
    console.log(timeGoal > timeNow)

    if (timeGoal >= timeNow) {

      
    let timeLeft = timeGoal - timeNow
    // remove congrats message

    let hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    hoursSpan.innerText = `${hoursLeft}:`
    minutesSpan.innerText = `${minutesLeft}:`
    secondsSpan.innerText = secondsLeft


    }
    else {

        clearTimer()

    }
}

timeChoice();

})()