

import * as languageData from './assets/Scripts/languageData.js';

let basePallete = ["#231942", "#5e548e", "#9f86c0", "#be95c4", "#e0b1cb"]

let scene = 'intro';
let language = 'eng';
let coins = 0
let score = 0
let round = 0;
let shield = 0
let books = 4
let maxHP = 100;
let HP = 100;
let enemyMaxHP = 0;
let enemyHP = 0;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play sound using Web Audio API
function playSound(url) {
    fetch(url) // Fetch the audio file
        .then(response => response.arrayBuffer())
        .then(data => {
            // Decode the audio data
            audioContext.decodeAudioData(data, (buffer) => {
                const soundSource = audioContext.createBufferSource();
                soundSource.buffer = buffer;

                // Create a GainNode for volume control (optional)
                const gainNode = audioContext.createGain();
                soundSource.connect(gainNode);
                gainNode.connect(audioContext.destination); // Connect to speakers

                // Play the sound
                soundSource.start();

                // Optional: Set the volume (from 0 to 1)
                gainNode.gain.setValueAtTime(1, audioContext.currentTime);
            });
        })
        .catch(error => console.error('Error loading sound:', error));
}

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
const roundsContainer = document.querySelector('.rounds')
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
        monitorContainer, tableContainer, shieldContainer, roundsContainer];
    showElements(elements, "show");
    updateHP(HP, "player");
    updateShield(shield)
    document.querySelector('.booksNumber').textContent = books
    updateCoins(coins);
    updateScore(score);
    updateRounds(round);
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

// Generic animated update function
function animateValue(getValue, setValue, targetValue, duration = 300, updateElement) {
    let startValue = getValue();
    let startTime = performance.now();

    function updateAnimation(currentTime) {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1); // Faster transition
        let animatedValue = Math.round(startValue + (targetValue - startValue) * progress);
        
        setValue(animatedValue);
        updateElement(animatedValue);

        if (progress < 1) {
            requestAnimationFrame(updateAnimation);
        }
    }

    requestAnimationFrame(updateAnimation);
}


// General function to update stats with animation
function updateStat(statName, getValue, setValue, value, mode = null, duration = 500) {
    let targetValue = mode === "set" ? Math.max(0, value) : Math.max(0, getValue() + value);

    animateValue(
        getValue,
        setValue,
        targetValue,
        duration,
        (newValue) => document.querySelector(`.${statName}`).textContent = newValue
    );
}

// Wrapper functions for specific stats
function updateRounds(value, mode = null, duration = 500) {
    updateStat("rounds", () => round, (v) => round = v, value, mode, duration);
}

function updateShield(value, mode = null, duration = 500) {
    updateStat("shield", () => shield, (v) => shield = v, value, mode, duration);
}

function updateCoins(value, mode = null, duration = 500) {
    updateStat("coins", () => coins, (v) => coins = v, value, mode, duration);
}

function updateScore(value, mode = null, duration = 500) {
    updateStat("score", () => score, (v) => score = v, value, mode, duration);
}

function updateBooks(value, mode = null, duration = 500) {
    updateStat("booksNumber", () => books, (v) => books = v, value, mode, duration);
}


let enemyDefeated = false; 
function updateHP(amount, target, onEnemyDefeat = null) {
    let mhp, element, getHP, setHP;

    if (target === "player") {
        mhp = maxHP;
        getHP = () => HP;
        setHP = (value) => HP = value;
        element = ['.hp-bar', '.hp-text'];
    } else {
        mhp = enemyMaxHP;
        getHP = () => enemyHP;
        setHP = (value) => enemyHP = value;
        element = ['.enemy-hp-bar', '.enemy-hp-text'];
    }

    let targetHP = Math.max(0, Math.min(getHP() + amount, mhp));

    animateValue(
        getHP,
        setHP,
        targetHP,
        300, // Faster animation
        (newHP) => {
            let hpPercentage = Math.floor((newHP / mhp) * 100);
            document.querySelector(element[0]).style.width = `${hpPercentage}%`;
            document.querySelector(element[1]).textContent = `${newHP} / ${Math.floor(mhp)}`;

            // Only call onEnemyDefeat if the HP reaches 0 and the enemy has not been defeated yet
            if (newHP <= 0 && target === "enemy" && !enemyDefeated && typeof onEnemyDefeat === "function") {
                console.log("Enemy HP reached 0! Triggering defeat...");
                enemyDefeated = true; // Set flag to true, so it won't trigger again
                onEnemyDefeat();
            }
        }
    );
}



// HP increase function with animation
function raiseHp(percentage) {
    let targetMaxHP = maxHP * (1 + percentage / 100);
    
    animateValue(
        () => maxHP,
        (newMaxHP) => maxHP = newMaxHP,
        targetMaxHP,
        300,
        (newMaxHP) => {
            let newHP = Math.floor((HP / maxHP) * newMaxHP);
            HP = newHP;
            let hpPercentage = Math.floor((newHP / newMaxHP) * 100);
            document.querySelector('.hp-bar').style.width = `${hpPercentage}%`;
            document.querySelector('.hp-text').textContent = `${newHP} / ${Math.floor(newMaxHP)}`;
        }
    );
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
    cardWait = true
    let eventList = []
    eventList = languageData.randomEvents(round, [HP,maxHP]);
    cardsContainer.innerHTML = "";
    cardsContainer.style.opacity = "1";
    cardsContainer.style.transition = "transform 0.2s ease, opacity 0.2s";
    
    let shuffleEvents = shuffleArray([...eventList]);
    let lastCardIndex = shuffleEvents.length - 1; // Track the last card
    let animationTime = 100; // Animation time for each card

    for (let index = 0; index < shuffleEvents.length; index++) {
        let cardData = shuffleEvents[index];
        let card = document.createElement("div");
        let cardName;

        if (cardData.type === "enemy") {
            cardName = `${cardData.name}<br>LV${Math.floor(Math.random() * 5) + 1}`;
        } else {
            cardName = cardData.name;
        }
        card.style.backgroundColor = cardData.cardColor;
        card.classList.add("card");
        card.innerHTML = cardName;
        card.dataset.cardData = JSON.stringify(cardData);
        cardsContainer.appendChild(card);

        setTimeout(() => {
            playSound('./assets/Audio/SFX/System_Cards.ogg');
            card.style.opacity = "1";
            if (index === lastCardIndex) {
                setTimeout(() => {
                    cardWait = false;
                }, animationTime); 
            }
        }, index * animationTime);
    }
}



const enemyHpContainer = document.querySelector('.enemy-hp-bar-container')
const enemyhpValue = document.querySelector('.enemy-hp-text')
const enemyNameContainer = document.querySelector('.enemy-name-text')


let cardWait = true
document.addEventListener("click", function (event) {
    if (cardWait) return
    let clickedItem = event.target.closest(".card");
    if (!clickedItem) return;
    playSound('./assets/Audio/SFX/System_Ok.ogg');
    cardWait = true
    let selectedCardData = JSON.parse(clickedItem.dataset.cardData)
    let type = selectedCardData.type
    if (type === "shield" || type === "coins" || type === "books" || type === "points" ||
        type === "mhp" || type === "heal" || type === "damage") {
        if (type === "shield") updateShield(selectedCardData.value[1])
        if (type === "coins") updateCoins(selectedCardData.value[1])
        if (type === "books") updateBooks(selectedCardData.value[1])
        if (type === "points") updateScore(selectedCardData.value[1])
        if (type === "mhp") raiseHp(selectedCardData.value[1])
        if (type === "heal") updateHP(selectedCardData.value[1], "player")
        if (type === "damage") updateHP(selectedCardData.value[1], "player")
        cardsContainer.style.transition = "transform 0.2s ease, opacity 0.2s";
        setTimeout(() => {
            cardsContainer.style.opacity = "0";
            setTimeout(() => {
                generateRandomCards()
                updateRounds(1)
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
                enemyMaxHP = 15+(2*round);
                enemyHP = enemyMaxHP;
                updateHP(enemyHP, "enemy")
                generateRandomWord()
                displaySyllables(originalWord, "#syllable-container")
            }, 500);
        }, 200);
        return
    }
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


function onEnemyDefeat() {
    const wordContainer = document.querySelector("#word-container");
    const container = document.querySelector("#syllable-container");
    let elements = [enemyHpContainer, enemyhpValue, enemyNameContainer];
    showElements(elements, "hide");
    setTimeout(() => {
        wordContainer.innerHTML = "";
        container.innerHTML = "";
        syllableSlots = [];
        playerWord = [];
        generateRandomCards();
        updateRounds(1);
        enemyDefeated = false
    }, 500);
}

let syllableSlots = [];
function displaySyllables(word, containerSelector) {
    const wordContainer = document.querySelector("#word-container");
    const container = document.querySelector(containerSelector);
    syllableSlots = [];
    wordContainer.innerHTML = "";
    container.innerHTML = "";
    word.forEach(() => {
        const emptySlot = document.createElement("div");
        emptySlot.classList.add("wordBorder");
        emptySlot.textContent = "aa"
        emptySlot.style.transform = `translateY(-200%)`;
        emptySlot.style.color = "transparent";
        emptySlot.style.textShadow = "none";
        wordContainer.appendChild(emptySlot);
        syllableSlots.push(emptySlot);
    });

    let nextSlotIndex = 0;
    let busy = false;
    const shuffledSyllables = word.length > 1 ? shuffleSyllables(word) : word;
    
    shuffledSyllables.forEach(syllable => {
        const syllableDiv = document.createElement("div");
        syllableDiv.classList.add("syllableBorder");
        syllableDiv.textContent = syllable;
        
        syllableDiv.addEventListener("click", () => {
            if (nextSlotIndex < syllableSlots.length && !busy) {
                busy = true;
                playSound('./assets/Audio/SFX/System_Syllable_Selected.ogg');
                const targetSlot = syllableSlots[nextSlotIndex];
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
                    
                    if (nextSlotIndex === syllableSlots.length) {
                        setTimeout(() => {
                            if (arraysAreEqual(playerWord, originalWord)) {
                                syllableSlots.forEach(slot => {
                                    slot.style.backgroundColor = "#90EE90";
                                });
                                playSound('./assets/Audio/SFX/System_Word_Correct.ogg');
                                updateHP(-books, "enemy", () => onEnemyDefeat("#syllable-container"));
                                updateScore(originalWord.length);
                                setTimeout(() => {
                                    syllableSlots.forEach(slot => {
                                        slot.style.transition = "transform 0.3s ease, opacity 0.3s";
                                        slot.style.opacity = "0";
                                    });

                                    if (enemyHP <= 0) {
                                        return;
                                    } else {
                                        generateRandomWord();
                                        playerWord = [];
                                        displaySyllables(originalWord, "#syllable-container");
                                    }
                                }, 300);
                            } else {
                                syllableSlots.forEach(slot => {
                                    slot.style.backgroundColor = "#F08080";
                                });
                                playSound('./assets/Audio/SFX/System_Word_Error.ogg');
                                updateHP(-5, "player");
                                shakeHPBar();
                                setTimeout(() => {
                                    syllableSlots.forEach(slot => {
                                        slot.style.transition = "transform 0.5s ease, opacity 0.5s";
                                        slot.style.opacity = "0";
                                    });

                                    generateRandomWord();
                                    playerWord = [];
                                    displaySyllables(originalWord, "#syllable-container");
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
    console.log(originalWord)
    let word = languageData.randomWord(originalWord)
    originalWord = word
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


