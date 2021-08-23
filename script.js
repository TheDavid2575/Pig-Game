'use strict';

// VARIABLES ------
const rollDiceBtn = document.querySelector('.btn--roll'); // roll dice button variable
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const diceImage = document.querySelector('.dice');
let playerOne = document.querySelector('.player--0');
let playerTwo = document.querySelector('.player--1');
let playerOneTotalScore = document.querySelector('#score--0');
let playerTwoTotalScore = document.querySelector('#score--1');
let playerOneCurrentScore = document.querySelector('#current--0');
let playerTwoCurrentScore = document.querySelector('#current--1');
let turn = 0;
let dice = 0;

// FUNCTIONS -------

// Roll Dice Function
const rollDiceF = function () {
  if (
    Number(playerOneTotalScore.textContent) >= 100 ||
    Number(playerTwoTotalScore.textContent) >= 100
  ) {
    console.log('There is already a winner');
  } else {
    dice = Math.floor(1 + Math.random() * 6);
    diceImage.src = `dice-${dice}.png`;
    determineCurrentScore(dice, turn);
  }
};

// Checks if diceroll is greater than 1 or not
const determineCurrentScore = function (diceroll, turn) {
  if (diceImage.classList.contains('hidden'))
    diceImage.classList.remove('hidden');
  if (diceroll === 1) {
    playerOneCurrentScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;
    passturn(turn);
  } else if (turn === 0) {
    //Player 1
    playerOneCurrentScore.textContent =
      Number(playerOneCurrentScore.textContent) + diceroll;
  } else if (turn === 1) {
    //Player 2
    playerTwoCurrentScore.textContent =
      Number(playerTwoCurrentScore.textContent) + diceroll;
  }
};

// Adds points if player holds function
const holdF = function () {
  if (
    Number(playerOneTotalScore.textContent) >= 100 ||
    Number(playerTwoTotalScore.textContent) >= 100
  ) {
    console.log('There is already a winner');
  } else if (turn === 0) {
    playerOneTotalScore.textContent =
      Number(playerOneTotalScore.textContent) +
      Number(playerOneCurrentScore.textContent);
    passturn(turn);
  } else if (turn === 1) {
    playerTwoTotalScore.textContent =
      Number(playerTwoTotalScore.textContent) +
      Number(playerTwoCurrentScore.textContent);
    passturn(turn);
  }
  if (Number(playerOneTotalScore.textContent) >= 100) {
    playerOne.classList.add('player--winner');
    playerTwo.classList.remove('player--active');
  }

  if (Number(playerTwoTotalScore.textContent) >= 100) {
    playerTwo.classList.add('player--winner');
    playerOne.classList.remove('player--active');
  }
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
};

// Deternines Turn Function
const passturn = function (currentTurn) {
  if (currentTurn === 0) {
    turn = 1;
    if (!playerTwo.classList.contains('player--active')) {
      playerTwo.classList.add('player--active');
      playerOne.classList.remove('player--active');
    }
  } else if (currentTurn === 1) {
    turn = 0;
    playerOne.classList.contains('player--active');
    if (!playerOne.classList.contains('player--active')) {
      playerOne.classList.add('player--active');
      playerTwo.classList.remove('player--active');
    }
  }
};

// New Game Function
const newGame = function () {
  console.log('New Game Function reached');
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  playerOneTotalScore.textContent = 0;
  playerTwoTotalScore.textContent = 0;
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  diceImage.classList.add('hidden');
  turn = 0;
};

// EVENT LISTENERS -------

// Roll Dice Button
rollDiceBtn.addEventListener('click', rollDiceF);

// Hold Button
holdBtn.addEventListener('click', holdF);

// New Game Button
newGameBtn.addEventListener('click', newGame);
