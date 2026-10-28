const translations = {
  es: {
    eyebrow: 'Harvard CS50 AI · Demos interactivas',
    lead: 'Una colección de juegos y puzles que permite ver algoritmos de inteligencia artificial mientras trabajan.',
    intro: "Adaptaciones interactivas de proyectos realizados durante Harvard CS50's Introduction to Artificial Intelligence with Python. Cada demo conserva el concepto del ejercicio original y añade una explicación visual de sus decisiones.",
    openFirst: 'Abrir primera demo', originalCode: 'Código original', allDemos: 'Todas las demos',
    collectionLabel: 'Colección', catalogTitle: 'Juegos y puzles', catalogCopy: 'Cinco formas de explorar búsqueda, conocimiento, optimización y aprendizaje.',
    search: 'Búsqueda', searchDescription: 'Elegir la mejor acción explorando estados futuros.', available: 'Disponible',
    tictactoeDescription: 'Juega contra un agente óptimo y observa cómo valora cada movimiento posible.', gameTrees: 'Árboles de juego', adversarialSearch: 'Búsqueda adversarial', openDemo: 'Abrir demo',
    knowledge: 'Conocimiento', knowledgeDescription: 'Deducir hechos nuevos a partir de reglas e información parcial.', planned: 'Planificada', logicalInference: 'Inferencia lógica',
    minesweeperDescription: 'Sigue la base de conocimiento de un agente mientras identifica casillas seguras y minas.', knowledgeBases: 'Bases de conocimiento', inference: 'Inferencia',
    propositionalLogic: 'Lógica proposicional', knightsDescription: 'Resuelve acertijos de caballeros y mentirosos descartando modelos contradictorios.', modelChecking: 'Comprobación de modelos', symbolicAI: 'IA simbólica',
    optimization: 'Optimización', optimizationDescription: 'Reducir un espacio de búsqueda mediante restricciones y heurísticas.', crosswordDescription: 'Observa cómo AC-3, MRV, LCV y backtracking construyen un crucigrama válido.', heuristics: 'Heurísticas',
    learning: 'Aprendizaje', learningDescription: 'Mejorar una estrategia a partir de experiencia y recompensas.', nimDescription: 'Entrena un agente por refuerzo y compara cómo cambian los valores de sus acciones.', reinforcementLearning: 'Aprendizaje por refuerzo',
    footer: 'Adaptaciones interactivas de proyectos realizados durante Harvard CS50 AI.'
  },
  en: {
    eyebrow: 'Harvard CS50 AI · Interactive demos',
    lead: 'A collection of games and puzzles where you can watch artificial intelligence algorithms at work.',
    intro: "Interactive adaptations of projects completed during Harvard CS50's Introduction to Artificial Intelligence with Python. Each demo preserves the original exercise concept and adds a visual explanation of its decisions.",
    openFirst: 'Open first demo', originalCode: 'Original code', allDemos: 'All demos',
    collectionLabel: 'Collection', catalogTitle: 'Games and puzzles', catalogCopy: 'Five ways to explore search, knowledge, optimization, and learning.',
    search: 'Search', searchDescription: 'Choose the best action by exploring future states.', available: 'Available',
    tictactoeDescription: 'Play against an optimal agent and watch it evaluate every possible move.', gameTrees: 'Game trees', adversarialSearch: 'Adversarial search', openDemo: 'Open demo',
    knowledge: 'Knowledge', knowledgeDescription: 'Deduce new facts from rules and partial information.', planned: 'Planned', logicalInference: 'Logical inference',
    minesweeperDescription: "Follow an agent's knowledge base as it identifies safe cells and mines.", knowledgeBases: 'Knowledge bases', inference: 'Inference',
    propositionalLogic: 'Propositional logic', knightsDescription: 'Solve knights and knaves puzzles by eliminating contradictory models.', modelChecking: 'Model checking', symbolicAI: 'Symbolic AI',
    optimization: 'Optimization', optimizationDescription: 'Reduce a search space with constraints and heuristics.', crosswordDescription: 'Watch AC-3, MRV, LCV, and backtracking build a valid crossword.', heuristics: 'Heuristics',
    learning: 'Learning', learningDescription: 'Improve a strategy through experience and rewards.', nimDescription: 'Train a reinforcement agent and compare how its action values change.', reinforcementLearning: 'Reinforcement learning',
    footer: 'Interactive adaptations of projects completed during Harvard CS50 AI.'
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

setLanguage(localStorage.getItem('lang') || 'es');
