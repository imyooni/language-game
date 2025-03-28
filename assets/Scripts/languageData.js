export function vocab(language) {
    return {
        eng: {
            newGameVocab: "New Game",
            optionsVocab: "Options",
            exitVocab: "Exit",
            goal: "Goal",
            day: "Day",
            endDay: "End Day",
            yes: "Yes",
            no: "No",
            shop: "Shop",
            free: "Free",
            finish: "Finish?"
        },
        kor: {
            newGameVocab: "새 게임",
            optionsVocab: "옵션",
            exitVocab: "종료",
            goal: "목표",
            day: "일", 
            endDay: "일 종료", 
            yes: "예",
            no: "아니요",
            shop: "상점",
            free: "공짜",
            finish: "다 했어요?",
        }
    }[language]; 
}


export function cards(mode,id = null) {
  const list = {
    error: {
      name: `&nbsp;<span style="color: red;">Error</span>&nbsp;`,
      type: 'error',
      cardColor: 'rgba(36, 36, 36, 0.41)',
      round: 0,
      probability: 0,
    },
    healingI: {
      name: `HP`,
      type: 'heal',
      cardColor: 'rgb(219, 20, 60)',
      value: ["per",[2,5]],
      round: 1,
      probability: 0.35,
    },
    elixir: {
      name: `HP`,
      type: 'heal',
      cardColor: 'rgb(20, 219, 126)',
      value: ["per",[100,100]],
      round: 1,
      probability: 0.02,
    },
    maxhp: {
      name: `Max HP`,
      type: 'mhp',
      cardColor: 'rgb(219, 20, 129)',
      value: ["per",[2,5]],
      round: 0,
      probability: 0.1,
    },
    damageI: {
      name: `HP`,
      type: 'damage',
      cardColor: 'rgb(219, 20, 60)',
      value: ["per",[-2,-5]],
      round: 0,
      probability: 0.25,
    },
    coins: {
      name: `Coins`,
      type: 'coins',
      cardColor: 'rgb(252, 219, 50)',
      value: ["fixed",[5,15]],
      round: 0,
      probability: 0.1,
    },
    points: {
      name: `Points`,
      type: 'points',
      cardColor: 'rgb(255,250,205)',
      value: ["fixed",[5,20]],
      round: 0,
      probability: 0.3,
    },
    shield: {
      name: `Shield`,
      type: 'shield',
      cardColor: 'rgb(176,196,222)',
      value: ["fixed",[1,5]],
      round: 0,
      probability: 0.3,
    },
    books: {
      name: `Books`,
      type: 'books',
      cardColor: 'rgb(123,104,238)',
      value: ["fixed",[1,3]],
      round: 0,
      probability: 0.15,
    },
    key: {
      name: `Key&nbsp;<span style="color: Gold;">+1</span>&nbsp;`,
      type: 'special',
      cardColor: 'rgb(152,251,152)',
      round: 1,
      probability: 0,
    },
    shop: {
      name: `Shop`,
      type: 'shop',
      cardColor: 'rgb(32, 139, 189)',
      round: 1,
      probability: 0,
    },
    chest: {
      name: `Chest`,
      type: 'chest',
      cardColor: 'rgb(255,105,180)',
      round: 1,
      probability: 0,
    },
    battle: {
      name: `Battle`,
      type: 'battle',
      cardColor: 'rgb(255,140,0)',
      round: 0,
      probability: 0.5,
    },
  };
  if (mode === "list") {
    return list;
  } else if (mode === "item") {
    return list[id]
  }
}

export function randomEvents(round,hp) {
  let randomEvents = []
  randomEvents.push(cards("item","battle"))
  randomEvents.push(cards("item","battle"))
  let events = Object.keys(cards("list"));
  for (let i = 0; i < events.length; i++) {
    const item = cards("item",events[i])
    if (item.probability === 0) continue
    if (item.round > round) continue
    if (item.type === "heal" && hp[0] === hp[1]) continue 
      if (Math.random() < item.probability) {
        if (item.value !== undefined) {
          let name
          let value = Math.floor(Math.random() * (item.value[1][1] - item.value[1][0] + 1)) + item.value[1][0]
          item.value[1] = value
          if (item.value[1] >= 1) {
             if (item.value[0] === "fixed") {
               item.name = `${item.name}&nbsp;<span style="color: GreenYellow;">+${item.value[1]}</span>&nbsp;`
             } else if (item.value[0] === "per") {
               item.name = `${item.name}&nbsp;<span style="color: Gold;">+${item.value[1]}%</span>&nbsp;`
             }
          } else {
            if (item.value[0] === "fixed") {
              item.name = `${item.name}&nbsp;<span style="color: red;">${item.value[1]}</span>&nbsp;`
            } else if (item.value[0] === "per") {
              item.name = `${item.name}&nbsp;<span style="color: red;">${item.value[1]}%</span>&nbsp;`
            }
          }
      
        }
        randomEvents.push(item)
        if (randomEvents.length === 6) break
      }
  }
  return randomEvents
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

export function randomWord(prevWord) {
  const random_words = [
  ["fue","go"],["ar","ma"],["mu","ra","lla"],["ro","pa"],["es","quir","la"],["co","rrer"],
  ["a","mor"],["rue","da"],["si","lla"],["mar"],["o","so"],["o","ro"],["mo","to"],["ar","bol"],
  ["ru","le","ta"],["co","mi","sa","ria"],["pe","rro"],["mo","chi","la"],["es","cue","la"],["mi","ra","da"],
  ["es","con","der"],["es","tre","lla"],["di","ne","ro"],["es","ta","dio"],["cruz"],["hie","lo"],
  ["que","so"],["cos","mos"],["ta","len","to"],["len","to"],["ca","sa"],["a","mi","go"],["ra","yo"],
  ["es","co","pe","ta"],["can","tar"],["pia","no"],["a","gua"],["ver","de"],["vio","le","ta"],["ru","sia"],
  ["chi","na"],["es","pa","ña"],["co","me","ta"],["ga","la","xia"]
];

  let filteredWords = random_words.filter(word => !arraysAreEqual(word, prevWord));
  let randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  return randomWord;
}