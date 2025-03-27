

import * as languageData from './assets/Scripts/languageData.js';

let basePallete = ["#231942", "#5e548e", "#9f86c0", "#be95c4", "#e0b1cb"]

let scene = 'intro';
let language = 'eng';
let coins = 0
let score = 0
let round = 0;

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('dragstart', (event) => {
    event.preventDefault();
});
function showElements(elements, mode) {
    elements.forEach(element => {
        if (mode === "show") {
            element.style.opacity = "1"
        } else {
            element.style.opacity = "0"
        }
    })
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}


//███████████//
//   INTRO   //
//███████████//


const startGameContainer = document.querySelector('.startGame')
const monitorContainer = document.querySelector('.monitor')
const tableContainer = document.querySelector('.table')
const hpBar = document.querySelector('.hp-bar-container')
const hpValue = document.querySelector('.hp-text')
const coinsContainer = document.querySelector('.coins')
const shieldContainer = document.querySelector('.shield')
const booksContainer = document.querySelector('.books')
const scoreContainer = document.querySelector('.score')


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        showElements([startGameContainer], "show")
    }, 100);
});


document.addEventListener("click", function (event) {
    if (scene !== "intro") return
    let clickedItem = event.target.closest(".startGame");
    if (!clickedItem) return;
    scene = "game"
    showElements([startGameContainer], "hide")
    setTimeout(() => {
        initializeElements()
    }, 200);
});


function initializeElements() {
    let elements = [
        hpBar, hpValue, coinsContainer, scoreContainer, booksContainer,
        monitorContainer, tableContainer, shieldContainer];
    showElements(elements, "show");
    updateHP(HP, "player");
    updateShield(shield)
    document.querySelector('.booksNumber').textContent = books
    updateCoins(coins);
    updateScore(score);
    setTimeout(() => {
        playbgm()
        generateRandomCards()
    }, 200);
}
// Math.floor(Math.random() * 9999999

function playbgm() {
    let bgm = new Audio('./assets/Audio/BGM/bgm001.mp3');
    bgm.loop = true; // Enable looping
    bgm.volume = 0.5; // Adjust volume if needed (0.0 to 1.0)
    bgm.play();
}


function updateShield(value, mode = null, duration = 500) {
    let startTime = performance.now();
    let startShield = shield;
    let targetShield
    if (mode === "set") {
        targetShield = Math.max(0, value);
    } else {
        targetShield = Math.max(0, shield + value);
    }
    function updateAnimation(currentTime) {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        let animatedShield = Math.round(startShield + (targetShield - startShield) * progress);
        document.querySelector('.shield').textContent = animatedShield;
        if (progress < 1) {
            requestAnimationFrame(updateAnimation);
        } else {
            shield = targetShield;
        }
    }
    requestAnimationFrame(updateAnimation);
}

function updateCoins(value, mode = null, duration = 500) {
    let startTime = performance.now();
    let startCoins = coins;
    let targetCoins
    if (mode === "set") {
        targetCoins = Math.max(0, value);
    } else {
        targetCoins = Math.max(0, coins + value);
    }
    function updateAnimation(currentTime) {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        let animatedCoins = Math.round(startCoins + (targetCoins - startCoins) * progress);
        document.querySelector('.coins').textContent = animatedCoins;
        if (progress < 1) {
            requestAnimationFrame(updateAnimation);
        } else {
            coins = targetCoins;
        }
    }
    requestAnimationFrame(updateAnimation);
}

function updateScore(value, mode = null, duration = 500) {
    let startTime = performance.now();
    let startScore = score;
    let targetScore
    if (mode === "set") {
        targetScore = Math.max(0, value);
    } else {
        targetScore = Math.max(0, score + value);
    }
    function updateAnimation(currentTime) {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        let animatedScore = Math.round(startScore + (targetScore - startScore) * progress);
        document.querySelector('.score').textContent = animatedScore;
        if (progress < 1) {
            requestAnimationFrame(updateAnimation);
        } else {
            score = targetScore;
        }
    }
    requestAnimationFrame(updateAnimation);
}

function updateBooks(value, mode = null, duration = 500) {
    let startTime = performance.now();
    let startBooks = books;
    let targetBooks
    if (mode === "set") {
        targetBooks = Math.max(0, value);
    } else {
        targetBooks = Math.max(0, books + value);
    }
    function updateAnimation(currentTime) {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        let animatedBooks = Math.round(startBooks + (targetBooks - startBooks) * progress);
        document.querySelector('.booksNumber').textContent = animatedBooks;
        if (progress < 1) {
            requestAnimationFrame(updateAnimation);
        } else {
            books = targetBooks;
        }
    }
    requestAnimationFrame(updateAnimation);
}


let shield = 0
let books = 4
let maxHP = 100;
let HP = 100;
let enemyMaxHP;
let enemyHP;

function updateHP(amount, target) {
    let hp, mhp, element, currentHP, setHP;
    if (target === "player") {
        mhp = maxHP;
        currentHP = HP;
        HP = Math.max(0, Math.min(HP + amount, mhp)); // Target HP after change
        setHP = (value) => HP = value;
        element = ['.hp-bar', '.hp-text'];
    } else {
        mhp = enemyMaxHP;
        currentHP = enemyHP;
        enemyHP = Math.max(0, Math.min(enemyHP + amount, mhp)); // Target HP after change
        setHP = (value) => enemyHP = value;
        element = ['.enemy-hp-bar', '.enemy-hp-text'];
    }
    let targetHP = target === "player" ? HP : enemyHP;
    let step = Math.max(1, Math.floor(Math.abs(targetHP - currentHP) / 10)); // Integer step
    function animate() {
        //  if (currentHP !== targetHP) {
        if (currentHP < targetHP) {
            currentHP = Math.min(currentHP + step, targetHP);
        } else {
            currentHP = Math.max(currentHP - step, targetHP);
        }
        setHP(currentHP);
        let hpPercentage = Math.floor((currentHP / mhp) * 100);
        document.querySelector(element[0]).style.width = hpPercentage + '%';
        document.querySelector(element[1]).textContent = `${currentHP} / ${Math.floor(mhp)}`;
        requestAnimationFrame(animate);
        // }
    }
    animate(); // Start animation
}


function raiseHp(percentage) {
    let targetMaxHP = maxHP * (1 + percentage / 100); // Calculate the target maxHP
    let currentMaxHP = maxHP;
    let currentHP = HP;
    let step = Math.max(1, Math.floor(Math.abs(targetMaxHP - currentMaxHP) / 20)); // Step size for maxHP increment
    function animate() {
        if (Math.abs(currentMaxHP - targetMaxHP) > 0.5) { // Stop when close enough
            if (currentMaxHP < targetMaxHP) {
                currentMaxHP = Math.min(currentMaxHP + step, targetMaxHP);
            } else {
                currentMaxHP = Math.max(currentMaxHP - step, targetMaxHP);
            }
            // Scale HP proportionally to maintain its percentage
            currentHP = Math.floor((currentHP / maxHP) * currentMaxHP);
            maxHP = currentMaxHP;
            let hpPercentage = Math.floor((currentHP / maxHP) * 100);
            document.querySelector('.hp-bar').style.width = hpPercentage + '%';
            document.querySelector('.hp-text').textContent = `${currentHP} / ${Math.floor(maxHP)}`;
            requestAnimationFrame(animate);
        } else {
            // Ensure the final value is set exactly
            currentMaxHP = targetMaxHP;
            currentHP = Math.floor((currentHP / maxHP) * currentMaxHP);
            maxHP = currentMaxHP;
            let hpPercentage = Math.floor((currentHP / maxHP) * 100);
            document.querySelector('.hp-bar').style.width = hpPercentage + '%';
            document.querySelector('.hp-text').textContent = `${currentHP} / ${Math.floor(maxHP)}`;
        }
    }

    animate(); // Start animation
}







document.addEventListener('keydown', function (event) {
    if (event.key === "8") {
        generateRandomCards()
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === "9") {
        updateScore(Math.floor(Math.random() * 999999999), "set")
        updateCoins(Math.floor(Math.random() * 100), "set")
    }
});



const cardsContainer = document.getElementById("card-container");
function generateRandomCards() {
    let eventList = languageData.randomEvents(round, HP)
    cardsContainer.innerHTML = "";
    cardsContainer.style.opacity = "1";
    cardsContainer.style.transition = "transform 0.2s ease, opacity 0.2s";
    let shuffleEvents = shuffleArray([...eventList])
    for (let index = 0; index < shuffleEvents.length; index++) {
        let cardData = shuffleEvents[index]
        let card = document.createElement("div");
        let cardName
        if (cardData.type === "enemy") {
            cardName = `${cardData.name}<br>LV${Math.floor(Math.random() * 5) + 1}`
        } else {
            cardName = cardData.name
        }
        card.style.backgroundColor = cardData.cardColor
        card.classList.add("card");
        card.innerHTML = cardName
        card.dataset.cardData = JSON.stringify(cardData)
        cardsContainer.appendChild(card);
        setTimeout(() => {
            card.style.opacity = "1";
        }, 200);
    }
    const sound = new Audio('./assets/Audio/SFX/System_Cards.ogg');
    sound.play();
}


const enemyHpContainer = document.querySelector('.enemy-hp-bar-container')
const enemyhpValue = document.querySelector('.enemy-hp-text')
const enemyNameContainer = document.querySelector('.enemy-name-text')


let cardWait = false
document.addEventListener("click", function (event) {
    if (cardWait) return
    let clickedItem = event.target.closest(".card");
    if (!clickedItem) return;
    let sound = new Audio('./assets/Audio/SFX/System_Ok.ogg');
    sound.play();
    cardWait = true
    let selectedCardData = JSON.parse(clickedItem.dataset.cardData)
    let type = selectedCardData.type
    if (type === "shield" || type === "coins" || type === "books" || type === "points" ||
        type === "mhp" || type === "hp") {
        if (type === "shield") updateShield(selectedCardData.value[1])
        if (type === "coins") updateCoins(selectedCardData.value[1])
        if (type === "books") updateBooks(selectedCardData.value[1])
        if (type === "points") updateScore(selectedCardData.value[1])
        if (type === "mhp") raiseHp(selectedCardData.value[1])
        if (type === "hp") updateHP(selectedCardData.value[1], "player")
        cardsContainer.style.transition = "transform 0.2s ease, opacity 0.2s";
        setTimeout(() => {
            cardsContainer.style.opacity = "0";
            setTimeout(() => {
                generateRandomCards()
                cardWait = false
            }, 500);
        }, 200);
        return
    } else if (type === "battle") {
        cardsContainer.style.transition = "transform 0.2s ease, opacity 0.2s";
        setTimeout(() => {
            cardsContainer.style.opacity = "0";
            setTimeout(() => {
                let elements = [enemyHpContainer, enemyhpValue, enemyNameContainer];
                showElements(elements, "show");
                enemyNameContainer.textContent = "Slime LV 1"
                enemyMaxHP = 15;
                enemyHP = 15;
                updateHP(enemyHP, "enemy")
                generateRandomWord()
                displaySyllables(originalWord, "#syllable-container")
            }, 500);
        }, 200);
        return
    }


    /*
    let elements = [enemyHpContainer, enemyhpValue, enemyNameContainer];
    showElements(elements, "show");
    enemyNameContainer.textContent = "Slime LV 1"
    enemyMaxHP = 15;
    enemyHP = 15;
    updateHP(0, "enemy")
    let hideElements = [cardsContainer]
    showElements(hideElements, "hide")
    generateRandomWord()
    displaySyllables(originalWord, "#syllable-container")
    battleActive = true
    */
});


let originalWord = []
let playerWord = []


function shuffleSyllables(originalArray) {
    let shuffled;
    do {
        shuffled = [...originalArray].sort(() => Math.random() - 0.5);
    } while (shuffled.join("") === originalArray.join(""));
    return shuffled;
}


function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}



function displaySyllables(word, containerSelector) {
    const wordContainer = document.querySelector("#word-container");
    const container = document.querySelector(containerSelector);
    wordContainer.innerHTML = "";
    container.innerHTML = "";
    let emptySlots = [];
    word.forEach(syllable => {
        const emptySlot = document.createElement("div");
        emptySlot.classList.add("wordBorder");
        emptySlot.textContent = syllable
        emptySlot.style.transform = `translateY(-200%)`;
        emptySlot.style.color = "transparent";
        emptySlot.style.textShadow = "none";
        wordContainer.appendChild(emptySlot);
        emptySlots.push(emptySlot);
    });
    let nextSlotIndex = 0;
    let busy = false;
    let sound
    const shuffledSyllables = word.length > 1 ? shuffleSyllables(word) : word;
    shuffledSyllables.forEach(syllable => {
        const syllableDiv = document.createElement("div");
        syllableDiv.classList.add("syllableBorder");
        syllableDiv.textContent = syllable;
        syllableDiv.addEventListener("click", () => {
            if (nextSlotIndex < emptySlots.length && !busy) {
                busy = true;
                sound = new Audio('./assets/Audio/SFX/System_Syllable_Selected.ogg');
                sound.play();
                const targetSlot = emptySlots[nextSlotIndex];
                const syllableRect = syllableDiv.getBoundingClientRect();
                const targetRect = targetSlot.getBoundingClientRect();
                const deltaX = targetRect.left - syllableRect.left;
                const deltaY = targetRect.top - syllableRect.top;
                syllableDiv.style.transition = "transform 0.2s ease, opacity 0.2s";
                syllableDiv.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                syllableDiv.style.opacity = "0";
                setTimeout(() => {
                    playerWord.push(syllableDiv.textContent);
                    targetSlot.textContent = syllableDiv.textContent;
                    targetSlot.style.color = "white";
                    targetSlot.style.backgroundColor = "#c4b995";
                    targetSlot.style.textShadow = "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black";
                    syllableDiv.remove();
                    nextSlotIndex++;
                    if (nextSlotIndex === emptySlots.length) {
                        setTimeout(() => {
                            if (arraysAreEqual(playerWord, originalWord)) {
                                emptySlots.forEach(slot => {
                                    slot.style.backgroundColor = "#90EE90";
                                });
                                sound = new Audio('./assets/Audio/SFX/System_Word_Correct.ogg');
                                sound.volume = 0.7
                                sound.play();
                                updateHP(-books, "enemy")
                                updateScore(originalWord.length)
                                setTimeout(() => {
                                    emptySlots.forEach(slot => {
                                        slot.style.transition = "transform 0.3s ease, opacity 0.3s";
                                        slot.style.opacity = "0";
                                    });
                                    if (enemyHP === 0) {
                                        let elements = [enemyHpContainer, enemyhpValue, enemyNameContainer];
                                        showElements(elements, "hide");
                                        setTimeout(() => {
                                            wordContainer.innerHTML = "";
                                            container.innerHTML = "";
                                            emptySlots = [];
                                            playerWord = [];
                                            generateRandomCards()
                                            cardWait = false
                                        }, 500);
                                    } else {
                                     generateRandomWord()
                                     playerWord = []
                                     displaySyllables(originalWord, "#syllable-container")
                                    }
                                }, 300);
                            } else {
                                emptySlots.forEach(slot => {
                                    slot.style.backgroundColor = "#F08080";
                                });
                                sound = new Audio('./assets/Audio/SFX/System_Word_Error.ogg');
                                sound.volume = 0.7
                                sound.play();
                                updateHP(-5, "player")
                                shakeHPBar()
                                setTimeout(() => {
                                    emptySlots.forEach(slot => {
                                        slot.style.transition = "transform 0.5s ease, opacity 0.5s";
                                        slot.style.opacity = "0";
                                    });
                                    generateRandomWord()
                                    playerWord = []
                                    displaySyllables(originalWord, "#syllable-container")
                                }, 300);
                            }
                        }, 300);
                    }
                    busy = false;
                }, 150);
            }
        });

        container.appendChild(syllableDiv);
    });
}

function generateRandomWord() {
    let word = languageData.randomWord(originalWord.join(""))
    originalWord = word.split("")
}

function shakeHPBar() {
    let hpBar = document.querySelector('.hp-bar-container');
    let hpText = document.querySelector('.hp-text');
    let i = 0;
    let interval = setInterval(() => {
        hpBar.style.transform = `translateX(${(i % 2 === 0 ? -15 : 15)}px)`;
        hpText.style.transform = `translateX(${(i % 2 === 0 ? -15 : 15)}px)`;
        i++;
        if (i > 5) {
            clearInterval(interval);
            hpBar.style.transform = "translateX(0)"; // Reset position
            hpText.style.transform = "translateX(0)"; // Reset position
        }
    }, 50);
}


