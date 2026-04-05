# PRD Resumen — MVP Runner 2D Agéntico

## Visión general

Videojuego 2D tipo runner desarrollado con **Vibe Coding** (ingeniería agéntica), donde el desarrollador actúa como director creativo y delega la ejecución técnica a agentes de IA. El foco está en personalización profunda, generación procedimental y una capa de AR sin fricción.

---

## Objetivos del MVP

- **Velocidad de prototipado** → Ideas que toman semanas, ejecutadas en horas o días.
- **Personalización profunda** → El usuario es "El Creador" de su héroe y el mundo.
- **Jugabilidad garantizada** → Niveles 100% transitables gracias a generación procedimental.
- **AR sin fricción** → Realidad Aumentada basada en web, sin apps nativas.

---

## Funcionalidades core

### 1. Generación de Avatar (Sketch-to-Sprite)
Inspirado en *Drawn to Life*. El usuario dibuja su personaje y la IA lo anima.

- Acepta bocetos manuales escaneados o dibujos digitales simples.
- La IA identifica articulaciones y genera ciclos de animación: **Correr, Saltar y Caer**.
- Mantiene la identidad visual del dibujo en todos los fotogramas (*Identity Locking*).
- Exporta un **Sprite Sheet PNG transparente** listo para el motor de juego.

### 2. Generación Procedimental de Niveles (PCG)
Combina algoritmos y narrativa para crear niveles únicos y siempre completables.

- **Drunkard's Walk** → garantiza un camino ininterrumpido de inicio a meta.
- **Word2World** → el usuario describe el nivel en texto y la IA lo convierte en obstáculos y plataformas.
- Patrones de diseño aplicados: zonas seguras, foreshadowing y rutas con riesgo-recompensa (*branching*).

### 3. Construcción de Enemigos
- Estética consistente con el avatar del jugador.
- Comportamientos clásicos: patrulla, proyectiles, coordinados con el ritmo del nivel.

### 4. Interacción AR (WebAR)
Capa de Realidad Aumentada activada por marcadores de imagen, sin descarga de apps.

- Escanear un objeto real dispara eventos en el juego.
- Acciones posibles: desbloqueo de habilidades especiales y cambios de paleta de colores en tiempo real.
- Procesamiento de visión a ~1 FPS para activar lógica de juego desde el entorno físico.

---

## Flujo de trabajo agéntico

| Rol | Herramienta | Función |
|---|---|---|
| Arquitecto de contexto | Cursor / Claude Code | Reglas de arquitectura, físicas y memoria del proyecto (CLAUDE.md) |
| Diseñador de intención | Google Stitch | Estética visual y flujos de usuario por voz y texto |
| Productor de assets | PixelBox / Ludo.ai | Sprites animados a partir del dibujo del usuario |

---

## Criterios de éxito

- El avatar dibujado por el usuario se anima correctamente en el runner.
- Cada nivel generado es completable sin errores de colisión fatales.
- La interacción AR dispara al menos un evento lógico por sesión, sin app externa.

---

## Usuario objetivo

Adulto joven de **25 a 35 años**, fanático de los videojuegos retro. Creció con consolas y arcade clásicos. Valora la nostalgia, la estética pixel art, los retos de habilidad y la posibilidad de expresar su identidad dentro del juego. No busca gráficos fotorrealistas — busca que el juego se sienta **auténtico, divertido y suyo**.
