'use strict';

// selecting ele
// these var are DOM ele
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //  used for selecting ele by ids(faster than query selector)

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// init cond setting
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// state var
let currScore; //declaration
let activePlayer;
let scores; //total scores array of each players
let playing; //state variable holding state of the game whether a player is playing the game or not.(to execute the logic that when score of 100 is reached then the hold and roll button dont work)

// we need to call->1.first load the page
// 2. hitting the new btn
const init = function () {
  // visual
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // ui
  player0El.classList.add('player--active'); //if already added then js will not add another player--active class
  player1El.classList.remove('player--active'); //if there is no player--active class then js will not give any error

  // removing winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');

  //setting internal state var to init state
  currScore = 0; //assigning val
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
};

init();

const switchPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  // TOGGLE method HD->remove the class if its their in ele and add the class if its not their in the ele
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currScore = 0;
  // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  // document.querySelector(`.player--${!activePlayer}`).classList.add('player--active'); //BUG !activePlayer is returning true or false in the template literal so its is substituted by true or false
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating a random dice roll
    const num = Math.trunc(Math.random() * 6) + 1;
    // 2. dsplay the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${num}.png`;
    // 3. check for the rolled 1
    // currentEl = document.querySelector('.player--active .current-score');
    if (num !== 1) {
      // add num to current score
      currScore += num;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore; //dynamically selecting an ele
    } else {
      // >switch to next player
      switchPlayers();
    }
    // currentEl.textContent = currScore;
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add curr score to active player's score
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // score0El.textContent = scores[0];ALT
    // score1El.textContent = scores[1];

    // 2. check if active player's score >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //to avoid any overriding of bg prop
    } else {
      // switching
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', init); //directly passing func value in the add event listener func
