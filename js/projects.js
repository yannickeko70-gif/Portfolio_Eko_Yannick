// live = projet hébergé en ligne | repo = dépôt GitHub (laisser '' si absent)
// status : 'termine' | 'en_cours'
window.PROJECTS = [
  {
    title: 'CyberTrack',
    description: 'Application web sécurisée de signalement de contenus illégaux, avec gestion des rôles et suivi des signalements.',
    stack: ['ASP.NET', 'ADO.NET', 'SQL Server'],
    image: 'img/CYBERTRACK.png',
    live: 'https://cybertrack.runasp.net/',
    repo: 'https://github.com/fofack-ai/CyberTrack',
    status: 'termine'
  },
  {
    title: 'LUMIS',
    description: 'Site WordPress pour une agence créative : thème enfant sur mesure, boutique WooCommerce et portfolio.',
    stack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript'],
    image: 'img/LUMIS.png',
    live: '',
    repo: 'https://github.com/yannickeko70-gif/lumis-portfolio-wordpress',
    status: 'termine'
  },
  {
    title: 'CFPD TryOn',
    description: "Plateforme e-commerce avec essayage virtuel de vêtements grâce à l'IA générative.",
    stack: ['React', 'Node.js', 'Python'],
    image: 'img/TRYON.png',
    live: 'https://cfpd-tryon.vercel.app/',
    repo: 'https://github.com/yannickeko70-gif/essayage-virtuel',
    status: 'termine'
  },
  {
    title: 'The War of Squares',
    description: 'Jeu de dames hybride 2D/3D avec un adversaire IA qui prend ses décisions de façon stratégique.',
    stack: ['Unity', 'C#'],
    image: 'img/THE_WAR_OF_SQUARES.png',
    live: '', repo: '', status: 'termine'
  },
  {
    title: 'Metro Dash',
    description: 'Jeu de course infinie inspiré de Subway Surfers, pour mobile et desktop.',
    stack: ['Unity', 'C#'],
    image: 'img/METRODASH.png',
    live: '', repo: '', status: 'en_cours'
  },
  {
    title: 'AlgoCraft',
    description: "Environnement de développement pour écrire, exécuter et tester des algorithmes, pensé pour l'apprentissage.",
    stack: ['C#', 'Visual Studio'],
    image: 'img/ALGOCRAFT.png',
    live: '', repo: '', status: 'termine'
  },
  {
    title: 'SchoolBadge',
    description: 'Application desktop pour gérer les élèves et imprimer les cartes scolaires par lots.',
    stack: ['Java', 'MySQL', 'NetBeans'],
    image: 'img/SCHOOLBADGE.png',
    live: '', repo: '', status: 'termine'
  }
];