```
 ██████╗ ██╗     ██╗████████╗ ██████╗██╗  ██╗██████╗ ██╗   ██╗███╗   ██╗
██╔════╝ ██║     ██║╚══██╔══╝██╔════╝██║  ██║██╔══██╗██║   ██║████╗  ██║
██║  ███╗██║     ██║   ██║   ██║     ███████║██████╔╝██║   ██║██╔██╗ ██║
██║   ██║██║     ██║   ██║   ██║     ██╔══██║██╔══██╗██║   ██║██║╚██╗██║
╚██████╔╝███████╗██║   ██║   ╚██████╗██║  ██║██║  ██║╚██████╔╝██║ ╚████║
 ╚═════╝ ╚══════╝╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
```

## Demo

 👾: https://glitchrun-beta.vercel.app

---

> Arcade runner 2D con estética pixel-art retro y ranking global Desarrollado con IA



![Version](https://img.shields.io/badge/version-0.8.2--STABLE-39FF14?style=flat-square&labelColor=080C08)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&labelColor=080C08)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&labelColor=080C08)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&labelColor=080C08)

---

## Descripción

GLITCHRUN es un runner 2D de scroll lateral infinito con estética cyberpunk y efectos glitch. El jugador controla un personaje pixel-art personalizable que debe esquivar obstáculos mientras la velocidad aumenta progresivamente. Incluye modo cooperativo, tres niveles de dificultad y tabla de ranking global persistida en Supabase.

**Estado actual:** MVP funcional — gameplay completo, leaderboard en la nube, galería de personajes comunitaria.

---

## Características

- **Gameplay** — Física de gravedad y salto, detección de colisiones AABB, dificultad progresiva
- **Dos modos** — SINGLE (un jugador) y COOP (dos jugadores en pantalla)
- **Tres dificultades** — EASY / NORMAL / HARD con velocidades y spawn rates distintos
- **Editor de sprites** — Cuadrícula 8×8 con paleta de 8 colores neón, 5 presets incluidos
- **Comunidad** — Publica tu personaje, explora los de otros jugadores y vota con likes
- **Leaderboard global** — Top 10 por modo, sincronizado con Supabase en tiempo real
- **Efectos visuales** — Scanlines, ghost layers, glitch shifts, respeta `prefers-reduced-motion`
- **Mobile-ready** — Controles táctiles, diseño responsive

---

## Stack

| Capa | Tecnología |
|------|-----------|
| UI Framework | React 19 + TypeScript 5.8 |
| Bundler | Vite 6.2 |
| Estilos | Tailwind CSS 4 |
| Renderizado | HTML5 Canvas 2D |
| Base de datos | Supabase (PostgreSQL) |
| Animaciones | Motion 12 |
| Iconos | Lucide React |

---

## Estructura del proyecto

```
src/
├── game/               # Motor del juego
│   ├── engine.ts       # Loop de actualización y lógica de obstáculos
│   ├── physics.ts      # Gravedad, salto, detección de colisiones
│   ├── renderer.ts     # Funciones de dibujo en Canvas
│   └── types.ts        # Interfaces de estado del juego
│
├── screens/            # Pantallas (navegación por estado)
│   ├── MenuScreen.tsx
│   ├── CreatorScreen.tsx
│   ├── GameOverScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── RecordInputScreen.tsx
│   └── InstructionsScreen.tsx
│
├── hooks/
│   ├── useGameLoop.ts  # requestAnimationFrame wrapper
│   └── useControls.ts  # Teclado + touch input
│
├── constants/
│   ├── colors.ts       # Paleta de colores + constantes físicas
│   └── presets.ts      # 5 sprites predefinidos
│
├── utils/
│   └── scoreStorage.ts # Operaciones CRUD sobre el leaderboard
│
└── lib/
    └── supabase.ts     # Cliente de Supabase
```

---

## Controles

| Acción | Teclado | Táctil |
|--------|---------|--------|
| Saltar | `SPACE` o `W` | Tap en pantalla |

En modo COOP, ambos jugadores comparten los mismos controles de salto.

---

## Base de datos (Supabase)

### `leaderboard`
```sql
id           UUID        -- PK
player_name  TEXT        -- Iniciales del jugador (3 caracteres)
score        BIGINT      -- Puntuación final
mode         TEXT        -- 'SINGLE' | 'COOP'
created_at   TIMESTAMP
```

### `characters`
```sql
id           UUID        -- PK
name         TEXT        -- Nombre del personaje
creator      TEXT        -- Nombre del creador
sprite_data  JSONB       -- Grid 8×8 (array de colores hex)
likes        BIGINT      -- Votos de la comunidad
created_at   TIMESTAMP
```

---

## Roadmap

- [x] Gameplay base (física, obstáculos, scoring)
- [x] Editor de sprites 8×8
- [x] Modo COOP
- [x] Leaderboard global (Supabase)
- [x] Galería comunitaria de personajes
- [ ] Integración con Gemini API (generación de niveles por texto)
- [ ] Sketch-to-Sprite (subir dibujo → sprite animado con IA)
- [ ] WebAR (escanear objetos reales → power-ups en juego)
- [ ] Pantalla de configuración
- [ ] Optimización mobile y deploy de producción

---

## Workflow de diseño

Este proyecto fue construido íntegramente con herramientas de IA, siguiendo un flujo de diseño asistido de principio a fin:

```
[1] Ideación       →  Stitch
                       Exploración inicial del concepto, estética y mecánicas del juego

[2] Research       →  NotebookLM
                       Análisis de referentes, patrones de diseño y benchmarking

[3] PRD            →  Claude
                       Síntesis del product requirements document a partir del research

[4] Wireframes     →  Claude
                       Diseño de flujos y layouts en formato ASCII

[5] Primer MVP     →  Google AI Studio
                       Prototipo funcional inicial para validar la mecánica core

[6] Producto final →  Antigravity + Claude Code
                       Desarrollo e iteración del producto completo
```

---

## Documentación

Documentación de diseño e implementación disponible en [`/docs`](./docs/):

- [`DESIGN.md`](./docs/DESIGN.md) — Sistema de diseño visual completo
- [`PRD_Runner2D_Resumen.md`](./docs/PRD_Runner2D_Resumen.md) — Product requirements
- [`IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md) — Plan técnico y fases
- [`WIREFRAMES.md`](./docs/WIREFRAMES.md) — Flujos y layouts de pantallas

---

## Licencia

Proyecto académico / experimental. Sin licencia de uso libre por el momento.
