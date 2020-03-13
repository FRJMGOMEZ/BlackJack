//////  STATIC DATA /////


(() => {

    'use strict'

    let deck = [];

    const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const specialLetters = ['A', 'J', 'K', 'Q'];
    const letters = ['C', 'D', 'H', 'S'];

    const buttons = document.getElementsByTagName('button')

    const nuevoJuegoBtn = buttons[0];
    const pedirCartaBtn = buttons[1];
    const detenerBtn = buttons[2];

    const player1 = { name: 'Player1', sum: 0, won: 0 };
    const computer = { name: 'Computer', sum: 0, won: 0 };

    const playerGames = document.getElementById('player-games');
    playerGames.innerText = ` -- ${player1.won}`;
    const computerGames = document.getElementById('computer-games');
    computerGames.innerText = ` -- ${computer.won}`;

    let playerSum = document.getElementById('player-sum');
    let computerSum = document.getElementById('computer-sum');
    playerSum.innerText = player1.sum;
    computerSum.innerText = computer.sum;

    let currentPlayer;

    nuevoJuegoBtn.addEventListener('click', () => {
        newGame();
    })

    pedirCartaBtn.addEventListener('click', async () => {
        askForCard();
    })

    detenerBtn.addEventListener('click', () => {
        computerPlay();
        blockUnblockButtons(true);
    })


    const newGame = () => {
        restoreRender();
        currentPlayer = player1;
        player1.sum = 0;
        computer.sum = 0;
        renderSum();
        createDeck();
        blockUnblockButtons(false);
    }

    ///// CREATING DECK ///////
    const createDeck = () => {
        deck = [];
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

    //// ASK FOR CARD ////
    const askForCard = () => {
        const card = getRandomCard();
        if (card) {
            renderCard(card);
            sumCard(card);
            renderSum();
            check21();
        }
        return;
    }

    /// GET RANDOM CARD ///
    const getRandomCard = () => {
        let randomCard = deck[Math.floor(Math.random() * (deck.length))];
        deck = deck.filter((card) => card != randomCard);
        if (deck.length > 0) {
            return randomCard;
        } else {
            alert('La baraja se quedó sin cartas, debes iniciar un nuevo juego.')
            return;
        }
    }

    /// RENDER ////
    const renderCard = (card) => {
        let divPlayer1 = document.getElementById('jugador-cartas');
        let divComputer = document.getElementById('computer');

        let img = document.createElement('img');
        img.src = `assets/cartas/${card}.png`;
        img.classList.add('card');

        if (currentPlayer.name === 'Player1') {
            divPlayer1.appendChild(img);
            return;
        } else {
            divComputer.appendChild(img);
            return;
        }
    }

    //// SUM OF CARD VALUE ///

    const sumCard = (card) => {
        let value = card.substring(0, card.length - 1)
        value = (isNaN(value)) ? (value === 'A') ? 11 : 10 : Number(value);
        currentPlayer.sum = currentPlayer.sum + value;
        return
    }

    ///// RENDER SUM OF CARDS ////
    const renderSum = () => {
            playerSum.innerText = player1.sum;
            computerSum.innerText = computer.sum;
        return;
    }

    /// CHECK SUM ///
    const check21 = () => {
        if (currentPlayer.sum > 21) {
            let otherPlayer = player1.name === currentPlayer.name ? computer : player1;
            setTimeout(() => {
                otherPlayer.won++
                wonAlert(otherPlayer);
                newGame();
            }, 500)
            return;
        } else if (currentPlayer.sum === 21) {
            setTimeout(() => {
                currentPlayer.won++
                wonAlert(currentPlayer);
                newGame();
            }, 500)
            return
        } else {
            return
        }
    }

    //// WON ALERT ///
    const wonAlert = (player) => {
        let otherPlayer = player1.name === player.name ? computer : player1;
        alert(`${otherPlayer.name} PIERDE, ${player.name} GANA`);
        playerGames.innerText = ` -- ${player1.won}`;
        computerGames.innerText = ` -- ${computer.won}`;
        return;
    }


    //// NEW GAME ///
    const restoreRender = () => {

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
        return;
    }

    ////// COMPUTER GAME ///
    const computerPlay = () => {
        currentPlayer = computer;
        let interval = setInterval(() => {
            if (computer.sum < 21) {
                if (computer.sum > player1.sum) {
                    wonAlert(computer)
                    clearInterval(interval);
                    newGame();
                    return

                } else if (computer.sum === player1.sum) {
                    alert('EMPATE')
                    clearInterval(interval);
                    newGame();
                    return;
                } else {
                    askForCard();
                    return;
                }
            } else {
                clearInterval(interval);
                return
            }
        }, 500)
    }

    const blockUnblockButtons = (block) => {
        if (block) {
            nuevoJuegoBtn.setAttribute('disabled', true)
            pedirCartaBtn.setAttribute('disabled', true)
            nuevoJuegoBtn.setAttribute('style', 'opacity:0.3')
            pedirCartaBtn.setAttribute('style', 'opacity:0.3')
        } else {
            nuevoJuegoBtn.removeAttribute('disabled')
            pedirCartaBtn.removeAttribute('disabled')
            nuevoJuegoBtn.setAttribute('style', 'opacity:1')
            pedirCartaBtn.setAttribute('style', 'opacity:1')
        }

    }
    //////////////////////////////////////////7

    newGame();

})()









