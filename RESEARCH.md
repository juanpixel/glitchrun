# RESEARCH.md — Desarrollo de un Runner 2D con Vibe Coding
## Reporte de Investigación · Viabilidad Técnica y Metodologías

---

## Resumen ejecutivo

Este reporte documenta la viabilidad técnica y las metodologías avanzadas para construir un videojuego de carrera infinita (Runner 2D) mediante el paradigma de **Vibe Coding**. El objetivo es validar un flujo de trabajo basado en ingeniería agéntica, donde el desarrollador actúa como orquestador de alto nivel — minimizando la manipulación manual de sintaxis en favor de la gestión estratégica del contexto y la visión creativa.

---

## 1. El paradigma de Vibe Coding e ingeniería agéntica

El Vibe Coding se define, bajo el canon de Karpathy, como un estado de **"desacoplamiento material"** del código. En este paradigma, el programador deja de ser un escritor de líneas para convertirse en un director que *"ve cosas, dice cosas y ejecuta cosas"*, delegando la implementación a agentes que operan con autonomía creciente.

### Configuración de contexto y memoria del proyecto

Para que este flujo sea exitoso, la gestión del contexto es la prioridad absoluta. Se utilizan archivos específicos para anclar la "personalidad" y el conocimiento técnico del proyecto:

- **`.cursorrules`** — Establece las directrices de estilo, las restricciones de librerías y las preferencias arquitectónicas que el agente debe respetar estrictamente.
- **`CLAUDE.md`** — Actúa como el "Lore" o memoria persistente del proyecto. Almacena el stack tecnológico, las decisiones de diseño previas y el estado actual de los módulos, evitando la degradación de la memoria en conversaciones largas.

### Modo de planificación (Plan Mode) en Cursor 2.1

La evolución de herramientas como Cursor 2.1 introduce capacidades críticas para el *Task Steward*:

- **Clarification Loop** — El sistema inicia un bucle de aclaración proactiva, realizando preguntas detalladas antes de generar código para evitar ambigüedades.
- **Plan-Aware Context** — Identificación automática de archivos y dependencias relevantes para el plan actual.
- **Documentación exportable** — La capacidad de exportar planes estructurados paso a paso como archivos Markdown permite mantener una trazabilidad técnica profesional.

### Mejores prácticas del Vibe Coding

| Hacer | No hacer |
|-------|----------|
| Gestionar la inercia del contexto iniciando nuevos chats para tareas aisladas | Ignorar la dependencia de ruta (Path Dependence): permitir que el agente repita errores iniciales por inercia |
| Utilizar planes estructurados para pre-validar dependencias de archivos | Aceptar cambios masivos sin un escaneo visual de los diffs |
| Priorizar la claridad del "vibe" (intención) sobre la instrucción técnica rígida | Subestimar el impulso del contexto — acumular basura informativa degrada la precisión del agente (arXiv 3.2.2) |

---

## 2. Generación procedimental de niveles: algoritmo Drunkard's Walk

La creación de un entorno infinito requiere una aleatoriedad controlada que garantice la **transitabilidad**.

### Lógica del algoritmo

Se implementa el **Drunkard's Walk** (Caminata del Borracho) para asegurar que siempre exista al menos un camino válido a través de la rejilla de tiles. El agente debe ser instruido para validar que la malla generada no contenga secciones bloqueadas.

### Implementación agéntica y verificación obligatoria

Basado en los hallazgos del DevLog de Realm & Record, el uso de agentes como Claude requiere una vigilancia crítica:

- El desarrollador debe realizar un **"escaneo impresionista"** para verificar la coherencia visual.
- La validación lógica de la funcionalidad es **mandatoria**.
- Los agentes pueden fallar en tareas simples de redirección o lógica de coordenadas a pesar de generar sintaxis correcta.

> **Regla de oro del ingeniero agéntico: verificar todo.**

---

## 3. Flujo Sketch-to-Sprite y personalización de avatares

El ecosistema visual se apoya en la generación de assets de pixel art que mantengan una consistencia estética rigurosa.

### Consistencia de identidad

- **Nano Banana Pro (Gemini 3 Pro Image)** — Seleccionado por su *Thinking Mode* (genera imágenes de pensamiento intermedio para refinar la composición) y su precisión en el renderizado de texto.
- **Identity Locking** — Mediante la carga de hasta 5 imágenes de referencia, permite bloquear la identidad del personaje, asegurando que el avatar sea idéntico en diferentes frames de animación.

### Generación de sprite sheets y motion transfer

A través de **Ludo.ai**, el desarrollador puede subir un video de referencia (por ejemplo, una persona real corriendo) para aplicar *Motion Transfer*, trasladando ese movimiento exacto al sprite pixel art.

### Especificaciones técnicas estándar

| Parámetro | Valor |
|-----------|-------|
| Duración máxima de animación | 3 segundos |
| Capacidad por hoja | Hasta 64 frames |
| Resolución máxima por frame | 512×512 px (estética retro) |
| Precisión | Alta fidelidad en texto y detalles estilizados |

---

## 4. Interacciones de Realidad Aumentada (WebAR) y visión en tiempo real

La integración con el mundo físico se logra mediante APIs de baja latencia y frameworks de alto rendimiento.

### Framework AR.js v3.4.7

- Permite el rastreo de imágenes o marcadores sobre superficies reales.
- **Requerimiento crítico:** HTTPS obligatorio para acceder a sensores de cámara y GPS.
- Se recomienda **Location-based AR.js** (bajo A-Frame 1.6.0) para anclar elementos del juego a coordenadas GPS del mundo real.

### Gemini Live API

- Implementa **Affective Dialog** — el juego adapta su tono al humor del usuario.
- Soporte para **Barge-in** (interrupciones naturales en conversación).
- Soporta 24 idiomas con latencia mínima.

### Casos de uso de interacción AR

1. **Detección de obstáculos** — La cámara identifica un objeto físico y el agente genera un bloque de colisión en el runner.
2. **Comandos de voz con tono** — El avatar reacciona no solo al comando "salta", sino al volumen y emoción de la voz.
3. **Anclaje GPS** — Los coleccionables del juego aparecen solo en ubicaciones físicas específicas mediante Location-based AR.

---

## 5. Viabilidad de implementación estética en terminal (CLI)

Un runner 2D en CLI no es solo una opción nostálgica, sino una demostración de eficiencia en el sustrato material.

### Benchmarks de codificación

- El agente **Jules** alcanzó un **54.2%** en Terminal-Bench 2.0, validando la capacidad de la IA para manejar interfaces de terminal complejas.

### Estética retro y sustrato material

- Utilizar ASCII o Unicode permite enfocarse en la lógica pura.
- Como indica el estudio de arXiv (Sección 4.3), el Vibe Coding permite volver a Vanilla JS y primitivas de bajo nivel porque la IA gestiona la manipulación tediosa del sustrato.

### Veredicto de viabilidad

Se toman como referencia juegos como *Papers, Please* y *Habbo Hotel* para demostrar que el pixel art de alta calidad en entornos limitados **envejece mejor que el 3D**. El esfuerzo de Vibe Coding en CLI es inferior al desarrollo web tradicional debido a la capacidad superior de razonamiento de los LLMs sobre interfaces basadas en texto.

---

## 6. Conclusiones y futuro del desarrollo Vibe-First

El Vibe Coding no elimina al programador — lo eleva a la categoría de **Task Steward** y curador de contexto. Este nuevo rol genera una *"Ambient Competence"* (Competencia Ambiental): la sensación de poder abordar cualquier reto técnico gracias a la conciencia de lo posible que otorga la IA.

> El desarrollador ya no lucha con el lenguaje. Dirige la orquestación.

### Stack ideal recomendado

| Rol | Herramienta |
|-----|-------------|
| Editor principal | Cursor 2.1 (Plan Mode activo) |
| Modelo de razonamiento | Claude Opus 4.5 |
| Generación visual | Nano Banana Pro (Gemini 3 Pro Image) |
| Framework AR | AR.js v3.4.7 / A-Frame 1.6.0 |

---

*GLITCHRUN Research · v1.0 · You are the glitch.*
