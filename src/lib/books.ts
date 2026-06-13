export type BookId = "ano" | "sofia" | "ellos" | "ellas";

export type Book = {
  id: BookId;
  title: string;
  subtitle: string;
  tagline: string;
  why: string;
  excerpt: string;
  excerptCaption: string;
  palette: {
    from: string;
    via: string;
    to: string;
    accent: string;
    ink: string;
  };
  motif: string;
  cta: { buyHref: string; talkHref: string };
};

export const BOOKS: Record<BookId, Book> = {
  ano: {
    id: "ano",
    title: "El año en que aprendí a vivir",
    subtitle: "Memorias de un año que partió una vida en dos",
    tagline:
      "Para quien sospecha que la vida real lo está esperando del otro lado de la pantalla.",
    why:
      "Por lo que respondiste, este libro va a sentirse como una conversación con alguien que ya pasó por donde estás. No te promete consuelo barato. Te promete presencia. Y, sin que lo notes, una forma distinta de mirar el lunes que viene.",
    excerpt:
      "“No es una historia sobre cáncer, aunque el cáncer estuvo allí. Es una historia sobre las páginas que decidimos leer y las que pasamos por alto.”",
    excerptCaption: "— Prólogo: La página que nunca lees",
    palette: {
      from: "#1a0f08",
      via: "#3a1f0e",
      to: "#b87333",
      accent: "#f4c47a",
      ink: "#fff7e8",
    },
    motif: "amanecer",
    cta: {
      buyHref: "https://www.amazon.com/s?k=Miguel+Fuentes+El+a%C3%B1o+en+que+aprend%C3%AD+a+vivir",
      talkHref:
        "mailto:miguel@miguelfuentes.cr?subject=El%20a%C3%B1o%20en%20que%20aprend%C3%AD%20a%20vivir",
    },
  },
  sofia: {
    id: "sofia",
    title: "Los Mapas Mágicos de Sofía",
    subtitle: "Un libro para niños valientes (y para los adultos que los acompañan)",
    tagline:
      "Para los hogares donde un niño está haciendo preguntas que nadie sabe muy bien cómo responder.",
    why:
      "Hay una conversación pendiente en tu casa, y este libro la abre por vos. Sofía tiene siete años y dibuja mapas para no perderse cuando el mundo cambia. No es un libro sobre enfermedad: es una caja de herramientas emocionales para una familia entera.",
    excerpt:
      "“A veces tengo miedo. A veces estoy triste. A veces estoy enojada. Todas esas cosas están bien. Yo hago mapas mágicos. ¿Querés ver cómo?”",
    excerptCaption: "— Carta de Sofía",
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
    tagline:
      "Para quien descubre, demasiado tarde o justo a tiempo, que conoció a su padre solo en datos.",
    why:
      "Hay personas que se van sin avisar y dejan una bodega cerrada con candado. Este libro te entrega las llaves. Es un duelo, sí, pero también un puente: te recuerda lo que todavía podés decir, escuchar y heredar mientras hay tiempo.",
    excerpt:
      "“Cuarenta y siete años siendo su hijo. Había asumido, con la tranquilidad cómoda de quien no necesita preguntar, que siempre iba a haber tiempo.”",
    excerptCaption: "— Capítulo 1: La bodega",
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
    tagline: "Para quien todavía sonríe al escuchar el tono imaginario de un beeper.",
    why:
      "Es la novela que vas a querer leer un sábado en la tarde, con un café, mientras le mandás fotos viejas a alguien por WhatsApp. Una historia de juventud, malas decisiones gloriosas y la verdad que solo se entiende veinte años después.",
    excerpt:
      "“Nos prometimos todo, lo cual duró aproximadamente lo mismo que un helado en Puntarenas al mediodía.”",
    excerptCaption: "— Capítulo 1: El espejo del tiempo",
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

export type Question = {
  id: string;
  pacing: string;
  prompt: string;
  options: {
    label: string;
    hint?: string;
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
        weights: { ano: 2, ellos: 2 },
      },
      {
        label: "Una nostalgia bonita y traviesa",
        hint: "Pienso en quien fui antes de saber todo lo que sé hoy.",
        weights: { ellas: 3 },
      },
      {
        label: "El miedo de perder a alguien",
        hint: "Hay un nombre que cuento por las noches.",
        weights: { ano: 2, sofia: 2, ellos: 1 },
      },
      {
        label: "Ganas de vivir más despierto",
        hint: "Sospecho que me estoy perdiendo lo importante.",
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
        weights: { sofia: 3, ano: 1 },
      },
      {
        label: "Mi pareja y nuestra historia compartida",
        hint: "Tenemos años, fotos viejas y bromas privadas.",
        weights: { ellas: 2, ano: 1 },
      },
      {
        label: "El recuerdo de alguien que ya no está",
        hint: "A veces les hablo en voz baja.",
        weights: { ellos: 3 },
      },
      {
        label: "Yo conmigo mismo, en silencio",
        hint: "Es un capítulo más íntimo de lo habitual.",
        weights: { ano: 2, ellos: 1 },
      },
    ],
  },
  {
    id: "q3",
    pacing: "Si te pudieras llevar UNA cosa de un libro…",
    prompt: "¿Qué querrías llevarte al cerrar la última página?",
    options: [
      {
        label: "Las palabras que necesito decirle a alguien antes de que sea tarde",
        weights: { ellos: 3, ano: 1 },
      },
      {
        label: "Una forma de explicarle algo difícil a un niño",
        weights: { sofia: 3 },
      },
      {
        label: "Recordar quién era cuando todavía no sabía nada",
        weights: { ellas: 3 },
      },
      {
        label: "La certeza de que aún hay tiempo de cambiar",
        weights: { ano: 3 },
      },
    ],
  },
  {
    id: "q4",
    pacing: "Imaginá que abrís este libro esta noche.",
    prompt: "¿Cómo querés sentirte al cerrarlo?",
    options: [
      {
        label: "Acompañado, como si alguien me entendiera",
        weights: { ano: 2, ellos: 2 },
      },
      {
        label: "Con una sonrisa nostálgica",
        weights: { ellas: 3 },
      },
      {
        label: "Con herramientas reales para una conversación pendiente",
        weights: { sofia: 2, ellos: 2 },
      },
      {
        label: "Con ganas de llamar a alguien YA",
        weights: { ano: 2, ellos: 2, sofia: 1 },
      },
    ],
  },
  {
    id: "q5",
    pacing: "Última. La voz que más te llame: esa es tu libro.",
    prompt: "¿Cuál de estas frases te detiene un segundo más?",
    options: [
      {
        label: "“No es una historia sobre cáncer. Es sobre las páginas que decidimos leer.”",
        weights: { ano: 3 },
      },
      {
        label: "“A veces el enojo sale así. Como jugo derramado.”",
        weights: { sofia: 3 },
      },
      {
        label: "“Cuarenta y siete años siendo su hijo y nunca terminé de conocerlo.”",
        weights: { ellos: 3 },
      },
      {
        label: "“Nos prometimos amor eterno cuando todavía no sabíamos ni qué íbamos a estudiar.”",
        weights: { ellas: 3 },
      },
    ],
  },
];

export function scoreAnswers(answers: number[]): {
  winner: BookId;
  scores: Record<BookId, number>;
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
  return { winner, scores };
}
