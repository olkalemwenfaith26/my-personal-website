//Craps Maain Data
let crapsUsername = ""

//Craps Game Settings
const startingMoney = 1000
const startingRounds = 0
const bets = {
    even: "EVEN",
    odd: "ODD",
}

const minimumBet = 100

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername= "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"
const crapsRollDiceButton = "craps-roll-dice-button"
const crapsRollDiceAnimationContainer= "craps-roll-dice-animation-container"

//In-game Variables
let currentMoney = startingMoney
let currentRounds = startingRounds
let currentBet = bets.even
let currentBetAmount = minimumBet
let canChangeBet = true



function registerCrapsPlayer() {
  crapsUsername = document.getElementById(crapsUsernameInput).value

    // Username validation check
    let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g 
    if (crapsUsername.length < 5 || firstCharIsDigitRegex.test(crapsUsername)) {
        alert("Username must be 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a number ")
    }else{
        removeRegistrationPane()
        showMainGameSEction()
        setupFirstRound()
    }
}

function removeRegistrationPane () {
    document.getElementById(crapsRegistrationPane).style.display = "none"
}

function showMainGameSEction () {
    document.getElementById(crapsMainSection).style.display = "block"
}

function setupFirstRound () {
    document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
    setMoney(startingMoney)
    setRounds(startingRounds)
    betEven()
    setBetAmount(minimumBet)
}

function setMoney (money) {
    currentMoney = money
    document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRounds (round) {
    currentRounds = round
    document.getElementById(crapsStatsRounds).innerHTML = round

}

function betEven () {
    chooseBet(bets.even)
}

function betOdd () {
    chooseBet(bets.odd)
}

function chooseBet (bet) {
    if (canChangeBet) { 
        currentBet = bet
        document.getElementById(bet).style.backgroundColor = "blue"
        const deselectBet = bet === bets.even ? bets.odd : bets.even
        document.getElementById(deselectBet).style.backgroundColor = "Transparent"
    }
   
}

function increaseBet () {
    setBetAmount(currentBetAmount + minimumBet, currentMoney)
}

function decreaseBet () {
   setBetAmount(currentBetAmount - minimumBet, minimumBet)
} 



function setBetAmount (betAmount) {
    if (canChangeBet) {
        currentBetAmount = betAmount   
        document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
    }
}
    

function rollDice () {
    canChangeBet = false
    formatDiceScale ()
    document.getElementById(crapsRollDiceButton).style.display = "none"
    const diceRollElement= document.getElementById(crapsRollDiceAnimationContainer)
    rollADie({ element: diceRollElement, numberOfDice: 2, callback: processedDiceResult, delay: 10000000 });
}

window.addEventListener("resize", formatDiceScale);
console.log("Resized")
function formatDiceScale () {
    const vw =window.innerWidth * 0.8
    const vh =window.innerHeight * 0.8
    const widthScale = Math.min (700, vw, vh)
    const heightScale = widthScale * 0.714
    const scale = heightScale / 494.6592
   document.getElementById(crapsRollDiceAnimationContainer).style.transform = "scale("+ scale +")"
}

function processedDiceResult (diceResult) {
    const sum = diceResult.reduce((partialSum, a) => partialSum + a, 0);
    let diceSumResult = bets.even
    if (sum % 2 === 1) {
      diceSumResult = bets.odd
    } 
    setRounds(currentRounds + 1)
    if (diceSumResult === currentBet) {
        //alert("YOU WIN")
        setMoney(currentMoney + currentBetAmount)
    } else {
     //alert("YOU LOSE")
     setMoney(currentMoney - currentBetAmount)   
    }
}
