const words = [
    "apple", "banana", "cherry", "grape", "kiwi", "lemon", "mango", "orange", "peach", "plum",
    "berry", "melon", "olive", "papaya", "quince", "fig", "date", "hazel", "guava", "lime",
    "apricot", "tomato", "walnut", "yuzu", "lychee", "pear", "citrus", "onion", "radish", "turnip",
    "beet", "carrot", "celery", "garlic", "ginger", "pepper", "squash", "zucchini", "spinach", "chard",
    "kale", "okra", "basil", "thyme", "mint", "dill", "sage", "clove", "spice", "herb"
];
let currentWord = "";
let score = 0;
let timeLeft = 60;
let timer;

document.addEventListener("DOMContentLoaded", () => {
    const wordDisplay = document.getElementById("wordDisplay");
    const wordInput = document.getElementById("wordInput");
    const timeLeftDisplay = document.getElementById("timeLeft");
    const scoreDisplay = document.getElementById("score");
    const startGameButton = document.getElementById("startGame");

    const startGame = () => {
        score = 0;
        timeLeft = 60;
        wordInput.value = "";
        wordInput.disabled = false;
        startGameButton.disabled = true;
        nextWord();
        timer = setInterval(() => {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    };

    const nextWord = () => {
        currentWord = words[Math.floor(Math.random() * words.length)];
        wordDisplay.textContent = currentWord;
    };

    const checkInput = () => {
        if (wordInput.value === currentWord) {
            score++;
            scoreDisplay.textContent = score;
            wordInput.value = "";
            nextWord();
        }
    };

    const endGame = () => {
        wordInput.disabled = true;
        startGameButton.disabled = false;
        showMessages(`Game Over! Your score is ${score}`);
    };

    wordInput.addEventListener("input", checkInput);
    startGameButton.addEventListener("click", startGame);
});

  const showMessages = (result) => {
        Messages.textContent = result;
        Messages.style.backgroundColor = "#46c746";
        Messages.classList.remove('hidden');
        setTimeout(() => {
            Messages.classList.add('hidden');
//            resetGame();
        }, 3000);
    };