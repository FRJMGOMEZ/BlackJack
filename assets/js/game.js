//////  STATIC DATA /////

let deck = [];

let numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
let specialLetters = ['A', 'J', 'K', 'Q'];
let letters = ['C', 'D', 'H', 'S'];

const buttons = document.getElementsByTagName('button')

let nuevoJuego = buttons[0];
let pedirCarta = buttons[1];
let detener = buttons[2];

let player1 = { name: 'Player1', sum: 0, won: 0 };
let computer = { name: 'Computer', sum: 0, won: 0 };

let playerGames = document.getElementById('player-games');
playerGames.innerText =` -- ${player1.won}`;
let computerGames = document.getElementById('computer-games');
computerGames.innerText = ` -- ${computer.won}`;

let playerSum = document.getElementById('player-sum');
let computerSum = document.getElementById('computer-sum');
playerSum.innerText = player1.sum;
computerSum.innerText = computer.sum;

let currentPlayer = player1;

nuevoJuego.addEventListener('click', () => {
    restore();
    createDeck();
})

pedirCarta.addEventListener('click', async() => {
    getCard();
})

detener.addEventListener('click', () => {
    currentPlayer = computer;
    computerPlay();
})

/// RENDER ////
const renderCard = (card) => {
    let divPlayer1 = document.getElementById('jugador-cartas');
    let divComputer = document.getElementById('computer');

    let img = document.createElement('img');
    img.src = `assets/cartas/${card}.png`;
    img.classList.add('card');

    if (currentPlayer.name === 'Player1') {
        divPlayer1.appendChild(img);
    } else {
        divComputer.appendChild(img);
    }
}
const renderSum= ()=>{
    playerSum.innerText = player1.sum;
    computerSum.innerText = computer.sum;
}


///// CREATING DECK ///////
const createDeck = () => {
    deck=[];
    letters.forEach((letter) => {
        numbers.forEach((number) => {
            deck.push(`${number}${letter}`)
        })
        specialLetters.forEach((specialLetter) => {
            deck.push(`${specialLetter}${letter}`)
        })
    })
    deck = _.shuffle(deck);
}

/// GET CARD ///
const getCard = async () => {
    let randomCard = await deck[Math.floor(Math.random() * (deck.length))];
    deck = deck.filter((card)=>card != randomCard);
    if(deck.length > 0){
        renderCard(randomCard);
        sumCard(randomCard);
    }else{
        alert('La baraja se quedó sin cartas, debes iniciar un nuevo juego.')
    }
     
}


//// SUM OF CARD VALUE ///
const sumCard = (card) => {
    let value = card.substring(0, card.length - 1)
    value = (isNaN(value))?(value==='A')? 11:10:Number(value);
    currentPlayer.sum = currentPlayer.sum + value;
    renderSum();
    return check21();
}

/// CHECK SUM ///
const check21 = ()=>{
    if (currentPlayer.sum > 21) {
        let otherPlayer = player1.name === currentPlayer.name ? computer : player1;
        setTimeout(() => {
            playerWon(otherPlayer);
        }, 500)
        return;
    } else if (currentPlayer.sum === 21) {
        setTimeout(() => {
            playerWon(currentPlayer);
        }, 500)
        return
    } else {
        return
    }
}

////// COMPUTER GAME ///
const computerPlay = () => {
    let interval = setInterval(() => {
        if (computer.sum === 0) {
            getCard();
            return;
        } else if (computer.sum === 21) {
            clearInterval(interval);
            return;
        } else if(computer.sum < 21){
            if (computer.sum > player1.sum) {
                playerWon(computer)
                clearInterval(interval);
                return;
            } else if (computer.sum === player1.sum) {
                alert('EMPATE')
                restore();
                clearInterval(interval);
                return;
            } else {
                getCard();
                return;
            }
        }else{
            clearInterval(interval);
            return
        } 
    }, 500)
}

//// PLAYER WON ///
const playerWon = (player) => {
    let otherPlayer = player1.name === player.name ? computer : player1;
    player.won++;
    alert(`${otherPlayer.name} PIERDE, ${player.name} GANA`);
    playerGames.innerText = ` -- ${player1.won}`;
    computerGames.innerText = ` -- ${computer.won}`;

    restore();
}


//// NEW GAME ///
const restore = () => {

    player1.sum = 0;
    computer.sum = 0;
    currentPlayer = player1;
    
    let divPlayer1 = document.getElementById('jugador-cartas');
    let divComputer = document.getElementById('computer');
    let player1Imgs = divPlayer1.getElementsByTagName('img');
    let computerImgs = divComputer.getElementsByTagName('img');

    while (player1Imgs.length > 0) {
        player1Imgs[0].remove();
    }

    while (computerImgs.length > 0) {
        computerImgs[0].remove();
    }

    renderSum();
    createDeck();
}


//////////////////////////////////////////7

createDeck();








