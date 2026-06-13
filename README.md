# El libro que te está esperando

Una experiencia interactiva de menos de 3 minutos que recomienda al lector uno
de los cuatro libros de **Miguel Fuentes** según el momento de vida que está
atravesando.

## Los cuatro libros

| Libro | Tema central | Para quién |
| --- | --- | --- |
| **El año en que aprendí a vivir** | Crisis, presencia, despertar | Quien sospecha que se está perdiendo lo importante |
| **Los Mapas Mágicos de Sofía** | Conversaciones difíciles con niños | Familias con un ser querido enfermo |
| **Ellos en Nosotros** | Duelo, legado paterno | Quien no terminó de conocer a su padre |
| **Ellas y Nosotros** | Nostalgia, juventud, primeros amores | Quien todavía recuerda el tono de un beeper |

## Diseño de la experiencia

El flujo está construido sobre principios de **PNL aplicada al copywriting**
y de **investigación en marketing emocional** —no para manipular, sino para
respetar el tiempo del visitante:

- **Hero** con un *pattern interrupt*: una promesa concreta y un tiempo
  honesto ("menos de 3 minutos").
- **5 preguntas** con micro-pausas (*pacing*) que funcionan como *yes-set*,
  anclajes sensoriales y *future pacing*.
- **Resultado** con cita literal del libro (mirror neurons), justificación
  personalizada del match, y dos llamados a la acción de baja fricción:
  comprar o conversar con el autor.

No pide email, no rastrea, no spamea.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion
- Deploy en Vercel

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm start
```

## Personalización

- Las preguntas, ponderaciones y datos de cada libro viven en
  `src/lib/books.ts`.
- Los enlaces de compra (`cta.buyHref`) y el correo de contacto
  (`cta.talkHref`) deben actualizarse cuando estén disponibles los enlaces
  reales de Amazon / tienda y la dirección del autor.

---

© 2026 Miguel Fuentes. Todos los derechos reservados.
