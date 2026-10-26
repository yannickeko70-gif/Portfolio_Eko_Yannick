export const NAV = [
  ['apropos', 'À propos'],
  ['competences', 'Compétences'],
  ['projets', 'Projets'],
  ['formation', 'Formation'],
  ['certifications', 'Certifications'],
  ['objectifs', 'Objectifs'],
];

// Toutes les sections suivies (menu actif + statistiques)
export const SECTION_IDS = [
  'apropos', 'services', 'competences', 'projets', 'formation', 'certifications', 'objectifs', 'contact',
];

export const FACTS = [
  ['Localisation', 'Douala, Cameroun'],
  ['Études', 'Bachelor Bac+3 CDWFS'],
  ['Langues', 'Français, anglais'],
  ['Centres d\'intérêt', 'Football, basketball, natation, jeu vidéo'],
];

export const SERVICES = [
  {
    icon: 'globe',
    title: 'Développement Web',
    text: 'Sites et applications web complets, du front au back, avec des interfaces claires et adaptées à tous les écrans.',
    tags: ['HTML / CSS / JS', 'PHP', 'React'],
  },
  {
    icon: 'phone',
    title: 'Applications Mobiles',
    text: 'Applications pensées pour le téléphone, simples à prendre en main, issues de ma formation en programmation mobile.',
    tags: ['React Native', 'Android Studio'],
  },
  {
    icon: 'monitor',
    title: 'Logiciels Desktop',
    text: 'Outils de bureau fiables pour gérer des données et automatiser des tâches du quotidien.',
    tags: ['C#', 'Java', 'SQL Server'],
  },
  {
    icon: 'gamepad',
    title: 'Jeux Vidéo',
    text: 'Prototypes et jeux jouables, de la mécanique de jeu à l\'ambiance, pour allier ma passion et la technique.',
    tags: ['Unity', 'C#'],
  },
];

export const SKILLS = [
  { icon: 'code', title: 'Web', items: ['HTML5', 'CSS3', 'JavaScript', 'PHP'] },
  {
    icon: 'layers', title: 'Frameworks', ai: true,
    items: ['React', 'Next.js', 'NestJS', 'Laravel', 'Tailwind CSS', 'Node.js', 'Django', 'Angular'],
  },
  { icon: 'phone', title: 'Mobile', ai: true, items: ['React Native'] },
  { icon: 'monitor', title: 'Desktop et jeu', items: ['C# (ASP.NET, ADO.NET)', 'Java', 'C', 'Unity'] },
  { icon: 'database', title: 'Données', items: ['SQL', 'MySQL', 'PostgreSQL', 'SQL Server'] },
  {
    icon: 'wrench', title: 'Outils',
    items: ['VS Code', 'Visual Studio', 'NetBeans', 'Android Studio', 'Figma', 'Git et GitHub', 'Docker'],
  },
];

export const EDUCATION = [
  {
    when: 'Depuis la rentrée 2026', badge: 'En cours', current: true,
    title: 'Bachelor Bac+3 Conception et Développement Web FullStack (CDWFS)',
    school: 'Institut Universitaire de la Côte, Douala',
  },
  {
    when: '2024 – 2026', badge: 'Diplômé', done: true,
    title: 'DEC canadien en Programmation et applications mobiles',
    school: 'CCNB (Canada), IUC Douala',
  },
  {
    when: '2023 – 2024',
    title: 'Baccalauréat technique, Fiscalité et Informatique de Gestion (FIG)',
    school: 'Lycée Technique Bilingue de Bertoua',
  },
  {
    when: '2022 – 2023',
    title: 'Probatoire technique, Fiscalité et Informatique de Gestion (FIG)',
    school: 'Lycée Technique Bilingue de Bertoua',
  },
];

export const ROADMAP = [
  { state: 'is-done', when: '2026', title: 'DEC canadien obtenu', text: 'Programmation et applications mobiles.' },
  {
    state: 'is-current', when: 'Aujourd\'hui',
    title: 'Bachelor en Conception et Développement Web FullStack',
    text: 'Je consolide mon socle de développeur complet.',
  },
  {
    state: 'is-next', when: 'Demain',
    title: 'Ingénieur en Intelligence Artificielle',
    text: 'Spécialisation en Machine Learning ou en IA générative.',
  },
];

export const GOALS = [
  {
    icon: 'cpu', title: 'Maîtriser le Machine Learning',
    text: 'Comprendre les algorithmes d\'apprentissage et savoir les appliquer à des données réelles.',
  },
  {
    icon: 'sparkles', title: 'Explorer l\'IA générative',
    text: 'Travailler avec les modèles de langage et d\'image pour imaginer de nouveaux usages.',
  },
  {
    icon: 'bulb', title: 'Créer des solutions intelligentes',
    text: 'Allier mon socle FullStack à l\'IA pour livrer des produits complets, de la donnée à l\'interface.',
  },
];

export const SUBJECTS = [
  'Projet académique collaboratif',
  'Projet professionnel collaboratif',
  'Proposition de stage',
  'Projet freelance',
  'Question technique',
  'Autre',
];

// Catégories de compétences : clé de l'admin → titre et icône du portfolio
export const SKILL_CATEGORIES = [
  { key: 'web', title: 'Web', icon: 'code' },
  { key: 'frameworks', title: 'Frameworks', icon: 'layers', ai: true },
  { key: 'mobile', title: 'Mobile', icon: 'phone', ai: true },
  { key: 'desktop', title: 'Desktop et jeu', icon: 'monitor' },
  { key: 'data', title: 'Données', icon: 'database' },
  { key: 'tools', title: 'Outils', icon: 'wrench' },
];

export const LINKS = {
  github: 'https://github.com/yannickeko70-gif',
  linkedin: 'https://www.linkedin.com/in/yannick-eko-3a2152409',
  email: 'yannickeko70@gmail.com',
};
