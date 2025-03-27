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


export function cards(id) {
  const list = {
    error:  {
      name: `&nbsp;<span style="color: red;">Error</span>&nbsp;`,
      type: "error",
      cardColor: 'rgba(36, 36, 36, 0.41)',
    },
    healingI:  {
      name: `HP&nbsp;<span style="color: GreenYellow;">+5%</span>&nbsp;`,
      type: "buff",
      cardColor: 'rgb(219, 20, 60)',
    },
    damageI:  {
      name: `HP&nbsp;<span style="color: red;">-5%</span>&nbsp;`,
      type: "debuff",
      cardColor: 'rgb(219, 20, 60)',
    },
    coins:  {
      name: `Coins`,
      type: "special",
      cardColor: 'rgb(252, 219, 50)',
    },
    key:  {
      name: `Key`,
      type: "special",
      cardColor: 'rgb(152,251,152)',
    },
    shop:  {
      name: `Shop`,
      type: "special",
      cardColor: 'rgb(32, 139, 189)',
    },
    chest:  {
      name: `Chest`,
      type: "special",
      cardColor: 'rgb(255,105,180)',
    },
    slime:  {
      name: `---`,
      type: "enemy",
      cardColor: 'rgb(255,140,0)',
    },
  };
  const items = Object.keys(list)
  const foundItem = items[id]
  let value 
  if (foundItem === undefined) {
    value = list.error
  } else {
    value = list[foundItem]
  }
 return value;
}


export function randomWord() {
  let random_words = [
    ["ro", "jo"], ["a", "zul"], ["ver", "de"], ["a", "marillo"], ["ne", "gro"],
    ["blan", "co"], ["gris", "áceo"], ["na", "ranja"], ["ros", "ado"], ["mor", "ado"],
    ["pe", "rro"], ["ga", "to"], ["ca", "ballo"], ["ra", "tón"], ["le", "ón"],
    ["ti", "gre"], ["ele", "fante"], ["jir", "afa"], ["cer", "do"], ["ove", "ja"],
    ["sol", "do"], ["lu", "na"], ["es", "trella"], ["cie", "lo"], ["mar", "te"],
    ["pla", "neta"], ["cos", "mos"], ["ga", "laxia"], ["es", "pacio"], ["as", "tro"],
    ["cas", "a"], ["ven", "tana"], ["puer", "ta"], ["te", "cho"], ["su", "elo"],
    ["pa", "red"], ["silla", "s"], ["me", "sa"], ["cam", "a"], ["có", "modo"],
    ["li", "bro"], ["cuad", "erno"], ["lá", "piz"], ["bo", "ligrafo"], ["ho", "ja"],
    ["tij", "eras"], ["re", "loj"], ["mo", "chila"], ["ba", "rril"], ["vi", "no"],
    ["ca", "fé"], ["te", "ro"], ["le", "che"], ["a", "gua"], ["ju", "go"],
    ["nue", "z"], ["pa", "pa"], ["to", "mate"], ["ce", "bolla"], ["le", "chuga"],
    ["za", "najo"], ["fre", "sa"], ["man", "zana"], ["u", "va"], ["pe", "ra"],
    ["na", "ránja"], ["me", "lón"], ["pla", "tano"], ["san", "día"], ["ki", "wi"],
    ["sol", "do"], ["cie", "lo"], ["a", "re", "na"], ["ve", "la"], ["bra", "sa"],
    ["bos", "que"], ["rie", "go"], ["ti", "e", "rra"], ["fo", "go"], ["bar", "co"],
    ["au", "to"], ["mo", "to"], ["bi", "ci"], ["avión", "es"], ["tren", "es"],
    ["luz", "es"], ["e", "ner", "gía"], ["te", "le", "vi", "sor"], ["mo", "ni", "tor"], ["ra", "dio"],
    ["in", "ter", "net"], ["te", "clado"], ["mo", "vi"], ["com", "pu"], ["ga", "me"],
    ["qui", "li"], ["xu", "lo"], ["zo", "quet"], ["fru", "frú"], ["cha", "flán"],
    ["ba", "rro"], ["drú", "mulo"], ["es", "cra", "che"], ["hu", "rre"], ["jó", "cara"],
    ["lu", "mi", "no"], ["ca", "lá", "mo"], ["ce", "rri", "llo"], ["ca", "ní", "culo"], ["zán", "ja"],
    ["e", "spec", "tro"], ["tra", "pí", "che"], ["gui", "jón"], ["je", "ne", "quén"], ["lan", "gio"],
    ["mon", "tí", "culo"], ["pár", "a", "mo"], ["tre", "be", "jo"], ["ur", "di", "mre"], ["vol", "ú", "men"],
    ["xa", "guas"], ["yé", "naga"], ["zo", "di", "a", "co"], ["a", "ce", "bia"], ["bi", "zo", "rral"],
    ["cla", "vi", "cu", "la"], ["de", "si", "dí", "a"], ["en", "tre", "mes"], ["far", "fu", "lla"], ["gor", "gó", "nea"],
    ["he", "mi", "sti", "quio"], ["iñi", "qui"], ["ja", "ru", "pa"], ["ka", "wa", "ri"], ["la", "bo", "ro"],
    ["ma", "ce", "ra"], ["ne", "bu", "lo"], ["o", "que", "dad"], ["pa", "li", "to"], ["qui", "dó", "me"],
    ["re", "sin", "ga"], ["so", "ta", "na"], ["te", "mú", "culo"], ["ul", "ti", "mo"], ["va", "ga", "do"],
    ["xa", "na", "do"], ["yem", "bi", "to"], ["ze", "ta", "bé"], ["a", "bri", "go"], ["bru", "ji", "lla"],
    ["co", "me", "jén"], ["des", "ca", "bal"], ["e", "strí", "gil"], ["fá", "ru", "co"], ["gu", "mi", "fi"],
    ["hi", "ga", "do"], ["i", "dí", "li", "co"], ["jó", "ve", "nes"], ["kra", "ke", "no"], ["lo", "ba", "to"],
    ["mi", "si", "vo"], ["no", "me", "lo"], ["ó", "bi", "ce"], ["pa", "ti", "né"], ["qui", "lo", "pi"],
    ["re", "ta", "bla"], ["su", "cli", "ne"], ["tra", "fi", "ca"], ["u", "ve", "ce"], ["ve", "lá", "men"],
    ["wu", "xia"], ["xi", "le", "ma"], ["yo", "go", "te"], ["ze", "bra", "do"], ["a", "que", "ce"],
    ["ba", "tí", "co"], ["ce", "ni", "zo"], ["de", "li", "ne"], ["e", "te", "reo"], ["fu", "lan", "ito"],
    ["gu", "a", "cha"], ["ha", "mbrí", "o"], ["i", "de", "al"], ["ja", "cob", "ea"], ["ki", "lo", "mo"],
    ["a", "ba", "rro"], ["a", "ca", "cio"], ["a", "na", "fra"], ["a", "só", "li"], ["a", "te", "nor"],
    ["ba", "ti", "ber"], ["ber", "me", "jo"], ["bis", "bi", "seo"], ["bo", "rra", "je"], ["bra", "món"],
    ["ca", "ve", "do"], ["ce", "le", "men"], ["ce", "si", "ga"], ["cha", "za", "na"], ["ci", "me", "ra"],
    ["co", "li", "ne"], ["co", "ru", "cho"], ["cri", "so", "lal"], ["cu", "li", "men"], ["de", "li", "na"],
    ["de", "ra", "me"], ["di", "ga", "me"], ["do", "li", "men"], ["e", "pi", "so"], ["e", "strí", "gil"],
    ["fi", "ne", "za"], ["fri", "vo", "lo"], ["fu", "lan", "to"], ["ga", "li", "ar"], ["go", "zo", "so"],
    ["gra", "nu", "lo"], ["gue", "ru", "le"], ["hi", "ga", "da"], ["hi", "pe", "ro"], ["ho", "ci", "co"],
    ["hu", "me", "do"], ["i", "nó", "pi"], ["ja", "ra", "be"], ["ja", "sén", "se"], ["jo", "ca", "ra"],
    ["ju", "gla", "re"], ["lan", "gio"], ["li", "cu", "lo"], ["lo", "za", "no"], ["lu", "bi", "to"],
    ["ma", "ce", "ro"], ["ma", "jo", "le"], ["me", "ce", "dor"], ["mo", "ri", "lo"], ["na", "i", "pe"],
    ["ne", "bi", "na"], ["ni", "e", "bla"], ["nu", "be", "la"], ["o", "to", "nal"], ["pa", "li", "to"],
    ["pa", "ne", "go"], ["pe", "ce", "ño"], ["pi", "la", "stre"], ["po", "zo", "na"], ["pu", "la", "cro"],
    ["que", "me", "ro"], ["qui", "la", "tro"], ["ra", "bi", "eta"], ["re", "to", "na"], ["ri", "ga", "to"],
    ["ro", "do", "ra"], ["ru", "ge", "ro"], ["sa", "lu", "bre"], ["se", "li", "ne"], ["so", "bi", "na"],
    ["su", "fra", "go"], ["ta", "pi", "ar"], ["ti", "ra", "no"], ["to", "ri", "vo"], ["tras", "go"],
    ["tri", "fa", "cio"], ["tu", "mú", "lo"], ["ul", "ti", "mo"], ["ur", "di", "dor"], ["va", "ga", "mo"],
    ["va", "ne", "za"], ["ve", "lo", "za"], ["vi", "bra", "to"], ["vi", "da", "go"], ["xa", "gu", "as"],
    ["xo", "gue", "ro"], ["za", "mo", "ra"], ["za", "rza", "mo"], ["zo", "pa", "ra"], ["zo", "que", "te"],
    ["za", "hu", "rda"], ["a", "ce", "bada"], ["bra", "mi", "do"], ["da", "ri", "ga"], ["e", "spor", "so"],
    ["fra", "ga", "rio"], ["hu", "me", "ral"], ["la", "be", "na"], ["lu", "mi", "no"], ["mó", "de", "lo"],
    ["pe", "rro"], ["ga", "to"], ["ca", "ballo"], ["ra", "tón"], ["le", "ón"],
    ["ti", "gre"], ["ele", "fante"], ["jir", "afa"], ["cer", "do"], ["ove", "ja"],
    ["a", "guila"], ["bu", "ho"], ["cis", "ne"], ["fo", "ca"], ["man", "tarraya"],
    ["tu", "ru", "go"], ["ca", "mien"], ["o", "so"], ["li", "e", "bre"], ["rin", "ce", "ro"],
    ["mo", "rse"], ["hu", "rón"], ["pin", "güi", "no"], ["do", "lfin"], ["ba", "llu", "na"],
    ["mar", "i", "po", "sa"], ["ca", "ma", "león"], ["i", "guana"], ["ser", "pien", "te"], ["cu", "e", "rvo"],
    ["go", "ri", "la"], ["ko", "a", "la"], ["li", "ce"], ["mos", "ca"], ["a", "be", "ja"],
    ["te", "rmi", "ta"], ["e", "scar", "ba", "jo"], ["a", "vi", "struz"], ["me", "re", "na"],
    ["za", "ra", "go"], ["ti", "bu", "rón"], ["ca", "rá", "col"], ["gril", "lo"], ["lan", "gri", "ta"],
    ["co", "co", "dri", "lo"], ["tor", "tu", "ga"], ["ci", "e", "rvo"], ["ar", "di", "lla"],
    ["mur", "cié", "la", "go"], ["tor", "o"], ["cab", "ra"], ["gallo"], ["ga", "vin"],
    ["es", "tre", "lla", "de", "mar"], ["e", "ri", "zo"], ["es", "co", "rpi", "ón"], ["lan", "gu", "sto"],
    ["bo", "ga", "van", "te"], ["ca", "rpa"], ["pa", "pa", "ya"], ["mo", "ra", "yo"],
    ["pe", "ce", "ri", "llo"], ["te", "tardó"], ["ba", "boa"], ["ba", "gua"], ["a", "chi", "pa"],
    ["pe", "li", "cano"], ["ci", "go", "ña"], ["cu", "ervo"], ["gol", "dri"], ["a", "lbri", "je"],
    ["li", "bro", "ro"], ["hip", "po", "po", "tamo"], ["gi", "ra", "fa"], ["a", "lio", "ro"],
    ["o", "so", "po", "lar"], ["la", "sa", "ña"], ["bo", "ga", "van", "te"], ["ca", "mello"],
    ["li", "bro", "ro"], ["tur", "pi", "al"], ["loro"], ["pa", "to"], ["gi", "ra", "fa"],
    ["pin", "güi", "no"], ["gato"], ["mo", "nito"], ["ca", "mino"], ["a", "ra", "ra"],
    ["ma", "car", "co"], ["tuc", "án"], ["flo", "ro"], ["ve", "no", "so"], ["mo", "ra", "yo"]
];
  let randomWord = random_words[Math.floor(Math.random() * random_words.length)];
  return randomWord
}