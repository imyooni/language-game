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
      type: 'hp',
      cardColor: 'rgb(219, 20, 60)',
      value: ["per",[2,5]],
      round: 1,
      probability: 0.35,
    },
    elixir: {
      name: `HP`,
      type: 'hp',
      cardColor: 'rgb(20, 219, 126)',
      value: ["per",[100,100]],
      round: 1,
      probability: 0.02,
    },
    maxhp: {
      name: `Max HP`,
      type: 'mhp',
      cardColor: 'rgb(219, 20, 60)',
      value: ["per",[2,5]],
      round: 0,
      probability: 0.1,
    },
    damageI: {
      name: `HP`,
      type: 'hp',
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
      probability: 0.05,
    },
    shop: {
      name: `Shop`,
      type: 'shop',
      cardColor: 'rgb(32, 139, 189)',
      round: 1,
      probability: 0.15,
    },
    chest: {
      name: `Chest`,
      type: 'chest',
      cardColor: 'rgb(255,105,180)',
      round: 1,
      probability: 0.03,
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


export function randomWord(prevWord) {
  const random_words = [
    "amor", "casa", "libro", "mesa", "árbol", "cielo", "felicidad", "coche", "perro", "gato", 
    "ciudad", "trabajo", "familia", "amigo", "país", "música", "sol", "luna", "mar", "montaña", 
    "ventana", "puerta", "fuego", "agua", "comida", "ropa", "teléfono", "computadora", "papel", 
    "silla", "zapato", "hospital", "escuela", "universidad", "cocina", "baño", "jardín", "película", 
    "televisión", "vida", "muerte", "tiempo", "noche", "día", "luz", "oscuridad", "camino", "sendero", 
    "tren", "avión", "barco", "bicicleta", "pelota", "sueño", "realidad", "historia", "memoria", 
    "cultura", "arte", "lienzo", "pintura", "escultura", "fotografía", "espejo", "sombrero", 
    "camisa", "pantalón", "falda", "diseño", "plan", "idea", "proyecto", "dibujo", "foto", 
    "poesía", "canción", "sonrisa", "llanto", "corazón", "mente", "cuerpo", "alma", "espíritu", 
    "sensación", "pensamiento", "pregunta", "respuesta", "acuerdo", "conflicto", "estrés", "paz", 
    "guerra", "caos", "equilibrio", "movimiento", "estabilidad", "crecimiento", "desarrollo", 
    "avance", "retroceso", "futuro", "pasado", "presente", "esperanza", "desesperación", "confianza", 
    "miedo", "valentía", "temor", "felicidad", "tristeza", "odio", "amor", "compasión", "generosidad", 
    "egoísmo", "solidaridad", "sociedad", "gente", "familia", "vecino", "trabajador", "jefe", "empleado", 
    "empresa", "negocio", "contrato", "acuerdo", "economía", "dinero", "moneda", "banco", "mercado", 
    "comercio", "intercambio", "inversión", "ahorro", "gasto", "riesgo", "seguridad", "crisis", "oportunidad", 
    "tarea", "trabajo", "esfuerzo", "recompensa", "exito", "fracaso", "hombre", "mujer", "niño", "adolescente", 
    "adulto", "anciano", "persona", "individuo", "grupo", "comunidad", "nación", "planeta", "universo", 
    "tiempo", "espacio", "dimensión", "ciencia", "tecnología", "invención", "innovación", "descubrimiento", 
    "teoría", "experimento", "investigación", "prueba", "error", "práctica", "experiencia", "conocimiento", 
    "sabiduría", "educación", "aprendizaje", "escuela", "universidad", "profesor", "alumno", "estudiante", 
    "materia", "asignatura", "tarea", "examen", "estudio", "colegio", "aula", "pupitre", "silla", "escritorio", 
    "papelera", "libreta", "bolígrafo", "lapicero", "marcador", "carpeta", "cuaderno", "mochila", "agenda", 
    "organizador", "tiempo", "horario", "programa", "reloj", "calendario", "día", "semana", "mes", "año", 
    "estación", "verano", "invierno", "primavera", "otoño", "día", "noche", "mañana", "tarde", "futuro", 
    "pasado", "presente", "luna", "sol", "estrella", "cielo", "nube", "viento", "tormenta", "huracán", "ciclón", 
    "lluvia", "niebla", "frío", "calor", "temperatura", "clima", "terremoto", "volcán", "desastre", "catástrofe", 
    "planeta", "tierras", "mar", "océano", "río", "lago", "pueblo", "ciudad", "metrópoli", "aldea", "zona", 
    "barrio", "vecindad", "rural", "urbano", "suburbio", "periferia", "centro", "gente", "pueblo", "familia", 
    "pareja", "matrimonio", "hermano", "hermana", "padre", "madre", "hijo", "hija", "abuelo", "abuela", 
    "tío", "tía", "primo", "prima", "suegro", "suegra", "yerno", "nuera", "cuñado", "cuñada", "suegro", 
    "compañero", "compañera", "amigo", "amistad", "relación", "confianza", "amor", "cariño", "envidia", 
    "celos", "deseo", "pasión", "respeto", "odio", "odio", "venganza", "perdón", "reconciliación", "ayuda", 
    "apoyo", "solidaridad", "servicio", "cuidado", "protección", "seguridad", "autonomía", "libertad", 
    "justicia", "igualdad", "equidad", "derechos", "deberes", "ley", "gobierno", "estado", "política", 
    "economía", "sociedad", "educación", "sanidad", "salud", "derechos humanos", "libertad", "opresión", 
    "dictadura", "democracia", "sistema", "ideología", "moral", "ética", "especie", "evolución", "animal", 
    "planta", "vegetal", "fósil", "mamífero", "insecto", "pájaro", "peces", "reptil", "anfibio", "animal", 
    "crustáceo", "salvaje", "doméstico", "endémico", "especie", "fuerza", "energía", "potencia", "magnetismo", 
    "electricidad", "físico", "químico", "biológico", "teórico", "experimental", "medición", "prueba", 
    "cálculo", "hipótesis", "teoría", "investigación", "científico", "investigador", "descubrimiento", 
    "proceso", "resultado", "avance", "prueba", "experimento"
];

  let filteredWords = random_words.filter(word => word !== prevWord);
  let randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  return randomWord;
}