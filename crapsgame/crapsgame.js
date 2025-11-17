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
//In-game Variables
let currentMoney = startingMoney
let currentRounds = startingRounds
let currentBet = bets.even
let currentBetAmount = minimumBet


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
    currentMoney = startingMoney
    currentRounds = startingRounds
    setMoney(currentMoney)
    setRounds(currentRounds)
    betEven()
    setBetAmount(minimumBet)
}

function setMoney (money) {
    document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRounds (round) {
    document.getElementById(crapsStatsRounds).innerHTML = round

}

function betEven () {
    chooseBet(bets.even)
}

function betOdd () {
    chooseBet(bets.odd)
}

function chooseBet (bet) {
    currentBet = bet
    document.getElementById(bet).style.backgroundColor = "blue"
    const deselectBet = bet === bets.even ? bets.odd : bets.even
    document.getElementById(deselectBet).style.backgroundColor = "Transparent"
}

function increaseBet () {
    setBetAmount(currentBetAmount + minimumBet, currentMoney)
}

function decreaseBet () {
   setBetAmount(currentBetAmount - minimumBet, minimumBet)
} 



function setBetAmount (betAmount) {
    currentBetAmount = betAmount   
    document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
}

