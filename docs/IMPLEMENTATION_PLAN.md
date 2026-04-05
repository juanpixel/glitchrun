# GLITCHRUN — Plan de Implementación
## Análisis técnico · Stack · Dependencias · Constraints · v1.0

---

## 1. Contexto del proyecto

GLITCHRUN es un runner 2D web con personalización de personaje por pixel art, generación de niveles con IA y una capa de realidad aumentada. Lo construye una sola persona en menos de un mes, usando herramientas de IA como principal palanca de velocidad. El output es una aplicación web responsive que funciona en desktop y mobile sin instalación.

---

## 2. Stack tecnológico recomendado

### Frontend — el juego
| Capa | Tecnología | Razón |
|---|---|---|
| Lenguaje | TypeScript | Tipado fuerte para el estado del juego y los sprites |
| Framework | React 18 | Manejo de pantallas (menu, creator, game, gameover) como estados |
| Canvas | HTML5 Canvas API | Loop del juego, sprites, física, colisiones |
| Animaciones UI | CSS @keyframes | Scanline, glitch shift, cursor blink |
| Bundler | Vite | Setup inmediato, HMR rápido, build optimizado |
| Estilos | CSS variables + módulos | Design tokens del DESIGN.md como variables CSS |

### IA — generación de niveles
| Función | Servicio | Razón |
|---|---|---|
| Generación de niveles por texto | Google AI Studio / Gemini API | Ya en el stack definido, gratis en tier inicial |
| Sketch-to-sprite | Gemini Vision | Convierte boceto subido a grid de píxeles |

### AR — realidad aumentada
| Función | Tecnología | Razón |
|---|---|---|
| Detección de imagen por cámara | MindAR.js o AR.js | WebAR sin app, funciona en navegador móvil |
| Acceso a cámara | MediaDevices API | Nativo del navegador, sin dependencias extra |

### Deploy e infraestructura
| Capa | Servicio | Razón |
|---|---|---|
| Hosting | Vercel o GitHub Pages | Deploy en segundos, gratis, HTTPS automático |
| Assets | Sin CDN por ahora | Los sprites son arrays TypeScript, no imágenes externas |
| Storage local | localStorage | Guardar personaje del jugador y mejor score |

---

## 3. Arquitectura de la aplicación

```
src/
├── main.tsx                  ← entrada, monta React
├── App.tsx                   ← router de pantallas (estado global)
├── store/
│   └── gameStore.ts          ← estado global: pantalla activa, sprite, score
├── constants/
│   ├── colors.ts             ← tokens del DESIGN.md
│   └── players.ts            ← ROSTER de sprites (grids TypeScript)
├── screens/
│   ├── MenuScreen.tsx        ← pantalla principal
│   ├── CreatorScreen.tsx     ← pixel grid creator
│   ├── GameScreen.tsx        ← canvas del juego
│   └── GameOverScreen.tsx    ← resultado y reinicio
├── game/
│   ├── loop.ts               ← requestAnimationFrame, update + render
│   ├── physics.ts            ← salto, gravedad, colisiones AABB
│   ├── obstacles.ts          ← spawn, scroll, tipos
│   ├── renderer.ts           ← todas las funciones de dibujo en canvas
│   └── sprite.ts             ← renderiza grid de píxeles como sprite animado
├── components/
│   ├── PixelGrid.tsx         ← grid interactivo del character creator
│   ├── SpritePreview.tsx     ← preview animado del personaje
│   ├── HUD.tsx               ← overlay del juego (score, vidas, nivel)
│   └── NotificationChip.tsx  ← chips de sistema (level up, game over)
├── hooks/
│   ├── useGameLoop.ts        ← hook que arranca y limpia el loop
│   ├── useControls.ts        ← teclado + touch
│   └── useAR.ts              ← acceso a cámara y detección (fase 3)
├── ar/
│   └── arTrigger.ts          ← lógica WebAR (fase 3)
└── styles/
    ├── tokens.css            ← variables CSS del design system
    └── global.css            ← reset + tipografía base
```

---

## 4. Dependencias

### Dependencias de producción
| Paquete | Versión | Para qué |
|---|---|---|
| `react` | 18.x | Framework UI |
| `react-dom` | 18.x | Render en el DOM |
| `typescript` | 5.x | Tipado |

### Dependencias de desarrollo
| Paquete | Versión | Para qué |
|---|---|---|
| `vite` | 5.x | Bundler y dev server |
| `@vitejs/plugin-react` | 4.x | Soporte JSX/TSX |
| `@types/react` | 18.x | Tipos de React |

### Dependencias de fase 3 (AR)
| Paquete | Versión | Para qué |
|---|---|---|
| `mind-ar` | 1.x | WebAR por marcadores de imagen |

### APIs externas
| API | Autenticación | Para qué |
|---|---|---|
| Gemini API (Google AI Studio) | API Key en `.env` | Generación de niveles por texto y sketch-to-sprite |
| MediaDevices API | Permiso del navegador | Feed de cámara para AR |

### Sin dependencias de base de datos
En el MVP no hay backend ni base de datos. Todo el estado del jugador vive en `localStorage`. Si en el futuro se añaden scores globales o cuentas de usuario, se evalúa Supabase o Firebase.

---

## 5. Plan de implementación por fases

### Fase 1 — Core gameplay (Semana 1)
**Objetivo:** el juego corre, el personaje salta, los obstáculos matan.

| Tarea | Entregable | Herramienta |
|---|---|---|
| Setup Vite + React + TypeScript | Proyecto corriendo en localhost | Terminal |
| Tokens de color en CSS variables | `tokens.css` con el DESIGN.md | Claude |
| Game loop con requestAnimationFrame | `loop.ts` funcional | Google AI Studio |
| Render del personaje desde grid array | `sprite.ts` con animación 4 frames | Google AI Studio |
| Física: salto + gravedad | `physics.ts` | Google AI Studio |
| Scroll de obstáculos + colisión AABB | `obstacles.ts` | Google AI Studio |
| HUD básico: score + vidas | `HUD.tsx` | Claude |
| Pantalla Game Over con reinicio | `GameOverScreen.tsx` | Claude |
| Controles: teclado + tap | `useControls.ts` | Google AI Studio |

**Criterio de éxito:** el juego es jugable de inicio a fin en desktop y mobile.

---

### Fase 2 — Pantallas completas (Semana 2)
**Objetivo:** flujo completo de pantallas con identidad visual.

| Tarea | Entregable | Herramienta |
|---|---|---|
| Main menu con sprite rotante | `MenuScreen.tsx` | Claude + Cursor |
| Pixel grid creator interactivo | `PixelGrid.tsx` + `CreatorScreen.tsx` | Google AI Studio |
| Preview del personaje en tiempo real | `SpritePreview.tsx` | Claude |
| Paleta de colores + swatches | integrado en `CreatorScreen` | Claude |
| Presets de forma (Round, Square, Tall) | arrays de grids en `players.ts` | Ya definido |
| Guardar personaje en localStorage | `gameStore.ts` | Claude |
| Efectos glitch: scanline + ghost layer | CSS + canvas render | Claude |
| Notificación chip animada | `NotificationChip.tsx` | Claude |
| Responsive: mobile layout | CSS media queries + touch controls | Claude |

**Criterio de éxito:** el jugador puede crear su personaje, jugar y ver su score final.

---

### Fase 3 — IA + AR (Semana 3)
**Objetivo:** generación de niveles con texto y capa de AR básica.

| Tarea | Entregable | Herramienta |
|---|---|---|
| Integración Gemini API | `geminiClient.ts` con fetch a la API | Google AI Studio |
| Prompt de generación de nivel | Input de texto → array de obstáculos | Google AI Studio |
| Parser de respuesta de IA a obstáculos | `levelParser.ts` | Claude |
| Sketch-to-sprite: subir imagen | Input file → llamada a Gemini Vision | Google AI Studio |
| Convertir respuesta a grid 16x16 | integrado en `CreatorScreen` | Claude |
| Integración MindAR.js | `arTrigger.ts` + `useAR.ts` | Docs MindAR |
| Overlay de cámara en juego | `AROverlay.tsx` | Claude |
| Trigger: detectar objeto → power-up | evento en `gameStore.ts` | Claude |

**Criterio de éxito:** el jugador puede describir un nivel en texto, subirlo y activar un power-up escaneando un objeto real.

---

### Fase 4 — Pulido y deploy (Semana 4)
**Objetivo:** el juego está online, estable y documentado.

| Tarea | Entregable | Herramienta |
|---|---|---|
| Optimización del game loop | delta time consistente a 60fps | Claude |
| Mejor score en localStorage | persiste entre sesiones | Claude |
| Pantalla de opciones (audio/visual) | `OptionsScreen.tsx` | Claude |
| Level editor manual básico | `LevelEditor.tsx` simplificado | Google AI Studio |
| Pruebas en iOS Safari y Android Chrome | lista de bugs mobile | Manual |
| `prefers-reduced-motion` | desactiva glitch shifts y scanlines | Claude |
| Build de producción + Vite config | `vite.config.ts` optimizado | Terminal |
| Deploy en Vercel | URL pública funcional | Vercel CLI |
| README del proyecto | documentación para portafolio | Claude |

**Criterio de éxito:** el juego está publicado en una URL, funciona en mobile sin errores y tiene una URL lista para compartir.

---

## 6. Constraints del proyecto

### Constraints técnicos
| Constraint | Impacto | Mitigación |
|---|---|---|
| Un solo desarrollador | Velocidad limitada | Delegar toda la generación de código a IA |
| Menos de 1 mes | Alcance acotado | Priorizar gameplay sobre features secundarias |
| Sin backend | No hay scores globales ni cuentas | localStorage para MVP, evaluar Supabase post-MVP |
| WebAR en iOS Safari | Restricciones de cámara en Safari | Testear temprano en semana 3, tener fallback |
| Gemini API gratis | Rate limits y latencia | Cachear respuestas de nivel generado, no llamar en tiempo real |
| Canvas 2D solo | Sin WebGL | Suficiente para pixel art 2D, no es un constraint real |
| Sin assets externos | Todo en código | Los sprites como arrays TypeScript, sin PNG externos |

### Constraints de diseño
| Constraint | Regla |
|---|---|
| Todo monospace | Sin excepciones tipográficas |
| Sin gradientes ni blur | Profundidad solo con color plano |
| Sin border-radius en canvas | Pixel art puro |
| Máximo 2 colores neón por vista | No saturar la pantalla |
| Scores en 6 dígitos | Siempre ceros a la izquierda |

### Riesgos identificados
| Riesgo | Probabilidad | Plan B |
|---|---|---|
| AR no funciona en mobile | Media | Desactivar AR en mobile, solo desktop |
| Gemini API con latencia alta | Media | Spinner con mensaje "GENERANDO_" + timeout de 10s |
| Pixel grid creator complejo de implementar | Alta | Usar presets fijos en MVP, grid completo en semana 2 |
| Game loop no corre a 60fps en mobile | Baja | Cap a 30fps con delta time ajustado |
| Scope creep (querer agregar más) | Alta | Respetar el plan de fases, lo extra va a una lista futura |

---

## 7. Orden de implementación recomendado

El criterio es simple: primero lo que hace que el juego sea jugable, después lo que lo hace único.

```
Semana 1  →  Juego funciona (loop + física + colisión + score)
Semana 2  →  Juego se ve como GLITCHRUN (visual + creator + pantallas)
Semana 3  →  Juego sorprende (IA + AR)
Semana 4  →  Juego está en internet (deploy + pulido + docs)
```

No avanzar a la siguiente semana sin que la anterior tenga criterio de éxito cumplido. Si una tarea se traba más de 2 horas, pasarla a IA y continuar con la siguiente.

---

## 8. Herramientas por tipo de tarea

| Tipo de tarea | Herramienta principal |
|---|---|
| Lógica del juego (loop, física, colisión) | Google AI Studio + Gemini 2.5 Pro |
| Componentes React + UI | Claude |
| CSS y efectos visuales | Claude |
| Integración de APIs externas | Google AI Studio |
| Decisiones de arquitectura | Claude |
| Debugging de canvas | Cursor |
| Deploy y configuración | Terminal + Vercel CLI |
| Documentación | Claude |

---

*GLITCHRUN Implementation Plan · v1.0 · Solo dev · menos de 1 mes · You are the glitch.*
