

import * as languageData from './assets/Scripts/languageData.js';

let basePallete = ["#231942", "#5e548e", "#9f86c0", "#be95c4", "#e0b1cb"]

let scene = 'intro';
let language = 'eng';

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
const hpBar = document.querySelector('.hp-bar-container')
const hpValue = document.querySelector('.hp-text')
const coinsContainer = document.querySelector('.coins')
const strengthContainer = document.querySelector('.strength')
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
    let elements = [hpBar, hpValue, coinsContainer, scoreContainer,strengthContainer,monitorContainer];
    showElements(elements, "show");
    updateHP(HP, "player");
    updateStrength(strength)
    updateCoins(0);
    updateScore(0);
    setTimeout(() => {
        let bgm = new Audio('./assets/Audio/BGM/bgm001.mp3'); 
        bgm.loop = true; // Enable looping
        bgm.volume = 0.5; // Adjust volume if needed (0.0 to 1.0)
        bgm.play();
        generateRandomCards()
    }, 200);
}
// Math.floor(Math.random() * 9999999

function updateCoins(value) {
    document.querySelector('.coins').textContent = `${value}`; 
}

function updateScore(value) {
    document.querySelector('.score').textContent = `${value}`; 
}

function updateStrength(value) {
    document.querySelector('.strength').textContent = `${value}`; 
}

let strength = 1
let maxHP = 100;
let HP = 100;
let enemyMaxHP;
let enemyHP;

function updateHP(amount, target) {
    let hp, mhp, element;
    if (target === "player") {
        mhp = maxHP;
        HP = Math.max(0, Math.min(HP + amount, mhp)); 
        hp = HP;
    } else {
        mhp = enemyMaxHP;
        enemyHP = Math.max(0, Math.min(enemyHP + amount, mhp)); 
        hp = enemyHP;
    }
    let hpPercentage = (hp / mhp) * 100;
    if (target === "player") {
        element = ['.hp-bar', '.hp-text'];
    } else {
        element = ['.enemy-hp-bar', '.enemy-hp-text'];
    }
    document.querySelector(element[0]).style.width = hpPercentage + '%';
    document.querySelector(element[1]).textContent = `${hp} / ${mhp}`;
}

function raiseHp(value) {
    maxHP += value
    let currentHP = Math.max(0, Math.min(HP, maxHP));
    let hpPercentage = (currentHP / maxHP) * 100; 
    document.querySelector('.hp-bar').style.width = hpPercentage + '%'; 
    document.querySelector('.hp-text').textContent = `${currentHP} / ${maxHP}`; 
}



document.addEventListener('keydown', function (event) {
    if (event.key === "8") {
        generateRandomCards()
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === "9") {
        updateScore(Math.floor(Math.random() * 999999999))
        updateCoins(Math.floor(Math.random() * 9999999))
    }
});

let random_events = ["Slime", "Healing 5%", "yellow", "green", "orange", "purple", "white", "black"];

const cardsContainer = document.getElementById("card-container");
function generateRandomCards() {
    cardsContainer.innerHTML = ""; 
    let numCards = Math.floor(Math.random() * 5) + 2; 
    let shuffledWords = shuffleArray([...random_events]); 
    let selectedWords = shuffledWords.slice(0, numCards);
    selectedWords.forEach(word => {
        let cardData = languageData.cards(7)
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
        cardsContainer.appendChild(card);
        setTimeout(() => {
            card.style.opacity = "1";
        }, 100);
    });
    const sound = new Audio('./assets/Audio/SFX/System_Cards.ogg'); // Replace with your sound file
    sound.play();
}

const enemyHpContainer = document.querySelector('.enemy-hp-bar-container')
const enemyhpValue = document.querySelector('.enemy-hp-text')
const enemyNameContainer = document.querySelector('.enemy-name-text')

let battleActive = false
document.addEventListener("click", function (event) {
   if (battleActive) return
    let clickedItem = event.target.closest(".card");
    if (!clickedItem) return;
    let elements = [enemyHpContainer,enemyhpValue,enemyNameContainer];
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
});


let originalWord = ""
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
    const emptySlots = [];
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
                syllableDiv.style.transition = "transform 0.3s ease, opacity 0.3s";
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
                                updateHP(-strength, "enemy")
                                
                                setTimeout(() => {
                                    emptySlots.forEach(slot => {
                                        slot.style.transition = "transform 0.3s ease, opacity 0.3s";
                                        slot.style.opacity = "0"; 
                                    });
                                   generateRandomWord()
                                   playerWord = []
                                   displaySyllables(originalWord, "#syllable-container")
                                }, 300);
                            } else {
                                emptySlots.forEach(slot => {
                                    slot.style.backgroundColor = "#F08080"; 
                                });
                                updateHP(-5, "player")
                                
                                setTimeout(() => {
                                    emptySlots.forEach(slot => {
                                        slot.style.transition = "transform 0.3s ease, opacity 0.3s";
                                        slot.style.opacity = "0"; 
                                    });
                                   generateRandomWord()
                                   playerWord = []
                                   displaySyllables(originalWord, "#syllable-container")
                                }, 300);
                            }
                        }, 200); 
                    }

                    busy = false; 
                }, 300); 
            }
        });

        container.appendChild(syllableDiv);
    });
}

function generateRandomWord() {
  originalWord = languageData.randomWord()
}



