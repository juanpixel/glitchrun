# GLITCHRUN: Plan de Implementación Detallado
## Análisis Técnico, Stack, Dependencias y Constraints · v1.1

Este documento define el camino crítico para la construcción de **GLITCHRUN**, un runner 2D "glitch-themed" con personalización agéntica y WebAR.

---

### 1. Stack Tecnológico (Core)

Para maximizar la velocidad de ejecución y la compatibilidad en navegadores móviles (sin apps), se ha seleccionado el siguiente stack:

| Capa | Tecnología | Razón |
| :--- | :--- | :--- |
| **Framework** | **Vite + React 18** | Setup ultra-rápido, HMR eficiente y manejo de UI declarativo. |
| **Lenguaje** | **TypeScript** | Crucial para manejar el estado del juego, coordenadas y tipos de sprites sin errores. |
| **Motor Gráfico** | **HTML5 Canvas API** | Control absoluto sobre cada píxel. Permite efectos de glitch manuales y alto rendimiento en mobile. |
| **Estilos** | **CSS Nativo (Variables)** | Implementación directa del sistema de diseño (DESIGN.md) sin capas de abstracción innecesarias. |
| **IA (Backend-less)** | **Gemini API** | Multimodal para procesar bocetos (Sketch-to-Sprite) y Gemini Pro para generar niveles (Word2World). |
| **AR (Browser-based)** | **MindAR.js** | La mejor opción para WebAR con marcadores de imagen en 2024. |

---

### 2. Dependencias del Proyecto

#### 2.1 Dependencias de Producción (`dependencies`)
- **`react`, `react-dom`**: Interfaz de usuario y manejo de estados globales.
- **`mind-ar`**: Motor de Realidad Aumentada para detección de marcadores.
- **`gemini-api-client`**: Comunicación con los modelos de IA de Google.
- **`zustand` o `useContext`**: Para el manejo del estado del juego (score, sprite actual, nivel).

#### 2.2 Dependencias de Desarrollo (`devDependencies`)
- **`vite`**: Bundler y servidor de desarrollo.
- **`typescript`**: Compilación y tipado estático.
- **`@types/react`, `@types/react-dom`**: Definiciones de tipos para React.
- **`eslint`, `prettier`**: Estándar de calidad de código.

---

### 3. Constraints (Restricciones y Reglas)

Para mantener la identidad "Glitch" y la viabilidad técnica, el proyecto debe respetar estos límites:

#### 3.1 Constraints de Diseño (Mandatorios)
- **Tipografía**: Únicamente fuentes `monospace`.
- **Paleta de Colores**: Solo los colores neón definidos (`#39FF14`, `#00FFFF`, `#FF2D6B`, `#FAC775`).
- **Pixel-Perfect**: Base de 4px para todo. No se permiten `border-radius` dentro del canvas del juego.
- **Sin Gradientes**: La profundidad se crea mediante capas de color plano (Layering).

#### 3.2 Constraints Técnicos
- **Performance**: El loop principal debe correr a 60 FPS estables. En mobile, se puede limitar a 30 FPS si la batería/CPU es crítica.
- **No Backend**: Toda la persistencia (High Score, Personaje) se guarda en `localStorage`.
- **Accesibilidad**: Los efectos de glitch (flashes) no deben superar los 3 por segundo para evitar problemas de fotosensibilidad.

---

### 4. Arquitectura de Archivos Sugerida

```text
src/
├── components/          # UI puramente React (Buttons, Modals, HUD)
├── game/
│   ├── engine/          # Game Loop y RequestAnimationFrame
│   ├── physics/         # Colisiones AABB, Salto, Gravedad
│   ├── renderer/        # Dibujo en Canvas (Sprites, Scanlines)
│   └── levels/          # Generación procedimental y parser de IA
├── hooks/               # useGameLoop, useControls, useAR
├── store/               # Estado global de la sesión
└── styles/              # Design Tokens y CSS base
```

---

### 5. Plan de Ejecución (Fases)

1.  **Fase 1: Core Gameplay (Semana 1)**: Loop de juego, física de salto, obstáculos infinitos y colisiones.
2.  **Fase 2: Identidad Visual (Semana 2)**: Integración del sistema de diseño, efectos de scanline/ghost layer y character creator básico.
3.  **Fase 3: Inteligencia Artificial (Semana 3)**: Generación de niveles por prompt y Sketch-to-Sprite usando Gemini.
4.  **Fase 4: Realidad Aumentada & Polishing (Semana 4)**: Detección de marcadores AR para power-ups y optimización final.

---

*GLITCHRUN Plan de Implementación · Preparado por Antigravity · You are the glitch.*
