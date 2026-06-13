export type BookId = "ano" | "sofia" | "ellos" | "ellas";

export type Book = {
  id: BookId;
  title: string;
  subtitle: string;
  /** One-line "para quién es" */
  forWhom: string;
  /** Why-match: a short, warm explainer when this book wins */
  why: string;
  /** Three short quotes selected to land different emotional registers */
  excerpts: { text: string; caption: string; tone: "corazon" | "humor" | "esperanza" }[];
  /** Costa Rica flavor — anchor that lives in the book */
  ticoAnchor: string;
  palette: {
    from: string;
    via: string;
    to: string;
    accent: string;
    ink: string;
  };
  motif: "amanecer" | "arcoiris" | "bodega" | "atardecer";
  /** Special: 1+1 donation program */
  donation?: { line: string; detail: string };
  cta: { buyHref: string; talkHref: string };
};

export const BOOKS: Record<BookId, Book> = {
  ano: {
    id: "ano",
    title: "El año en que aprendí a vivir",
    subtitle: "Memorias del año que partió mi vida en dos",
    forWhom:
      "Para quien sospecha que la vida real lo está esperando del otro lado de la pantalla.",
    why:
      "Vas a sentir que alguien te está hablando al oído desde el otro lado de un diagnóstico —y descubrir, sin que te lo digan, que el libro no trata de cáncer. Trata de las páginas aburridas que decidimos no leer hasta que la vida nos obliga.",
    excerpts: [
      {
        text: "“No es una historia sobre cáncer, aunque el cáncer estuvo allí. Es una historia sobre las páginas que decidimos leer y las que pasamos por alto.”",
        caption: "— Prólogo: La página que nunca lees",
        tone: "corazon",
      },
      {
        text: "“¿Quién elegiría deliberadamente la página aburrida sobre seguros cuando hay dragones que derrotar en otras partes del libro?”",
        caption: "— Prólogo",
        tone: "humor",
      },
      {
        text: "“La quimioterapia no era el comienzo de la guerra: era la llegada de los refuerzos.”",
        caption: "— Capítulo: La primera infusión",
        tone: "esperanza",
      },
    ],
    ticoAnchor:
      "Un linfoma diagnosticado en una cabaña a 2 000 metros sobre el Valle Central, una doctora del Hospital Clínica Bíblica que habla con datos en vez de frases vacías, y una familia tica que organiza el cuido como un operativo militar.",
    palette: {
      from: "#1a0f08",
      via: "#3a1f0e",
      to: "#b87333",
      accent: "#f4c47a",
      ink: "#fff7e8",
    },
    motif: "amanecer",
    donation: {
      line: "1 libro comprado = 1 libro donado",
      detail:
        "Por cada ejemplar que sale de esta feria, otro va directo a un paciente oncológico o a un cuidador del Hospital México. Sin trámites: lo entregamos nosotros.",
    },
    cta: {
      buyHref: "https://www.amazon.com/s?k=Miguel+Fuentes+El+a%C3%B1o+en+que+aprend%C3%AD+a+vivir",
      talkHref:
        "mailto:miguel@miguelfuentes.cr?subject=El%20a%C3%B1o%20en%20que%20aprend%C3%AD%20a%20vivir",
    },
  },
  sofia: {
    id: "sofia",
    title: "Los Mapas Mágicos de Sofía",
    subtitle: "Para niños valientes (y los adultos que los acompañan)",
    forWhom:
      "Para los hogares donde un niño está haciendo preguntas que nadie sabe muy bien cómo responder.",
    why:
      "Hay una conversación pendiente en tu casa, y este libro la abre por vos. Sofía, 7 años y un oso llamado Señor Bigotes, dibuja mapas para no perderse cuando el mundo cambia. No es un libro sobre enfermedad: es una caja de herramientas emocionales para una familia entera.",
    excerpts: [
      {
        text: "“A veces tengo miedo. A veces estoy triste. A veces estoy enojada. Todas esas cosas están bien. Yo hago mapas mágicos. ¿Querés ver cómo?”",
        caption: "— Carta de Sofía",
        tone: "corazon",
      },
      {
        text: "“En el recreo, ‘sin querer’ tiré mi jugo de uva. TODO el jugo. En la mochila nueva de Miguel. La mochila quedó morada. Y pegajosa. MUY pegajosa.”",
        caption: "— Capítulo 2",
        tone: "humor",
      },
      {
        text: "“Después de la lluvia siempre sale el sol. Y cuando no sale solo, podemos dibujarlo juntos.”",
        caption: "— Nota para los padres",
        tone: "esperanza",
      },
    ],
    ticoAnchor:
      "Una niña tica que cuenta hasta cien cada noche para asegurarse de que su papá siga respirando, validada por la psicooncóloga del Hospital México. Un recurso usado ya en familias reales.",
    palette: {
      from: "#0f1530",
      via: "#1f3a8a",
      to: "#f59ec0",
      accent: "#ffd166",
      ink: "#fff5fb",
    },
    motif: "arcoiris",
    cta: {
      buyHref: "https://www.amazon.com/s?k=Los+Mapas+M%C3%A1gicos+de+Sof%C3%ADa+Miguel+Fuentes",
      talkHref:
        "mailto:miguel@miguelfuentes.cr?subject=Los%20Mapas%20M%C3%A1gicos%20de%20Sof%C3%ADa",
    },
  },
  ellos: {
    id: "ellos",
    title: "Ellos en Nosotros",
    subtitle: "Los que se quedan — II",
    forWhom:
      "Para quien descubre, demasiado tarde o justo a tiempo, que conoció a su papá solo en datos.",
    why:
      "Una llamada un sábado a las 10:15 de la mañana. Una bodega en Zapote con una maleta café. Y la pregunta que aplaza el duelo: ¿lo conocí de verdad? Si tu papá ya no está —o si todavía está y no han hablado lo suficiente— este libro es un permiso y un mapa.",
    excerpts: [
      {
        text: "“Cuarenta y siete años siendo su hijo. Había asumido, con la tranquilidad cómoda de quien no necesita preguntar, que siempre iba a haber tiempo.”",
        caption: "— Capítulo 1: La bodega",
        tone: "corazon",
      },
      {
        text: "“La tía Natalia mandó un audio de cuatro minutos sobre las propiedades calmantes de la juanilama —tiene solución herbal para cualquier situación humana, incluyendo las que no la tienen.”",
        caption: "— Capítulo 1",
        tone: "humor",
      },
      {
        text: "“El tercer escalón crujió donde siempre. Eso era lo más difícil de entender: que el mundo siguiera con la misma geometría de siempre, que la casa no hubiera recibido el memorando.”",
        caption: "— Capítulo 1",
        tone: "esperanza",
      },
    ],
    ticoAnchor:
      "Una casa familiar tica con un patio que cruje, vecinos que llegan sin avisar, el WhatsApp familiar alternando cadenas de oración con trámites, y una tía con receta herbal para todo. Un duelo costarricense, contado sin solemnidad.",
    palette: {
      from: "#070a18",
      via: "#0f1d3a",
      to: "#3b4d7a",
      accent: "#c9b27a",
      ink: "#eef1f8",
    },
    motif: "bodega",
    cta: {
      buyHref: "https://www.amazon.com/s?k=Ellos+en+Nosotros+Miguel+Fuentes",
      talkHref: "mailto:miguel@miguelfuentes.cr?subject=Ellos%20en%20Nosotros",
    },
  },
  ellas: {
    id: "ellas",
    title: "Ellas y Nosotros",
    subtitle: "Los que se quedan — I",
    forWhom: "Para quien todavía sonríe al escuchar el tono imaginario de un beeper.",
    why:
      "Una novela para leer un sábado en la tarde con un café, mandándole fotos viejas a alguien por WhatsApp. Foodcourt del Mall San Pedro, viaje a Jacó después de la graduación, primer amor que duró lo mismo que un helado en Puntarenas al mediodía.",
    excerpts: [
      {
        text: "“Nos prometimos todo, lo cual duró aproximadamente lo mismo que un helado en Puntarenas al mediodía.”",
        caption: "— Capítulo 1: El espejo del tiempo",
        tone: "humor",
      },
      {
        text: "“Tu mamá dice que Dios castiga dos veces.”",
        caption: "— Capítulo 1",
        tone: "humor",
      },
      {
        text: "“Cada historia de amor, por breve que sea, deja una huella. Y de esas huellas, a veces, nacen novelas.”",
        caption: "— Agradecimientos",
        tone: "corazon",
      },
    ],
    ticoAnchor:
      "Una novela tica que pasa entre 1996 y hoy: graduación del cole, viaje a Jacó, beepers, Nokia 5110, foodcourts olvidados y la tarde en que un grupo de güilas creyó que todo lo que vivían iba a durar para siempre.",
    palette: {
      from: "#1a0820",
      via: "#7b1d4a",
      to: "#ff8c5a",
      accent: "#ffd28a",
      ink: "#fff1e6",
    },
    motif: "atardecer",
    cta: {
      buyHref: "https://www.amazon.com/s?k=Ellas+y+Nosotros+Miguel+Fuentes",
      talkHref: "mailto:miguel@miguelfuentes.cr?subject=Ellas%20y%20Nosotros",
    },
  },
};

/**
 * Each option carries:
 * - weights to books (multiple allowed)
 * - tag: a single word the app echoes back as "anotado: ___"
 * - echo: a one-liner the app whispers in tico voice after the choice
 */
export type Question = {
  id: string;
  pacing: string;
  prompt: string;
  options: {
    label: string;
    hint?: string;
    tag: string;
    echo: string;
    weights: Partial<Record<BookId, number>>;
  }[];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    pacing: "Respirá una vez. No hay respuesta correcta.",
    prompt: "¿Qué pesa más en este capítulo de tu vida?",
    options: [
      {
        label: "Una herida reciente que aún arde",
        hint: "Algo cambió y no termino de aterrizar.",
        tag: "una herida fresca",
        echo: "Te escucho. Eso no se cura leyendo —pero a veces se acompaña.",
        weights: { ano: 2, ellos: 2 },
      },
      {
        label: "Una nostalgia bonita y traviesa",
        hint: "Pienso en quien fui antes de saber todo lo que sé hoy.",
        tag: "nostalgia traviesa",
        echo: "Buena. Esa nostalgia tiene banda sonora —y probablemente sabe a Imperial.",
        weights: { ellas: 3 },
      },
      {
        label: "El miedo de perder a alguien",
        hint: "Hay un nombre que cuento por las noches.",
        tag: "miedo de perder",
        echo: "Anotado. Ese miedo tiene su propio capítulo en al menos dos de estos libros.",
        weights: { ano: 2, sofia: 2, ellos: 1 },
      },
      {
        label: "Ganas de vivir más despierto",
        hint: "Sospecho que me estoy perdiendo lo importante.",
        tag: "vivir despierto",
        echo: "Esa sospecha es el primer síntoma. En serio.",
        weights: { ano: 3 },
      },
    ],
  },
  {
    id: "q2",
    pacing: "Pensá en este martes, no en abstracto.",
    prompt: "¿Quién camina con vos en este momento?",
    options: [
      {
        label: "Niños chiquitos, observándolo todo",
        hint: "Tengo que explicarles cosas que ni yo entiendo bien.",
        tag: "los chiquillos",
        echo: "Ellos preguntan en serio. Y se merecen respuestas en serio.",
        weights: { sofia: 3, ano: 1 },
      },
      {
        label: "Mi pareja y nuestra historia compartida",
        hint: "Tenemos años, fotos viejas y bromas privadas.",
        tag: "tu persona",
        echo: "Ese “mae, ¿te acordás de…?” es una forma de oración.",
        weights: { ellas: 2, ano: 1 },
      },
      {
        label: "El recuerdo de alguien que ya no está",
        hint: "A veces les hablo en voz baja.",
        tag: "una ausencia presente",
        echo: "A los que se nos fueron también les hablamos por WhatsApp. Lo sabemos.",
        weights: { ellos: 3 },
      },
      {
        label: "Yo conmigo mismo, en silencio",
        hint: "Es un capítulo más íntimo de lo habitual.",
        tag: "vos con vos",
        echo: "Ese silencio es el más honesto. Bien.",
        weights: { ano: 2, ellos: 1 },
      },
    ],
  },
  {
    id: "q3",
    pacing: "Sin pensarlo mucho —lo primero que se te venga.",
    prompt: "¿Qué imagen te suena más a casa?",
    options: [
      {
        label: "Un café chorreado a las 6 de la mañana, antes de que despierte el resto",
        tag: "café antes del mundo",
        echo: "Ese café es media biografía. Anotado.",
        weights: { ano: 2, ellos: 2 },
      },
      {
        label: "Un parque un viernes en la noche, con los amigos del cole",
        tag: "viernes con la mae",
        echo: "Pura vida. Esa banda sonora todavía suena en algún lado.",
        weights: { ellas: 3 },
      },
      {
        label: "Un patio con un palo de mango cargado y la radio prendida",
        tag: "patio con mango",
        echo: "Esa casa cruje en los lugares correctos. Anotado.",
        weights: { ellos: 3 },
      },
      {
        label: "Una mesa con dibujos a medio terminar y crayones por todo lado",
        tag: "crayones y migas",
        echo: "Esa mesa tiene tres voces hablando al mismo tiempo. Lo sabemos.",
        weights: { sofia: 3 },
      },
    ],
  },
  {
    id: "q4",
    pacing: "Si te pudieras llevar UNA cosa de un libro…",
    prompt: "¿Qué querrías llevarte al cerrar la última página?",
    options: [
      {
        label: "Las palabras que necesito decirle a alguien antes de que sea tarde",
        tag: "palabras pendientes",
        echo: "Esas palabras pesan. Te ayudamos a escribirlas.",
        weights: { ellos: 3, ano: 1 },
      },
      {
        label: "Una forma de explicarle algo difícil a un niño",
        tag: "lenguaje para los chiquitos",
        echo: "Sofía dibuja mapas. Vos vas a aprender a leerlos con ella.",
        weights: { sofia: 3 },
      },
      {
        label: "Recordar quién era cuando todavía no sabía nada",
        tag: "vos, joven y sin filtro",
        echo: "Ese carajillo sigue ahí adentro. Vamos a saludarlo.",
        weights: { ellas: 3 },
      },
      {
        label: "La certeza de que aún hay tiempo de cambiar",
        tag: "todavía hay tiempo",
        echo: "Hay. Pero no infinito. Y eso, paradójicamente, es la buena noticia.",
        weights: { ano: 3 },
      },
    ],
  },
  {
    id: "q5",
    pacing: "Esta es de risa. Importa.",
    prompt: "¿Cuál de estas líneas te saca un “jajaja” real?",
    options: [
      {
        label: "“La tía Natalia tiene solución herbal para cualquier situación humana, incluyendo las que no la tienen.”",
        tag: "humor de tía Natalia",
        echo: "Esa tía existe en todas las familias ticas. Confirmado.",
        weights: { ellos: 3 },
      },
      {
        label: "“Nos prometimos todo, lo cual duró aproximadamente lo mismo que un helado en Puntarenas al mediodía.”",
        tag: "humor de cole",
        echo: "Si te reíste, ya sabés en qué playa termina esto.",
        weights: { ellas: 3 },
      },
      {
        label: "“En el recreo, ‘sin querer’ tiré mi jugo de uva. TODO el jugo. En la mochila nueva de Miguel.”",
        tag: "humor de chiquilla brava",
        echo: "Esa es Sofía. Tierna y con justicia propia.",
        weights: { sofia: 3 },
      },
      {
        label: "“¿Quién elegiría la página aburrida sobre seguros cuando hay dragones que derrotar?”",
        tag: "humor de adulto distraído",
        echo: "Ese chiste se entiende mejor a los 40. Lo sabemos.",
        weights: { ano: 3 },
      },
    ],
  },
  {
    id: "q6",
    pacing: "Respirá. Esta es la importante.",
    prompt: "¿Qué clase de esperanza estás necesitando?",
    options: [
      {
        label: "La que llega de noche, cuando ya nadie te está mirando",
        tag: "esperanza silenciosa",
        echo: "Esa es la más difícil. Y la más real.",
        weights: { ano: 3, ellos: 1 },
      },
      {
        label: "La que se dibuja con crayones sobre una mesa de cocina",
        tag: "esperanza en colores",
        echo: "Esa esperanza tiene siete años y un oso llamado Señor Bigotes.",
        weights: { sofia: 3 },
      },
      {
        label: "La que se hereda sin que nadie te lo diga",
        tag: "esperanza heredada",
        echo: "La que está en una bodega cerrada con candado. Ya casi.",
        weights: { ellos: 3 },
      },
      {
        label: "La que se ríe primero y después se pone seria",
        tag: "esperanza con humor",
        echo: "La mejor receta tica. Vos sabés.",
        weights: { ellas: 2, ano: 1 },
      },
    ],
  },
  {
    id: "q7",
    pacing: "Última. La voz que más te llame: esa es tu libro.",
    prompt: "¿Cómo querés sentirte al cerrar este libro a las 11 de la noche?",
    options: [
      {
        label: "Acompañado, como si alguien te entendiera sin tener que explicarle",
        tag: "acompañado",
        echo: "Anotado. Vamos a poner a alguien al lado tuyo.",
        weights: { ano: 2, ellos: 2 },
      },
      {
        label: "Con una sonrisa nostálgica y ganas de mensajear a alguien viejo",
        tag: "sonrisa nostálgica",
        echo: "Tené el celu cerca. Lo vas a usar.",
        weights: { ellas: 3 },
      },
      {
        label: "Con herramientas reales para una conversación pendiente",
        tag: "con herramientas",
        echo: "Vas a salir con frases listas para usar. En serio.",
        weights: { sofia: 2, ellos: 2 },
      },
      {
        label: "Con ganas de llamar a alguien YA, aunque sea tarde",
        tag: "urgencia tierna",
        echo: "Esa llamada vale más de lo que cuesta el libro. Hacela.",
        weights: { ano: 2, ellos: 2, sofia: 1 },
      },
    ],
  },
];

export function scoreAnswers(answers: number[]): {
  winner: BookId;
  scores: Record<BookId, number>;
  contributingAnswers: { qIdx: number; weight: number; tag: string }[];
} {
  const scores: Record<BookId, number> = { ano: 0, sofia: 0, ellos: 0, ellas: 0 };
  answers.forEach((optionIdx, qIdx) => {
    const q = QUESTIONS[qIdx];
    if (!q) return;
    const opt = q.options[optionIdx];
    if (!opt) return;
    for (const [k, v] of Object.entries(opt.weights)) {
      scores[k as BookId] += v ?? 0;
    }
  });

  const order: BookId[] = ["ano", "ellos", "ellas", "sofia"];
  let winner: BookId = order[0];
  let best = -1;
  for (const id of order) {
    if (scores[id] > best) {
      best = scores[id];
      winner = id;
    }
  }

  const contributingAnswers: { qIdx: number; weight: number; tag: string }[] = [];
  answers.forEach((optionIdx, qIdx) => {
    const q = QUESTIONS[qIdx];
    if (!q) return;
    const opt = q.options[optionIdx];
    if (!opt) return;
    const w = opt.weights[winner] ?? 0;
    if (w > 0) contributingAnswers.push({ qIdx, weight: w, tag: opt.tag });
  });
  contributingAnswers.sort((a, b) => b.weight - a.weight);

  return { winner, scores, contributingAnswers };
}
