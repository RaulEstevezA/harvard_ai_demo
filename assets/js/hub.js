const translations = {
  es: {
    eyebrow: 'Harvard CS50 AI · Demos interactivas',
    lead: 'Una colección de juegos, puzles y demostraciones que permite ver algoritmos de inteligencia artificial mientras trabajan.',
    intro: "Adaptaciones interactivas de proyectos realizados durante Harvard CS50's Introduction to Artificial Intelligence with Python. Cada demo conserva el concepto del ejercicio original y añade una explicación visual de sus decisiones.",
    originalCode: 'Código original', allDemos: 'Todas las demos', gameLabel: 'Juego', puzzleLabel: 'Puzle', demonstrationLabel: 'Demostración',
    collectionLabel: 'Colección', catalogTitle: 'Juegos, puzles y demostraciones', catalogCopy: 'Seis formas de explorar búsqueda, conocimiento, optimización y aprendizaje.',
    search: 'Búsqueda', searchDescription: 'Explorar estados, grafos y caminos para encontrar la mejor solución.',
    tictactoeDescription: 'Juega contra un agente óptimo y observa cómo valora cada movimiento posible.', gameTrees: 'Árboles de juego', adversarialSearch: 'Búsqueda adversarial', openDemo: 'Abrir demo',
    degreesDescription: 'Conecta dos intérpretes y observa cómo BFS encuentra el camino más corto entre ellos.', breadthFirstSearch: 'Búsqueda en anchura', graphSearch: 'Búsqueda en grafos',
    knowledge: 'Conocimiento', knowledgeDescription: 'Deducir hechos nuevos a partir de reglas e información parcial.', logicalInference: 'Inferencia lógica',
    minesweeperDescription: 'Sigue la base de conocimiento de un agente mientras identifica casillas seguras y minas.', knowledgeBases: 'Bases de conocimiento', inference: 'Inferencia',
    propositionalLogic: 'Lógica proposicional', knightsDescription: 'Resuelve acertijos de caballeros y mentirosos descartando modelos contradictorios.', modelChecking: 'Comprobación de modelos', symbolicAI: 'IA simbólica',
    optimization: 'Optimización', optimizationDescription: 'Reducir un espacio de búsqueda mediante restricciones y heurísticas.', crosswordDescription: 'Observa cómo AC-3, MRV, LCV y backtracking construyen un crucigrama válido.', heuristics: 'Heurísticas',
    learning: 'Aprendizaje', learningDescription: 'Mejorar una estrategia a partir de experiencia y recompensas.', nimDescription: 'Entrena un agente por refuerzo y compara cómo cambian los valores de sus acciones.', reinforcementLearning: 'Aprendizaje por refuerzo'
  },
  en: {
    eyebrow: 'Harvard CS50 AI · Interactive demos',
    lead: 'A collection of games, puzzles, and demonstrations where you can watch artificial intelligence algorithms at work.',
    intro: "Interactive adaptations of projects completed during Harvard CS50's Introduction to Artificial Intelligence with Python. Each demo preserves the original exercise concept and adds a visual explanation of its decisions.",
    originalCode: 'Original code', allDemos: 'All demos', gameLabel: 'Game', puzzleLabel: 'Puzzle', demonstrationLabel: 'Demonstration',
    collectionLabel: 'Collection', catalogTitle: 'Games, puzzles, and demonstrations', catalogCopy: 'Six ways to explore search, knowledge, optimization, and learning.',
    search: 'Search', searchDescription: 'Explore states, graphs, and paths to find the best solution.',
    tictactoeDescription: 'Play against an optimal agent and watch it evaluate every possible move.', gameTrees: 'Game trees', adversarialSearch: 'Adversarial search', openDemo: 'Open demo',
    degreesDescription: 'Connect two performers and watch BFS find the shortest path between them.', breadthFirstSearch: 'Breadth-first search', graphSearch: 'Graph search',
    knowledge: 'Knowledge', knowledgeDescription: 'Deduce new facts from rules and partial information.', logicalInference: 'Logical inference',
    minesweeperDescription: "Follow an agent's knowledge base as it identifies safe cells and mines.", knowledgeBases: 'Knowledge bases', inference: 'Inference',
    propositionalLogic: 'Propositional logic', knightsDescription: 'Solve knights and knaves puzzles by eliminating contradictory models.', modelChecking: 'Model checking', symbolicAI: 'Symbolic AI',
    optimization: 'Optimization', optimizationDescription: 'Reduce a search space with constraints and heuristics.', crosswordDescription: 'Watch AC-3, MRV, LCV, and backtracking build a valid crossword.', heuristics: 'Heuristics',
    learning: 'Learning', learningDescription: 'Improve a strategy through experience and rewards.', nimDescription: 'Train a reinforcement agent and compare how its action values change.', reinforcementLearning: 'Reinforcement learning'
  }
};

function setLanguage(language) {
  const lang = translations[language] ? language : 'es';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = translations[lang][element.dataset.i18n];
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
  });
  localStorage.setItem('lang', lang);
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const storedLanguage = localStorage.getItem('lang');
const browserLanguage = navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';

setLanguage(storedLanguage || browserLanguage);
