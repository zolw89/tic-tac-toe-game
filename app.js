'use strict'

const player1 = 'fa-circle-o';
const player2 = 'fa-times';
let round = 0;

let AIplay = false;

const winningCombinations = [
    ['0','1','2'],
    ['3','4','5'],
    ['6','7','8'],
    ['0','3','6'],
    ['1','4','7'],
    ['2','5','8'],
    ['0','4','8'],
    ['2','4','6']
]

let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8']

let player1Score = [];
let player2Score = [];

const boxes = document.querySelectorAll('.box');

boxes.forEach(box => box.addEventListener('click', pick, { once: true }));
function pick(e) {

//player vs player

    if (AIplay === false) {
        let turn
    if(round % 2 === 0) {
        turn = player1;
        player1Score.push(e.target.getAttribute('data-cell'))
    } else {
        turn = player2
        player2Score.push(e.target.getAttribute('data-cell'))
    }
    e.target.classList.add(turn);
    round++
    } 
    
//player vs AI   

    else {
        let playerPick = e.target.getAttribute('data-cell')
    function diffPlayer(elem) {
        return elem !== playerPick
    }
    player1Score.push(playerPick)
    e.target.classList.add('fa-circle-o');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === e.target.getAttribute('data-cell')) {
            arr = arr.filter(diffPlayer)
        }
    }
    round++

    let AIpick = arr[Math.floor(Math.random()*arr.length)];
    function diffAI(elem) {
        return elem !== AIpick
    }
    player2Score.push(AIpick)
    for (let i = 0; i < boxes.length; i++) {
        if(boxes[i].getAttribute('data-cell') === AIpick) {
            boxes[i].classList.add('fa-times');
        }} 
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === AIpick) {
            arr = arr.filter(diffAI)
        }
    }
    round++
    }

    checkWinner()
}

//winner check

const overlay = document.querySelector('.winner');
let winner = document.querySelector('.winner-text');

const checkWinner = () => {
    winningCombinations.forEach(combination => {
        if (combination.every(el => player1Score.includes(el))) {
            winner.innerHTML = 'Player1 wins!'
            overlay.classList.add('overlay')
        }
        if (combination.every(el => player2Score.includes(el))) {
            winner.innerHTML = 'Player2 wins!'
            overlay.classList.add('overlay')
        }
        if (round >= 9) {
            winner.innerHTML = 'No one wins!'
            overlay.classList.add('overlay')
        }
    })

}

//restart button

const reset = () => {
    overlay.classList.remove('overlay');
    round = 0;
    winner.innerHTML = '';
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    player1Score = [];
    player2Score = [];
    boxes.forEach(box => box.classList.remove('fa-circle-o', 'fa-times'));
    boxes.forEach(box => box.removeEventListener('click', pick));
    boxes.forEach(box => box.addEventListener('click', pick, { once: true }));
}

const restart = document.querySelector('.restart');
restart.addEventListener('click', reset)

//pick opponent

const opponentBtn = document.querySelector('.opponentBtn')
const opponentDiv = document.querySelector('.opponent')

opponentBtn.addEventListener('click', () => {
    if(AIplay === false) {
        AIplay = true
        opponentDiv.textContent = "You are playing player vs AI"
    } else {
        AIplay = false
        opponentDiv.textContent = "You are playing player vs player"
    }
    reset()
})

