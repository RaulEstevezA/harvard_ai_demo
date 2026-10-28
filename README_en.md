# Harvard AI Demos

Interactive browser adaptations of projects completed during [Harvard CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/).

**[Open the live collection](https://raulesteveza.github.io/demos/Harvard_AI/)**

- 🇬🇧 English
- 🇪🇸 [Español](README_es.md)

> [!IMPORTANT]
> These demos are educational reinterpretations, not complete replicas of the original assignments. Some use reduced datasets, vocabularies or models so they can remain fast, self-contained and understandable in a browser. The [original Python projects](https://github.com/RaulEstevezA/harvard_ai) retain the full course scope.

## Demos

| Area | Demo | Main concepts |
| --- | --- | --- |
| Search | Tic-Tac-Toe | Minimax, adversarial search, game trees |
| Search | Degrees | Breadth-first search, shortest paths, graphs |
| Search | PageRank | Random surfer model, probability, iteration |
| Knowledge | Minesweeper AI | Knowledge bases, logical inference |
| Knowledge | Knights and Knaves | Propositional logic, model checking |
| Knowledge | Heredity | Joint probability, Bayesian inference |
| Knowledge | Parser | Context-free grammars, syntax trees |
| Optimization | Crossword Solver | Constraint satisfaction, AC-3, backtracking |
| Learning | Nim | Q-learning, reinforcement learning |
| Learning | Shopping | k-nearest neighbours, classification metrics |
| Learning | Traffic | Convolution, feature extraction, computer vision |
| Learning | Attention | Transformers, self-attention, masked prediction |

Every demo includes Spanish and English copy. Games and puzzles that benefit from variety provide multiple boards, cases or training runs rather than a single fixed example.

## Run locally

The project is static and has no installation step. Serve the repository over HTTP so that every relative asset path behaves like the deployed site:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly is not recommended.

## Project structure

```text
.
├── assets/
│   ├── css/        Shared design tokens and layouts
│   └── js/         Hub behaviour and translations
├── demos/          One self-contained directory per demo
├── scripts/        Dataset preparation utilities
├── index.html      Collection hub
└── local-data/     Local source data, excluded from Git
```

## Technology and design

The collection uses semantic HTML, modern CSS and vanilla JavaScript. Canvas is used only where it makes the underlying process clearer. There is no framework, build step, backend, analytics or tracking.

The interface follows the shared personal-site design system: dark surfaces, system fonts, restrained colour, visible keyboard focus and responsive layouts. The deployment workflow publishes the static files under the portfolio's `/demos/Harvard_AI/` path.

## Attribution

The concepts and assignment prompts originate from Harvard University's CS50 AI course. This repository contains independent browser adaptations by Raúl Estévez and is not affiliated with or endorsed by Harvard University or CS50.

- [CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/)
- [Original Python solutions](https://github.com/RaulEstevezA/harvard_ai)
- [Portfolio](https://raulesteveza.github.io/)

## License

Original code and documentation in this repository are licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](LICENSE). Course names, prompts and other third-party materials remain the property of their respective owners and are not relicensed here.
