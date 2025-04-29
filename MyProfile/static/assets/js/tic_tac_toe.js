let difficultySelect = ''; // Global difficulty selection

document.addEventListener("DOMContentLoaded", () => {
    const difficultyButtons = document.querySelectorAll(".difficulty-button");
    const startBtn = document.getElementById("startBtn");
    const resetButton = document.getElementById("resetBtn");
    const startMenu = document.getElementById("startMenu");
    const playBoard = document.getElementById("PlayBoard");
    const cells = document.querySelectorAll(".cell");
    const congratsDiv = document.getElementById("congrats");
    const Messages = document.getElementById("Messages");

    let currentPlayer = "X";
    let board = Array(9).fill("");
    let gameOver = false;

    difficultyButtons.forEach(button => {
        button.addEventListener("click", () => {
            difficultySelect = button.dataset.level;
            difficultyButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });

    startBtn.addEventListener("click", () => {
        if (!difficultySelect) {
            showMessages(0)
            return;
        }
        startMenu.classList.add("hidden");
        startBtn.classList.add("hidden");
        playBoard.classList.remove("hidden");
         showMessages(1)
    });

    resetButton.addEventListener("click", () => {
        resetGame();
        startMenu.classList.remove("hidden");
        startBtn.classList.remove("hidden");
        playBoard.classList.add("hidden");
    });

    const resetGame = () => {
        board.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.backgroundColor = "";
            cell.classList.remove("taken");
        });
        currentPlayer = "X";
        gameOver = false;
        congratsDiv.classList.add("hidden");
    };

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

    const checkWinner = (player) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setTimeout(() => {
                    showCongrats(player === "X" ? 1 : 0);
//                    resetGame();
                }, 100);
                gameOver = true;
                return true;
            }
        }

        if (!board.includes("")) {
            setTimeout(() => {
                showCongrats(2);
//                resetGame();
            }, 100);
            gameOver = true;
            return true;
        }

        return false;
    };

    const easyMove = () => {
        const emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(i => i !== null);
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    };

    const checkImmediateWin = (player) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            const values = [board[a], board[b], board[c]];
            return values.filter(v => v === player).length === 2 && values.includes("");
        });
    };

    const mediumMove = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";
                if (checkImmediateWin("O")) {
                    board[i] = "";
                    return i;
                }
                board[i] = "";
            }
        }

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";
                if (checkImmediateWin("X")) {
                    board[i] = "";
                    return i;
                }
                board[i] = "";
            }
        }

        return easyMove();
    };

    const hardMove = () => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, 0, false);
                board[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    };

    const minimax = (newBoard, depth, isMaximizing) => {
        if (checkTerminalState(newBoard, "O")) return 10 - depth;
        if (checkTerminalState(newBoard, "X")) return depth - 10;
        if (!newBoard.includes("")) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (newBoard[i] === "") {
                    newBoard[i] = "O";
                    let score = minimax(newBoard, depth + 1, false);
                    newBoard[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < newBoard.length; i++) {
                if (newBoard[i] === "") {
                    newBoard[i] = "X";
                    let score = minimax(newBoard, depth + 1, true);
                    newBoard[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const checkTerminalState = (brd, player) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => brd[index] === player)
        );
    };

    const computerMove = () => {
        if (gameOver) return;

        let move;
        switch (difficultySelect) {
            case "easy": move = easyMove(); break;
            case "medium": move = mediumMove(); break;
            case "hard": move = hardMove(); break;
            default:
                console.warn("Invalid difficulty, defaulting to easy");
                move = easyMove();
        }

        if (move !== undefined) {
            board[move] = "O";
            cells[move].textContent = "O";
            cells[move].style.backgroundColor = "#df5f5f";
            cells[move].classList.add("taken");
            if (!checkWinner("O")) {
                currentPlayer = "X";
            }
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!cell.textContent && !gameOver && currentPlayer === "X") {
                cell.textContent = "X";
                cell.style.backgroundColor = "#46c746";
                cell.classList.add("taken");
                board[index] = "X";
                if (!checkWinner("X")) {
                    currentPlayer = "O";
                    setTimeout(computerMove, 500);
                }
            }
        });
    });
});
