# WIREFRAMES.md — GLITCHRUN
## ASCII Wireframes · v1.0

---

## P-01 · PANTALLA DE INICIO

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [HOME]          P1_SCORE          P2_SCORE                          HIGH_SCORE   │
│                 000020            000000                            000061        │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                        G L I T C H R U N                                        │
│                                                                                  │
│                       SELECT_OPERATION_MODE_                                     │
│                                                                                  │
│                                                                                  │
│                    ┌──────────────────────────────┐                              │
│                    │      SINGLE_PLAYER.EXE       │                              │
│                    └──────────────────────────────┘                              │
│                                                                                  │
│                    ┌──────────────────────────────┐                              │
│                    │       COOPERATIVE.EXE        │                              │
│                    └──────────────────────────────┘                              │
│                                                                                  │
│                                                                                  │
│                          P1: [W] TO JUMP                                         │
│                          P2: [I] OR [UP] TO JUMP                                 │
│                                                                                  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Notas:**
- HUD superior siempre visible con scores de ambos jugadores y high score
- `[HOME]` es un botón que lleva al menú principal
- Los scores inician en `000000` y persisten en `localStorage`
- `SINGLE_PLAYER.EXE` → va a creación de personaje individual
- `COOPERATIVE.EXE` → va a creación de personaje grupal
- Instrucciones de controles siempre visibles al pie

---

## P-02 · CREACIÓN DE PERSONAJE · MODO INDIVIDUAL

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                                                                                  │
│                            CHARACTER_CREATOR                                     │
│                                                                                  │
│              PLAYER_1 [W]                                                        │
│            ┌─────────────────────┐         ┌──────────────────────────────────┐  │
│            │ ░ ░ █ ░ ░ █ ░ ░    │         │                                  │  │
│            │ ░ ░ █ ░ █ ░ ░ ░    │         │  PAINT_COLOR                     │  │
│            │ ░ █ █ █ █ █ █ ░    │         │                                  │  │
│            │ █ █ ░ █ ░ █ █ █    │         │  [■] [■] [■] [■]                 │  │
│            │ █ █ █ █ █ █ █ █    │         │  [■] [■] [■] [■]                 │  │
│            │ █ █ ░ █ ░ █ █ █    │         │                                  │  │
│            │ █ █ █ █ █ █ █ █    │         │  DIFFICULTY                      │  │
│            │ █ ░ █ █ █ █ ░ █    │         │                                  │  │
│            │ ░ █ █ █ █ █ █ ░    │         │  [  EASY  ] [NORMAL] [  HARD  ]  │  │
│            │ ░ █ ░ █ █ ░ █ ░    │         │                                  │  │
│            │ ░ ░ █ █ █ █ ░ ░    │         │                                  │  │
│            └─────────────────────┘         │  ┌──────────────────────────┐   │  │
│                                            │  │      START_RUN.EXE       │   │  │
│  [CLEAR] [RANDOM] [001] [002] [003]        │  └──────────────────────────┘   │  │
│           [004] [005]                      │                                  │  │
│                                            └──────────────────────────────────┘  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Notas:**
- Grid de pintura: 8×8 celdas clickeables (MVP) o 16×16 (versión completa)
- Celda vacía `░` = `#0D1A0D` · Celda pintada `█` = color seleccionado
- Borde del grid en `#39FF14` cuando activo
- `PAINT_COLOR` → 8 swatches de colores de la paleta del juego, el activo tiene borde `#39FF14`
- `DIFFICULTY` → toggle de 3 estados: EASY / NORMAL / HARD
- Presets: `CLEAR` limpia el grid · `RANDOM` genera figura aleatoria · `001–005` carga personajes predefinidos
- `START_RUN.EXE` confirma el personaje e inicia el gameplay

---

## P-03 · CREACIÓN DE PERSONAJE · MODO COOPERATIVO

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [HOME]          P1_SCORE          P2_SCORE                                       │
│                 000020            000000                                          │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                                                                                  │
│                            CHARACTER_CREATOR                                     │
│                                                                                  │
│      PLAYER_1 [W]                              PLAYER_2 [I] / [UP]               │
│    ┌─────────────────────┐                   ┌─────────────────────┐             │
│    │ ░ ░ █ ░ ░ █ ░ ░    │                   │ ░ ░ ░ ░ ░ ░ ░ ░    │             │
│    │ ░ ░ █ ░ █ ░ ░ ░    │                   │ ░ ░ █ █ █ █ ░ ░    │             │
│    │ ░ █ █ █ █ █ █ ░    │                   │ ░ █ █ █ █ █ █ ░    │             │
│    │ █ █ ░ █ ░ █ █ █    │                   │ █ █ █ ░ ░ █ █ █    │             │
│    │ █ █ █ █ █ █ █ █    │                   │ █ █ ░ █ █ ░ █ █    │             │
│    │ █ █ ░ █ ░ █ █ █    │                   │ █ █ █ █ █ █ █ █    │             │
│    │ █ █ █ █ █ █ █ █    │                   │ ░ █ █ ░ ░ █ █ ░    │             │
│    │ █ ░ █ █ █ █ ░ █    │                   │ ░ ░ █ ░ ░ █ ░ ░    │             │
│    └─────────────────────┘                   └─────────────────────┘             │
│                                                                                  │
│  [CLEAR][RANDOM][001][002][003][004][005]   [CLEAR][RANDOM][001][002][003][004]  │
│                                                                                  │
│                    ┌──────────────────────────────────────┐                      │
│                    │           START_RUN.EXE              │                      │
│                    └──────────────────────────────────────┘                      │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Notas:**
- Dos grids independientes lado a lado, uno por jugador
- `PLAYER_1` usa tecla `[W]` para saltar · `PLAYER_2` usa `[I]` o `[UP]`
- Cada grid tiene su propia barra de presets y colores debajo
- Los colores de cada jugador son independientes — no se comparten
- El borde del grid de P1 en `#39FF14` · el de P2 en `#00FFFF` para diferenciarlos
- `START_RUN.EXE` único y centrado — inicia el juego con ambos personajes confirmados
- En mobile: los grids se apilan verticalmente

---

## P-04 · GAMEPLAY · MODO RUNNER

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [HOME]    P1_SCORE                                                   HIGH_SCORE  │
│           000013                                                     000061      │
├──────────────────────────────────────────────────────────────────────────────────┤
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│[P1]· · · · · · · · · · · · · · · ·[■]· · · · · · · · · ·[■]· · · · · · · · · │
├──────────────────────────────────────────────────────────────────────────────────┤
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Leyenda del canvas:**
```
·     pixel grid de fondo (#1a2e1a, opacity 0.15)
[P1]  sprite del jugador (pixel art del personaje creado)
[■]   obstáculo tipo wall (#FF2D6B)
▓▓▓   suelo (#1D9E75, 12px alto)
```

**Notas:**
- El personaje `[P1]` corre automaticamente desde el extremo izquierdo
- Los obstáculos `[■]` aparecen desde la derecha y se mueven hacia la izquierda
- La velocidad aumenta progresivamente con el score
- `[W]` → saltar P1 · `[I]` o `[UP]` → saltar P2 (en modo cooperativo)
- HUD superior: `[HOME]` + `P1_SCORE` a la izquierda · `HIGH_SCORE` a la derecha
- En modo cooperativo P2_SCORE aparece junto a P1_SCORE en el HUD
- Al chocar → transición inmediata a GAME OVER

---

## P-04B · GAMEPLAY · MODO COOPERATIVO

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [HOME]    P1_SCORE       P2_SCORE                                   HIGH_SCORE  │
│           000020         000015                                      000061      │
├──────────────────────────────────────────────────────────────────────────────────┤
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│ · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · │
│[P1][P2]· · · · · · · · · · · · ·[■]· · · · · · · · · · · ·[■]· · · · · · · · │
├──────────────────────────────────────────────────────────────────────────────────┤
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Notas modo cooperativo:**
- Ambos personajes corren juntos en el mismo canvas
- `[P1]` y `[P2]` comparten los mismos obstáculos
- El juego termina cuando **ambos** jugadores chocan
- Si solo uno choca, continúa con el jugador vivo
- El score se calcula individual por jugador
- El HIGH_SCORE se guarda como el mejor score combinado

---

## P-05 · GAME OVER

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [HOME]    P1_SCORE                                                   HIGH_SCORE  │
│           000042                                                     000061      │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                         G A M E _ O V E R . E X E                               │
│                                                                                  │
│                              [sprite disuelto]                                   │
│                                                                                  │
│                          SCORE FINAL                                             │
│                          000042                                                  │
│                                                                                  │
│                          MEJOR SCORE                                             │
│                          000061                                                  │
│                                                                                  │
│                                                                                  │
│              ┌──────────────────────────────────────────┐                        │
│              │               REINTENTAR                 │                        │
│              └──────────────────────────────────────────┘                        │
│                                                                                  │
│              ┌──────────────────────────────────────────┐                        │
│              │             MENÚ PRINCIPAL               │                        │
│              └──────────────────────────────────────────┘                        │
│                                                                                  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Notas:**
- `GAME_OVER.EXE` en `--error` (#FF2D6B) con glitch shift continuo
- El sprite del jugador hace pixel dissolve en loop de 1.5s
- Si `SCORE FINAL` > `MEJOR SCORE`: el número pulsa en `--amber` (#FAC775)
- `REINTENTAR` → reinicia el gameplay manteniendo el mismo personaje
- `MENÚ PRINCIPAL` → vuelve a P-01 y resetea todo el estado

---

*GLITCHRUN Wireframes · v1.0 · You are the glitch.*
