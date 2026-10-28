# Demos de Harvard AI

Adaptaciones interactivas para navegador de proyectos realizados durante [Harvard CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/).

**[Abrir la colección](https://raulesteveza.github.io/demos/Harvard_AI/)**

- 🇬🇧 [English](README_en.md)
- 🇪🇸 Español

> [!IMPORTANT]
> Estas demos son reinterpretaciones educativas, no réplicas completas de los ejercicios originales. Algunas utilizan conjuntos de datos, vocabularios o modelos reducidos para seguir siendo rápidas, autónomas y comprensibles en un navegador. Los [proyectos originales en Python](https://github.com/RaulEstevezA/harvard_ai) conservan el alcance completo del curso.

## Demos

| Área | Demo | Conceptos principales |
| --- | --- | --- |
| Búsqueda | Tic-Tac-Toe | Minimax, búsqueda adversarial, árboles de juego |
| Búsqueda | Degrees | Búsqueda en anchura, caminos mínimos, grafos |
| Búsqueda | PageRank | Navegante aleatorio, probabilidad, iteración |
| Conocimiento | Minesweeper AI | Bases de conocimiento, inferencia lógica |
| Conocimiento | Knights and Knaves | Lógica proposicional, comprobación de modelos |
| Conocimiento | Heredity | Probabilidad conjunta, inferencia bayesiana |
| Conocimiento | Parser | Gramáticas independientes del contexto, árboles sintácticos |
| Optimización | Crossword Solver | Satisfacción de restricciones, AC-3, backtracking |
| Aprendizaje | Nim | Q-learning, aprendizaje por refuerzo |
| Aprendizaje | Shopping | Vecinos más cercanos, métricas de clasificación |
| Aprendizaje | Traffic | Convolución, extracción de rasgos, visión por computador |
| Aprendizaje | Attention | Transformers, autoatención, predicción enmascarada |

Todas las demos incluyen textos en castellano e inglés. Los juegos y puzles que se benefician de la variedad ofrecen varios tableros, casos o procesos de entrenamiento en lugar de un único ejemplo fijo.

## Ejecución local

El proyecto es estático y no requiere instalación. Conviene servir el repositorio por HTTP para que las rutas relativas funcionen igual que en la web publicada:

```bash
python3 -m http.server 8000
```

Después, abre `http://localhost:8000`. No se recomienda abrir `index.html` directamente.

## Estructura del proyecto

```text
.
├── assets/
│   ├── css/        Tokens de diseño y estructuras compartidas
│   └── js/         Comportamiento y traducciones del hub
├── demos/          Un directorio autónomo por demo
├── scripts/        Utilidades para preparar conjuntos de datos
├── index.html      Hub de la colección
└── local-data/     Datos fuente locales, excluidos de Git
```

## Tecnología y diseño

La colección utiliza HTML semántico, CSS moderno y JavaScript sin dependencias. Canvas solo se emplea cuando ayuda a entender el proceso representado. No hay framework, compilación, backend, analítica ni seguimiento.

La interfaz sigue el sistema de diseño de la web personal: superficies oscuras, tipografía del sistema, color contenido, foco de teclado visible y diseños adaptables. El flujo de despliegue publica los archivos estáticos bajo la ruta `/demos/Harvard_AI/` del portfolio.

## Atribución

Los conceptos y enunciados de los ejercicios proceden del curso CS50 AI de Harvard University. Este repositorio contiene adaptaciones independientes para navegador creadas por Raúl Estévez y no está afiliado ni respaldado por Harvard University o CS50.

- [CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/)
- [Soluciones originales en Python](https://github.com/RaulEstevezA/harvard_ai)
- [Portfolio](https://raulesteveza.github.io/)

## Licencia

El código y la documentación originales de este repositorio se publican con licencia [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional](LICENSE). Los nombres del curso, enunciados y demás materiales de terceros siguen perteneciendo a sus respectivos titulares y no se relicencian aquí.
