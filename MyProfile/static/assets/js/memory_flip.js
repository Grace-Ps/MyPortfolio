       const emojis = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍉', '🍊'];
        const cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
        const congratsDiv = document.getElementById("congrats");
        const Messages = document.getElementById("Messages");
        const grid = document.getElementById('gameGrid');
        let firstCard = null;
        let secondCard = null;
        let lock = false;

        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;

            card.addEventListener('click', () => {
                if (lock || card.classList.contains('flipped')) return;

                card.classList.add('flipped');
                card.innerText = symbol;

                if (!firstCard) {
                    firstCard = card;
                } else {
                    secondCard = card;
                    lock = true;

                    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
                        firstCard = secondCard = null;
                        lock = false;
                        checkWin();
                    } else {
                        setTimeout(() => {
                            firstCard.classList.remove('flipped');
                            secondCard.classList.remove('flipped');
                            firstCard.innerText = '';
                            secondCard.innerText = '';
                            firstCard = secondCard = null;
                            lock = false;
                        }, 700);
                    }
                }
            });

            grid.appendChild(card);
        });

        function checkWin() {
            const allFlipped = document.querySelectorAll('.card.flipped').length === cards.length;
            if (allFlipped) {
                setTimeout(() => {
                    showCongrats(1)
                    //location.reload();
                }, 300);
            }
        }


         const showCongrats = (result) => {
        if (result === 0) {
            congratsDiv.textContent = "Oops.. You Lost the game";
            congratsDiv.style.backgroundColor = "#df5f5f";
        } else if (result === 1) {
            congratsDiv.textContent = "Congratulations! You won!";
            congratsDiv.style.backgroundColor = "#46c746";
        } else if (result === 2) {
            congratsDiv.textContent = "It's a draw...!";
            congratsDiv.style.backgroundColor = "#cccc00";
        }
        congratsDiv.classList.remove('hidden');
        setTimeout(() => {
            congratsDiv.classList.add('hidden');
            resetGame();
        }, 3000);
    };

    const showMessages = (result) => {
        if (result === 0) {
            Messages.textContent = "Please Select the Difficulty Level";
            Messages.style.backgroundColor = "#df5f5f";
        }else  if (result === 1) {
            Messages.textContent = "Get Set Go....";
            Messages.style.backgroundColor = "#a8a2cd";
        }
        Messages.classList.remove('hidden');
        setTimeout(() => {
            Messages.classList.add('hidden');
//            resetGame();
        }, 3000);
    };


  const resetGame = () => {
    location.reload()
   }