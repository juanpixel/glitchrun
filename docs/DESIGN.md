# GLITCHRUN — Pixel Glitch Runner
## North Star: "El error como identidad"
Arcade retro de los 80s y 90s corrompido por el glitch. Fondos negros profundos con acentos neón matrix. Caótico pero legible. Cada elemento puede fragmentarse, duplicarse o desplazarse — y eso es intencional.

---

## Colors
- **Primary (`#39FF14`):** Verde matrix neón — CTAs, highlights activos, score, texto principal del juego.
- **Secondary (`#1D9E75`):** Verde profundo — labels, bordes sutiles, textos secundarios de HUD.
- **Glitch (`#00FFFF`):** Cian eléctrico — ghost layers, efectos de glitch, interacciones AR, acentos de error visual.
- **Error (`#FF2D6B`):** Rosa-rojo — enemigos, estados de fallo, alertas críticas, íconos de vida.
- **Amber (`#FAC775`):** Ámbar cálido — coleccionables, power-ups, bonuses, rewards.
- **Background (`#080C08`):** Negro con subtono verde. Fondo base de toda la interfaz.
- **Surface (`#0D1A0D`):** Verde muy oscuro — superficies elevadas: cards, modales, paneles.
- **Border (`#1a2e1a`):** Verde carbón — bordes, separadores, líneas de grid.
- Los colores neón son acentos únicamente. Nunca usarlos en superficies grandes.
- `--error` reservado exclusivamente para enemigos y estados críticos. No decorativo.
- `--amber` solo para objetos que el jugador puede recoger o rewards. No decorativo.

---

## Glitch Effects (Core Pattern)
- **Ghost layer:** Duplicado del elemento desplazado +4px en X, color `--glitch`, `opacity: 0.25–0.45`. Se aplica sobre texto, sprites y botones en hover o durante eventos de glitch.
- **Glitch shift:** El elemento original se mueve ±3–4px en X durante 80–120ms con un ghost cian simultáneo. Ocurre aleatoriamente cada 3–5s o en transiciones.
- **Scanline:** Línea de 1–2px que recorre verticalmente la pantalla en loop de 2–3s. Color `--matrix` o `--glitch`, `opacity: 0.06–0.10`. Siempre presente en fondos y modales.
- **Pixel dissolve:** El elemento desaparece por bloques de 4px durante 200–400ms. Usado en game over, transiciones de nivel y eliminación de enemigos.
- **Blink cursor:** El carácter `_` parpadea con `animation: blink 1s step-end infinite`. Indica sistema activo o esperando input del jugador.
- Los glitch shifts nunca ocurren sobre texto que el usuario está leyendo activamente.
- Los efectos no superan 3 flashes por segundo (regla de accesibilidad).
- Todas las animaciones respetan `prefers-reduced-motion`: glitch shifts desactivados, scanlines ocultas.

---

## Typography
- **Display / Títulos:** `monospace` system — 48–64px web, 32–40px mobile, `font-weight: 700`, `letter-spacing: 8–12px`, siempre `uppercase`. Para nombres de juego, pantallas de game over y level complete.
- **Headings:** `monospace` — 24–32px, `font-weight: 700`, `letter-spacing: 4–6px`, `uppercase`. Para títulos de sección y nombres de pantalla.
- **UI / Body:** `monospace` — 13–16px, `font-weight: 400`, `letter-spacing: 2px`, `uppercase`. Para botones, labels, instrucciones y textos de interfaz.
- **Score / Data:** `monospace` — 18–24px web, 16px mobile, `font-weight: 700`, `letter-spacing: 2px`. Scores siempre en 6 dígitos con ceros a la izquierda (`042800`). Nivel y vidas en 2 dígitos (`03`).
- **Caption:** `monospace` — 10–12px, `letter-spacing: 3px`, `uppercase`. Para metadatos, versiones y etiquetas de sistema.
- Todo el proyecto usa exclusivamente `monospace`. Sin excepciones. Es la identidad tipográfica.
- Solo dos pesos: `400` regular y `700` bold. Nunca 500, 600 ni 800.
- `letter-spacing` mínimo de 2px en cualquier texto visible.
- Los textos del HUD en juego siempre alineados al borde (izquierda o derecha). Nunca centrados.

---

## Elevation
- Sin `box-shadow` tradicional. Sin `blur`. La profundidad se construye con capas de color plano.
- Jerarquía de superficie por color: `--void` (base) → `--void-2` (superficie elevada) → `--void-3` (borde).
- El canvas del juego tiene 6 capas explícitas de atrás hacia adelante: fondo con grid → elementos lejanos → plataformas y obstáculos → sprite del jugador → efectos de partículas → HUD.
- Los modales y overlays usan `--void-2` como fondo y `--void-3` como borde, con el canvas del juego congelado a `opacity: 0.3` detrás.
- El pixel grid de fondo (`32×32px`, `--void-3`, `opacity: 0.15–0.18`) da profundidad sin añadir peso visual.

---

## Components

### Buttons
Fondo `--void-2`, borde `0.5px solid --deep`, texto `--matrix`, `font-weight: 700`, `letter-spacing: 4px`, `uppercase`. Sin `border-radius` — esquinas rectas siempre.
- **Hover:** Ghost layer activo sobre el texto (+4px cian, `opacity: 0.35`), borde cambia a `--matrix`.
- **Active / Pressed:** Inversión completa — fondo `--matrix`, texto `--void`.
- **Disabled:** Todo en `--void-3`, `opacity: 0.4`, sin interacción.
- Tamaños: `btn-lg` 48px alto (web), `btn-md` 40px (ambos), `btn-sm` 32px (mobile / HUD).

### Cards y Panels
Fondo `--void-2`, borde `0.5px solid --void-3`. Sin `border-radius` en elementos del juego. `border-radius: 4px` solo en UI pura (modales, panels de configuración).
- Borde activo o en hover: `0.5px solid --deep`.
- Borde de error o crítico: `0.5px solid --error`.
- Los paneles de HUD usan `background: rgba(8, 12, 8, 0.85)` — plano, sin blur.

### Inputs
Fondo `--void-2`, borde `0.5px solid --deep` en reposo, `0.5px solid --matrix` en focus. Texto `--matrix`, placeholder `--void-3`. Cursor blink `_` activo mientras el campo tiene focus.
- Height web: 44px. Height mobile: 48px (thumb friendly).
- Error: borde `--error`, label de error en `--error` 11px debajo del campo.
- Sin `border-radius`.

### HUD (Heads-Up Display)
Barra fija en la parte superior. Altura 40px web, 36px mobile. Fondo `rgba(8,12,8,0.85)`, borde inferior `0.5px solid --void-3`.
- Contenido web: player tag izquierda → score centro-izq → nivel centro-der → vidas derecha.
- Contenido mobile: score izquierda, nivel centro, vidas derecha. Todo comprimido en una línea.
- Fade a `opacity: 0.2` cuando el sprite del jugador entra en la zona superior del canvas.
- Los valores de score tienen micro-animación `+pts` en `--matrix` al sumar puntos.

### Pixel Sprites
Construidos con bloques de 4×4px. Ciclo de animación de 4 frames a 3fps via `requestAnimationFrame`.
- Color del cuerpo: variable `--player-color` (definida por el jugador en el character creator).
- Color de ojos / acento: variable `--player-accent`.
- Ghost layer siempre activo durante transiciones de nivel y cambios de personaje.
- El logo del juego muestra sprites de distintos jugadores rotando cada segundo para comunicar que cada jugador es único.

### Platform Tiles y Obstacles
Bloques de 4px base. Sin `border-radius`.
- Plataforma sólida: `--deep`. Peligrosa: `--error`. Rebote: `--amber`. Traversable: `--glitch` `opacity: 0.5`.
- Spikes: `--error`. Walls: `--deep` o `--void-2`. Obstáculos en movimiento: ghost layer `--glitch` activo.

### Notification Chips
Borde izquierdo de 2px en el color semántico del evento. Fondo `--void-2`. Texto del mismo color que el borde. Slide-in desde arriba 200ms. Auto-desaparece a los 2.5s con fade-out 300ms. Solo uno visible a la vez.
- Nivel completado: `--matrix`. Game over: `--error`. Power-up: `--glitch`. Coleccionable: `--amber`.

### Toggle Switches
Pixel-style. Sin `border-radius`. Thumb cuadrado. Fill `--matrix` cuando activo, `--void-3` cuando inactivo.

---

## Spacing & Grid
- **Web:** Grid de 12 columnas, gutter 16px, max-width 1280px.
- **Mobile:** Grid de 4 columnas, gutter 12px, max-width 390px.
- **Pixel grid del juego:** Base de 4px. Todos los elementos del canvas en múltiplos de 4px.
- Escala de espaciado: 4 · 8 · 12 · 16 · 24 · 32 · 48px.

---

## Screen Map

| Pantalla          | Layout                          | Componentes clave                          |
|-------------------|---------------------------------|--------------------------------------------|
| Main menu         | Centrado vertical, dos zonas    | Sprite rotante, 3 botones, scanline        |
| Character creator | Dos columnas (preview + config) | Sprite en vivo, swatches, toggles          |
| Level editor      | Sidebar + canvas                | Input IA con cursor blink, palette blocks  |
| Gameplay          | Full screen + HUD fijo top      | Canvas 6 capas, HUD, controles táctiles    |
| Pause             | Overlay sobre canvas congelado  | Modal, 3 botones, scanline                 |
| Game over         | Full screen reemplaza canvas    | GAME_OVER.EXE con glitch shift continuo    |
| Level complete    | Full screen overlay             | Métricas con stagger, bonus --amber        |
| Options           | Centrado, scroll vertical       | Toggles, secciones audio / visual / juego  |
| AR overlay        | Overlay sobre gameplay activo   | Feed cámara, marco de escaneo, chip evento |

---

## Rules
- Máximo 2 colores neón por vista. El texto principal siempre en `--matrix` o `--deep`, nunca todos los acentos a la vez.
- Neón sobre oscuro únicamente. Nunca sobre fondos claros.
- Los glitch effects se animan en interacción o transición, no en reposo continuo — excepto la scanline y el cursor blink.
- `border-radius: 0` en todo elemento del canvas del juego. `border-radius: 4px` solo en UI pura.
- Sin gradientes. Sin box-shadow. Sin backdrop-filter blur. La profundidad es siempre color plano.
- Todo el texto en `uppercase` y `monospace`. Sin excepciones.
- Scores siempre con 6 dígitos (`042800`). Niveles y vidas siempre con 2 dígitos (`03`).
- `--error` y `--amber` son semánticos y estrictos — nunca decorativos.

---

*GLITCHRUN Design System · v1.0 · You are the glitch.*
