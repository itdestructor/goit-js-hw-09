const myBody = document.querySelector('body')
const startBtn = document.querySelectorAll('button')[0]
const stopBtn = document.querySelectorAll('button')[1]

let myInterval = null

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }



let changeBodyColor = () => {
startBtn.setAttribute('disabled','disabled')
    myInterval = setInterval(() => {
    myBody.style.backgroundColor = getRandomHexColor()
},1000)}



let stopIntervalFunc = () => {
    startBtn.removeAttribute('disabled','disabled')
    clearInterval(myInterval)
}


startBtn.addEventListener('click',changeBodyColor)
stopBtn.addEventListener('click',stopIntervalFunc)

