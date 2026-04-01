# CONTENT.md — GLITCHRUN Content System
## Sistema de Contenido · Español · v1.0

---

## 0. La voz de GLITCHRUN

GLITCHRUN no es un juego. Es un sistema que te encontró.

La voz del juego habla como una terminal que cobra vida — directa, técnica, con
humor seco y momentos de caos controlado. No grita. No suplica. Ejecuta.
Cuando algo sale mal, lo llama error. Cuando algo sale bien, lo registra.
Siempre en mayúsculas. Siempre con un guión bajo donde debería haber un espacio.

> La personalidad en una línea:
> **Un arcade de los 90s que aprendió a hablar solo y decidió que le gustas.**

---

## 1. Pilares de tono

### 1.1 Directo como un comando
Sin rodeos. Sin explicaciones de más. El juego sabe lo que hace
y asume que tú también.

```
✓  NIVEL_03.INICIANDO_
✗  "¡Prepárate para el nivel 3, es hora de jugar!"
```

### 1.2 El error como identidad
Los fallos no se lamentan — se registran, se nombran, se convierten en dato.
El tono nunca es condescendiente ante el error. Es neutro. Casi científico.

```
✓  ERROR_DETECTADO. INTENTO_004. REANUDANDO_
✗  "¡Ups! Inténtalo de nuevo, ¡tú puedes!"
```

### 1.3 Humor de sistema
El humor aparece en los detalles — un nombre de archivo inesperado,
un mensaje de error con personalidad, una instrucción que rompe la cuarta pared.
Nunca forzado. Siempre seco.

```
✓  CARGANDO_EXCUSAS.EXE — ERROR 404
✗  "¡Jajaja, casi lo logras!"
```

### 1.4 Nostalgia sin sentimentalismo
El juego sabe que creciste con un control en la mano.
Lo referencia. No lo explota. La nostalgia es un guiño, no un recurso.

```
✓  PROTOCOLO_ARCADE_ACTIVADO. BIENVENIDO_DE_VUELTA_
✗  "¡Revive los mejores momentos de tu infancia!"
```

### 1.5 El jugador como variable
El jugador no es "usuario" ni "gamer". Es una entidad dentro del sistema.
Una variable. Un proceso en ejecución.

```
✓  PLAYER_004 DETECTADO. CARGANDO_PERFIL_
✗  "Hola usuario, bienvenido al juego"
```

---

## 2. Reglas de escritura

### Formato base
- Todo en **MAYÚSCULAS** en textos de UI y títulos de contenido
- Guión bajo `_` reemplaza los espacios en nombres, estados y comandos
- Puntos como separadores de concepto: `DRAW IT. BREAK IT. RUN.`
- Números siempre con ceros a la izquierda: `NIVEL_03` · `000042`
- Los verbos de acción terminan en `.EXE`: `INICIAR.EXE` · `GAME_OVER.EXE`

### Puntuación
- Sin signos de exclamación. Nunca.
- Sin signos de pregunta en UI. Las preguntas se convierten en comandos.
- El punto final es opcional — el guión bajo `_` puede reemplazarlo
  para indicar que el sistema sigue ejecutando

### Longitud
- UI del juego: máximo 4 palabras por label
- Notificaciones en juego: máximo 1 línea
- Redes sociales: máximo 3 líneas de copy + hashtags
- Nunca un párrafo donde un comando alcance

---

## 3. Vocabulario oficial

### Palabras del sistema (usar siempre)

| En lugar de... | GLITCHRUN dice... |
|----------------|-------------------|
| Usuario / jugador | `PLAYER_` + número |
| Empezar / iniciar | `EJECUTAR_` · `INICIAR_` · `.EXE` |
| Error / fallo | `ERROR_` · `FALLO_DETECTADO_` |
| Nivel | `NIVEL_` + número con ceros |
| Puntos / score | `SCORE_` · valor con 6 dígitos |
| Morir / perder | `PROCESO_TERMINADO_` · `GAME_OVER.EXE` |
| Ganar / completar | `NIVEL_COMPLETADO_` · `MISIÓN.OK` |
| Cargar | `CARGANDO_` · `INICIALIZANDO_` |
| Guardar | `ESTADO_GUARDADO_` |
| Volver | `REGRESAR_` · `ESC_` |
| Nuevo | `NUEVO_PROTOCOLO_` · `v2.0` |
| Actualización | `PATCH_` · `UPDATE_DISPONIBLE_` |
| Comunidad | `RED_GLITCHRUN_` · `NODOS_ACTIVOS_` |
| Compartir | `TRANSMITIR_` · `EXPORTAR_` |
| Personalizar | `EDITAR_ENTIDAD_` · `CONFIGURAR_` |
| Dibujar | `CONSTRUIR_SPRITE_` · `DISEÑAR_` |

### Frases del sistema (usar como bloques)

```
DRAW IT. BREAK IT. RUN.          → tagline principal
YOU ARE THE GLITCH.               → tagline corto
SISTEMA_INICIADO_                 → apertura
PROCESO_EN_EJECUCIÓN_             → estado activo
ERROR_REGISTRADO_                 → fallo sin drama
IDENTIDAD_BLOQUEADA_              → personaje guardado
NIVEL_DESBLOQUEADO_               → progreso
EJECUTANDO_PROTOCOLO_ARCADE_      → momento nostálgico
TU_GLITCH_. TU_REGLA_.            → empoderamiento del jugador
BIENVENIDO_AL_CAOS_CONTROLADO_   → onboarding
```

---

## 4. Palabras y frases prohibidas

Estas palabras rompen la voz de GLITCHRUN. Nunca aparecen
en UI, redes sociales ni comunicaciones oficiales.

### Prohibidas en UI
| Prohibida | Por qué |
|-----------|---------|
| "¡Bienvenido!" | Demasiado genérico y cálido |
| "¡Inténtalo de nuevo!" | Condescendiente |
| "¡Muy bien!" | No existe el elogio vacío |
| "Usuario" | El jugador es una entidad, no un usuario |
| "Haz clic aquí" | El sistema no ruega |
| "Por favor" | El sistema no pide permiso |
| "¡Ups!" | El error es dato, no vergüenza |
| "¡Felicitaciones!" | Celebrar con exclamación rompe el tono |
| "Fácil" / "Difícil" como adjetivos | Usar `PROTOCOLO_BÁSICO_` / `PROTOCOLO_EXTREMO_` |
| "Juega ahora" | Usar `EJECUTAR_` o `INICIAR.EXE` |

### Prohibidas en redes sociales
| Prohibida | Por qué |
|-----------|---------|
| "¿Qué opinas?" | El sistema no pide validación |
| "Déjanos tu comentario" | Pasivo y genérico |
| "¡No te lo pierdas!" | FOMO forzado, no es el tono |
| "Contenido exclusivo" | Suena a marketing de corporación |
| "Síguenos para más" | El sistema no mendiga seguidores |
| Emojis de corazón, estrella o fuego | Rompen la estética terminal |
| Hashtags genéricos (#gaming #juegos) | Solo hashtags del universo GLITCHRUN |

### Emojis permitidos (con criterio, máximo 1 por post)
```
⌨_  →  acción de tipear / sistema activo
◼   →  pixel block / elemento de juego
▓   →  glitch / error visual
//  →  separador de sistema (en texto, no emoji)
```

---

## 5. Copy de UI del juego

### Pantalla de inicio
```
GLITCHRUN
SELECT_OPERATION_MODE_

[ SINGLE_PLAYER.EXE ]
[ COOPERATIVE.EXE   ]

P1: [W] PARA SALTAR
P2: [I] O [↑] PARA SALTAR
```

### Character creator
```
CHARACTER_CREATOR
CONSTRUYE_TU_ENTIDAD_

PLAYER_1 [W]          PLAYER_2 [I]/[↑]

PAINT_COLOR ›
DIFICULTAD ›   [ FÁCIL ] [ NORMAL ] [ EXTREMO ]

[ LIMPIAR ] [ ALEATORIO ] [ 001 ] [ 002 ] [ 003 ]

[ START_RUN.EXE ]
```

### HUD en juego
```
[HOME]   P1_SCORE          P2_SCORE          HIGH_SCORE
         000042            000015            000061
```

### Notificaciones en juego
```
NIVEL_COMPLETADO_               ← verde matrix
POWER_UP_ACTIVO · 10S_          ← cian
OBJETO_DETECTADO_               ← cian
GAME_OVER.EXE                   ← error rosa
NUEVO_RÉCORD_REGISTRADO_        ← ámbar
VELOCIDAD_AUMENTANDO_           ← deep teal
COOPERATIVE_MODE_ACTIVO_        ← matrix
PLAYER_2_ELIMINADO_             ← error rosa
```

### Pantalla de Game Over
```
GAME_OVER.EXE

SCORE_FINAL        000042
MEJOR_SCORE        000061

[ REINTENTAR       ]
[ MENÚ_PRINCIPAL   ]
```

### Pantalla de nivel completado
```
NIVEL_03.COMPLETE

TIEMPO      SCORE       VIDAS
01:24       042800      ♥ ♥ ♥

BONUS_VELOCIDAD: +500_

[ NIVEL_SIGUIENTE.EXE ]
```

### Opciones / settings
```
OPCIONES

AUDIO ──────────────────────────
MÚSICA          [■■■░░] ON
EFECTOS         [■■■■░] ON
VOLUMEN         [■■■░░] 60%

VISUAL ──────────────────────────
EFECTOS_GLITCH  [■■■■■] ON
SCANLINES       [■■░░░] ON
GHOST_LAYER     [■■■■░] ON

JUEGO ───────────────────────────
DIFICULTAD      [ NORMAL ]
CONTROLES       [ VER ]

[ VOLVER ]
```

---

## 6. Copy para redes sociales

### Formato base de post
```
[LÍNEA 1 — gancho en formato sistema]
[LÍNEA 2 — desarrollo o contexto]
[LÍNEA 3 — CTA en formato comando]

#GLITCHRUN #hashtag2 #hashtag3
```

### Hashtags oficiales
```
Siempre presentes:
#GLITCHRUN
#YouAreTheGlitch

Rotar según contenido:
#DrawItBreakItRun     → contenido de personaje
#PixelGlitch          → contenido visual / estética
#RetroRunner          → contenido de gameplay
#VibeCoding           → contenido de desarrollo
#PixelArt             → contenido de arte
#IndieGame            → contenido de lanzamiento
#RunnerGame           → contenido de mecánicas
```

### Ejemplos de posts listos

**Lanzamiento / anuncio:**
```
SISTEMA_INICIADO_
Dibuja tu personaje. Construye tu nivel. Corre.
GLITCHRUN está en ejecución.

#GLITCHRUN #YouAreTheGlitch #DrawItBreakItRun
```

**Contenido de gameplay:**
```
PLAYER_004 — INTENTO_017
El obstáculo no cambió. Tú sí.
EJECUTAR_DE_NUEVO.EXE

#GLITCHRUN #RetroRunner #PixelGlitch
```

**Contenido de personaje / character creator:**
```
IDENTIDAD_BLOQUEADA_
Tu sprite. Tu color. Tu glitch.
Nadie corre igual en GLITCHRUN.

#GLITCHRUN #DrawItBreakItRun #PixelArt
```

**Contenido de comunidad / cooperativo:**
```
COOPERATIVE_MODE.EXE — ACTIVADO
Dos entidades. Un solo nivel.
Solo uno sobrevive. O ninguno.

#GLITCHRUN #YouAreTheGlitch #RunnerGame
```

**Contenido de desarrollo / behind the scenes:**
```
BUILDING_GLITCHRUN_
100% herramientas de IA. 0% código manual.
El caos tiene un método.

#GLITCHRUN #VibeCoding #IndieGame
```

**Contenido de error / momento de fallo:**
```
ERROR_DETECTADO — INTENTO_023
No es un fallo. Es datos.
REANUDANDO_

#GLITCHRUN #YouAreTheGlitch #PixelGlitch
```

**Contenido de milestone / logro:**
```
NIVEL_10.COMPLETE
HIGH_SCORE_REGISTRADO_ 000842
TU_GLITCH_. TU_REGLA_.

#GLITCHRUN #RetroRunner #DrawItBreakItRun
```

**Contenido de AR:**
```
OBJETO_DETECTADO_
El mundo real activa el poder.
Escanea. Desbloquea. Corre.

#GLITCHRUN #YouAreTheGlitch #RunnerGame
```

---

## 7. Guía rápida de decisiones de tono

Ante cualquier texto nuevo, responde estas 3 preguntas:

```
1. ¿Parece escrito por un humano entusiasta?
   → Si la respuesta es SÍ, reescribir en formato sistema.

2. ¿Tiene signos de exclamación?
   → Si la respuesta es SÍ, eliminarlos todos.

3. ¿El jugador es el sujeto activo o el sistema lo nombra?
   → El sistema siempre nombra al jugador como PLAYER_ + número.
     El jugador nunca es "tú" en UI. Sí puede serlo en redes (con criterio).
```

---

*GLITCHRUN Content System · v1.0 · You are the glitch.*
