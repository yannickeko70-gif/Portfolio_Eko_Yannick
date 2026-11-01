export function pick(lang, fr, en) {
  if (lang === 'en') {
    const v = String(en || '').trim();
    if (v) return v;
  }
  return fr || '';
}

export const STRINGS = {
  fr: {
    nav: {
      apropos: 'À propos', competences: 'Compétences', projets: 'Projets',
      formation: 'Formation', certifications: 'Certifications', objectifs: 'Objectifs',
    },
    contactCta: 'Me contacter',
    themeLabel: 'Thème',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',

    heroViewProjects: 'Voir mes projets',
    heroDownloadCv: 'Télécharger mon CV',
    heroEmail: 'Email',

    aboutTitle: 'À propos',
    factLocation: 'Localisation', factStudies: 'Études', factLanguages: 'Langues', factInterests: "Centres d'intérêt",

    servicesTitle: 'Ce que je fais',
    servicesIntro: "Quatre domaines dans lesquels je conçois et je livre, de la maquette jusqu'au déploiement.",
    services: [
      { title: 'Développement Web', text: 'Sites et applications web complets, du front au back, avec des interfaces claires et adaptées à tous les écrans.' },
      { title: 'Applications Mobiles', text: 'Applications pensées pour le téléphone, simples à prendre en main, issues de ma formation en programmation mobile.' },
      { title: 'Logiciels Desktop', text: 'Outils de bureau fiables pour gérer des données et automatiser des tâches du quotidien.' },
      { title: 'Jeux Vidéo', text: "Prototypes et jeux jouables, de la mécanique de jeu à l'ambiance, pour allier ma passion et la technique." },
    ],

    skillsTitle: 'Compétences',
    skillsIntro: "Les langages, frameworks et outils que j'utilise pour concevoir et livrer mes projets.",
    withAi: "Avec l'IA",
    skillCategories: { web: 'Web', frameworks: 'Frameworks', mobile: 'Mobile', desktop: 'Desktop et jeu', data: 'Données', tools: 'Outils' },

    projectsTitle: 'Projets',
    projectsIntro: 'Une sélection de projets académiques et personnels : applications web, outils desktop et jeux vidéo.',
    filters: { all: 'Tous', web: 'Web', mobile: 'Mobile', desktop: 'Desktop', gaming: 'Gaming' },
    badgeWip: 'En cours', badgeLive: 'En ligne',
    viewLiveProject: 'Voir le projet en ligne', viewRepo: 'Voir le code sur GitHub', linkSoon: 'Lien bientôt disponible',
    openLiveAria: 'ouvrir le projet en ligne', openRepoAria: 'ouvrir le dépôt GitHub',
    noProjectsInCategory: 'Aucun projet dans cette catégorie pour le moment',
    noProjectsText: "Je travaille dessus. En attendant, tu peux parcourir tous mes projets.",
    viewAllProjects: 'Voir tous les projets',

    educationTitle: 'Formation',
    badgeInProgress: 'En cours', badgeGraduated: 'Diplômé',

    certificationsTitle: 'Certifications',
    certificationsIntro: 'Formations et certifications obtenues en complément de mon cursus.',
    noCertifications: 'De nouvelles certifications arrivent bientôt.',
    verifyCertification: 'Vérifier la certification',

    goalsTitle: 'Objectifs',
    goalsVision: "Mon ambition : devenir expert et ingénieur en intelligence artificielle, spécialisé en Machine Learning ou en IA générative, pour concevoir des solutions numériques intelligentes.",
    roadmap: [
      { when: '2026', title: 'DEC canadien obtenu', text: 'Programmation et applications mobiles.' },
      { when: "Aujourd'hui", title: 'Bachelor en Conception et Développement Web FullStack', text: 'Je consolide mon socle de développeur complet.' },
      { when: 'Demain', title: 'Ingénieur en Intelligence Artificielle', text: 'Spécialisation en Machine Learning ou en IA générative.' },
    ],
    goals: [
      { title: 'Maîtriser le Machine Learning', text: "Comprendre les algorithmes d'apprentissage et savoir les appliquer à des données réelles." },
      { title: "Explorer l'IA générative", text: "Travailler avec les modèles de langage et d'image pour imaginer de nouveaux usages." },
      { title: 'Créer des solutions intelligentes', text: "Allier mon socle FullStack à l'IA pour livrer des produits complets, de la donnée à l'interface." },
    ],

    contactTitle: 'Contact',
    contactIntro: 'Un projet, un stage ou une question ? Écris-moi, je réponds rapidement.',
    contactEmail: 'Email', contactPhone: 'Téléphone', contactWhatsapp: 'WhatsApp',
    contactGithub: 'GitHub', contactLinkedin: 'LinkedIn', contactLocation: 'Localisation',
    formFirstName: 'Prénom', formLastName: 'Nom', formEmail: 'Email', formSubject: 'Objet',
    formChooseSubject: 'Choisir un objet', formMessage: 'Message', formDoNotFill: 'Ne pas remplir',
    formSubmit: 'Envoyer le message', formSending: 'Envoi en cours…',
    formWaking: 'Le serveur se réveille, encore quelques secondes…',
    formSuccess: 'Message envoyé. Je te réponds rapidement.',
    formNetworkError: 'Impossible de joindre le serveur.',
    formAlsoWriteTo: 'Tu peux aussi écrire à',
    subjects: ['Projet académique collaboratif', 'Projet professionnel collaboratif', 'Proposition de stage', 'Projet freelance', 'Question technique', 'Autre'],
  },

  en: {
    nav: {
      apropos: 'About', competences: 'Skills', projets: 'Projects',
      formation: 'Education', certifications: 'Certifications', objectifs: 'Goals',
    },
    contactCta: 'Contact me',
    themeLabel: 'Theme',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',

    heroViewProjects: 'See my projects',
    heroDownloadCv: 'Download my CV',
    heroEmail: 'Email',

    aboutTitle: 'About',
    factLocation: 'Location', factStudies: 'Studies', factLanguages: 'Languages', factInterests: 'Interests',

    servicesTitle: 'What I do',
    servicesIntro: 'Four areas where I design and deliver, from mockup to deployment.',
    services: [
      { title: 'Web Development', text: 'Full web sites and applications, front to back, with clear interfaces adapted to every screen.' },
      { title: 'Mobile Applications', text: 'Applications designed for the phone, easy to use, built on my mobile programming training.' },
      { title: 'Desktop Software', text: 'Reliable desktop tools to manage data and automate everyday tasks.' },
      { title: 'Video Games', text: 'Playable prototypes and games, from game mechanics to mood, combining my passion with technique.' },
    ],

    skillsTitle: 'Skills',
    skillsIntro: 'The languages, frameworks and tools I use to design and deliver my projects.',
    withAi: 'With AI',
    skillCategories: { web: 'Web', frameworks: 'Frameworks', mobile: 'Mobile', desktop: 'Desktop & gaming', data: 'Data', tools: 'Tools' },

    projectsTitle: 'Projects',
    projectsIntro: 'A selection of academic and personal projects: web apps, desktop tools and video games.',
    filters: { all: 'All', web: 'Web', mobile: 'Mobile', desktop: 'Desktop', gaming: 'Gaming' },
    badgeWip: 'In progress', badgeLive: 'Live',
    viewLiveProject: 'View live project', viewRepo: 'View code on GitHub', linkSoon: 'Link coming soon',
    openLiveAria: 'open the live project', openRepoAria: 'open the GitHub repository',
    noProjectsInCategory: 'No project in this category yet',
    noProjectsText: "I'm working on it. In the meantime, feel free to browse all my projects.",
    viewAllProjects: 'View all projects',

    educationTitle: 'Education',
    badgeInProgress: 'In progress', badgeGraduated: 'Graduated',

    certificationsTitle: 'Certifications',
    certificationsIntro: 'Training and certifications earned alongside my studies.',
    noCertifications: 'New certifications are coming soon.',
    verifyCertification: 'Verify certification',

    goalsTitle: 'Goals',
    goalsVision: 'My ambition: to become an AI expert and engineer, specialized in Machine Learning or generative AI, to design smart digital solutions.',
    roadmap: [
      { when: '2026', title: 'Canadian DEC obtained', text: 'Mobile programming and applications.' },
      { when: 'Today', title: 'Bachelor in Full-Stack Web Design & Development', text: "I'm consolidating my foundation as a well-rounded developer." },
      { when: 'Tomorrow', title: 'AI Engineer', text: 'Specialization in Machine Learning or generative AI.' },
    ],
    goals: [
      { title: 'Master Machine Learning', text: 'Understand learning algorithms and know how to apply them to real data.' },
      { title: 'Explore generative AI', text: 'Work with language and image models to imagine new uses.' },
      { title: 'Build smart solutions', text: 'Combine my full-stack foundation with AI to deliver complete products, from data to interface.' },
    ],

    contactTitle: 'Contact',
    contactIntro: 'A project, an internship, or a question? Write to me, I reply quickly.',
    contactEmail: 'Email', contactPhone: 'Phone', contactWhatsapp: 'WhatsApp',
    contactGithub: 'GitHub', contactLinkedin: 'LinkedIn', contactLocation: 'Location',
    formFirstName: 'First name', formLastName: 'Last name', formEmail: 'Email', formSubject: 'Subject',
    formChooseSubject: 'Choose a subject', formMessage: 'Message', formDoNotFill: 'Do not fill',
    formSubmit: 'Send message', formSending: 'Sending…',
    formWaking: 'The server is waking up, just a few more seconds…',
    formSuccess: "Message sent. I'll reply shortly.",
    formNetworkError: 'Could not reach the server.',
    formAlsoWriteTo: 'You can also write to',
    subjects: ['Academic collaborative project', 'Professional collaborative project', 'Internship proposal', 'Freelance project', 'Technical question', 'Other'],
  },
};