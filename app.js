let gameBoard = document.getElementById("game");
let lowestScore = document.getElementById("lowestscore");
let guessCounter = document.getElementById("guesscount");
let pairCount = document.getElementById('value');
let startBtn = document.getElementById("start");
let restartBtn = document.getElementById("restart");
let lowScore = parseInt(localStorage.getItem("lowScore")) || 0;
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClick = false;
let guesses = 0;
let colors = [];



if (startBtn) {
    startBtn.addEventListener('click', function() {
        console.log(pairCount.value);
        localStorage.setItem('pairCount', pairCount.value);
        window.location.href = 'index.html';
    });

} else {

    restartBtn.addEventListener('click', function() {
        let lowScore = parseInt(localStorage.getItem("lowScore"));
        window.location.reload(true);
    });

    let colorCount = parseInt(localStorage.getItem('pairCount'));

    function randomColor() {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        let rgb = `rgb(${r},${g},${b})`

        colors.push(rgb);
        colors.push(rgb);
    }

    for (let i = 0; i < colorCount; i++) {
        randomColor();
    }

    function shuffle(array) {
        let count = array.length;
        
        while (count > 0) {
            let index = Math.floor(Math.random() * count);
            count--;

            let swap = array[count]
            array[count] = array[index]
            array[index] = swap
        }
        return array;
    }

    let shuffled = shuffle(colors);

    function colorDivs(colorArr) {
        for (let color of colorArr) {
            let newDiv = document.createElement("div");
            newDiv.classList.add(color);
            newDiv.addEventListener("click", pickCard);
            gameBoard.append(newDiv);
        }
    }

    function pickCard(event) {
        if (noClick) return;
        if (card1 && card2 !== null) return;
        let cardPicked = event.target;
        if (cardPicked.classList.contains("flipped")) return;
        cardPicked.style.backgroundColor = cardPicked.classList[0];

        if (!card1 || !card2) {
            cardPicked.classList.add("flipped");
            card1 = card1 || cardPicked
            card2 = cardPicked === card1 ? null : cardPicked;
        }

        if (card1 && card2) {
            noClicking = true;
            let class1 = card1.className;
            let class2 = card2.className;
            if (class1 === class2) {
                cardsFlipped += 2;
                card1.removeEventListener("click", pickCard);
                card1 = null;
                card2.removeEventListener("click", pickCard);
                card2 = null;
                noClick = false;
            } else {
                setTimeout( function() {
                    card1.style.backgroundColor = "";
                    card2.style.backgroundColor = "";
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                    card1 = null;
                    card2 = null;
                    noClicking = false;
                }, 500);
            }
        }
        guesses += 1;
        guessCounter.innerHTML = "You've guessed: " + guesses;

        if (cardsFlipped === colors.length) alert('You Won!');

        if (cardsFlipped === colors.length && lowScore === 0) {
            let lowScore = guesses;
            lowestScore.innerHTML = "Lowest Score: " + lowScore;
            localStorage.setItem("lowScore", lowScore)
        }

        if (cardsFlipped === colors.length && guesses < lowScore) {
            let lowScore = guesses;
            lowestScore.innerHTML = "Lowest Score: " + lowScore;
            localStorage.setItem("lowScore", lowScore)
        }

    }

    guessCounter.innerHTML = "You've guessed: " + guesses;
    lowestScore.innerHTML = "Lowest Score: " + lowScore;
    
    colorDivs(shuffled);
}
