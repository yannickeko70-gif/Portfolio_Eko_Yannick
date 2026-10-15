<div align="center">
  <img src="public/img/yannick_eko.PNG" alt="Eko Yannick" width="150">

  # 🚀 Eko Yannick — Portfolio Développeur

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

  ### 🎓 Étudiant en Bachelor Conception et Développement Web FullStack (CDWFS)
  ### 📍 IUC Douala | 📅 Bac+3 en cours

  [![Voir le portfolio](https://img.shields.io/badge/🌐_Voir_le_portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-eko-yannick.vercel.app)
  [![Télécharger CV](https://img.shields.io/badge/📄_Télécharger_CV-4285F4?style=for-the-badge)](public/doc/CV-Yannick-EKO.pdf)

</div>

---

## 📋 **Table des matières**
- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Architecture](#-architecture)
- [Projets présentés](#-projets-présentés)
- [Structure du projet](#-structure-du-projet)
- [Installation locale](#-installation-locale)
- [Thèmes disponibles](#-thèmes-disponibles)
- [Contact](#-contact)
- [Licence](#-licence)

---

## 🧑‍💻 **À propos**

Je suis **Eko Yannick**, étudiant en **Bachelor Conception et Développement Web FullStack (CDWFS)** à l'**Institut Universitaire de la Côte (IUC)** de Douala, Cameroun. Je suis titulaire d'un **DEC canadien en Programmation et applications mobiles**.

Je conçois des :
- 🌐 **Applications web** (HTML/CSS/JS, React, PHP, ASP.NET)
- 📱 **Applications mobiles** (React Native, Android Studio)
- 💻 **Applications desktop** (C#, Java)
- 🎮 **Jeux vidéo** (Unity, C#)

Mon objectif : devenir ingénieur en intelligence artificielle, spécialisé en Machine Learning ou en IA générative.

Ce portfolio rassemble mes projets académiques et personnels.

---

## ✨ **Fonctionnalités**

| Fonctionnalité | Description |
|----------------|-------------|
| 🎨 **3 thèmes** | Noir, Blanc et Beige, mémorisés dans le navigateur, sans flash au chargement |
| 📱 **Responsive** | Adapté au téléphone, à la tablette et au bureau, avec menu burger sur mobile |
| 🗂️ **Projets filtrables** | Filtres Web, Mobile, Desktop et Gaming avec compteurs |
| 🔄 **Projets dynamiques** | Les projets sont chargés depuis mon back office, avec une copie locale de secours |
| ✉️ **Formulaire de contact** | Les messages arrivent directement dans mon back office |
| 📊 **Statistiques** | Visites, sections vues, projets ouverts et téléchargements du CV |
| 📄 **Téléchargement du CV** | Version PDF accessible en un clic |
| ✨ **Animations légères** | Entrée du hero et apparition des cartes, désactivées si le visiteur le demande |
| ♿ **Accessibilité** | Navigation au clavier, lien d'évitement, contrastes adaptés à chaque thème |
| 🔎 **SEO** | Balises Open Graph, `robots.txt` et `sitemap.xml` |

---

## 🛠️ **Technologies utilisées**

| Catégorie | Technologies |
|-----------|--------------|
| **Frontend** | React, Vite, JavaScript (ES6+), CSS3 (variables, Grid, Flexbox) |
| **Polices** | Bricolage Grotesque et Manrope (Google Fonts) |
| **Back office** (dépôt séparé) | React, Node.js, Express, MySQL |
| **Hébergement** | Vercel (portfolio et admin), Render (API) |
| **Outils** | Git et GitHub, Visual Studio Code, Figma |

---

## 🧩 **Architecture**

```
Portfolio (React, Vercel) ──┐
                            ├──►  API Node.js / Express (Render)  ──►  MySQL
Back office (React, Vercel) ┘
```

- Le **portfolio** (ce dépôt) lit ses projets et envoie les messages et statistiques à l'API.
- Le **back office** est un dépôt privé : il sert à gérer les projets, lire les messages et suivre les statistiques.

---

## 📂 **Projets présentés**

| Projet | Catégorie | Technologies | Statut |
|--------|-----------|--------------|--------|
| **CyberTrack** | Web | ASP.NET, ADO.NET, SQL Server | Terminé |
| **LUMIS** | Web | WordPress, WooCommerce, PHP, JavaScript | Terminé |
| **CFPD TryOn** | Web | React, Node.js, Python | En cours |
| **The War of Squares** | Gaming | Unity, C# | Terminé |
| **Metro Dash** | Gaming, Desktop | Unity, C# | En cours |
| **AlgoCraft** | Desktop | C#, Visual Studio | En cours |
| **SchoolBadge** | Desktop | Java, MySQL, NetBeans | Terminé |

---

## 🗂️ **Structure du projet**

```
Portfolio_Eko_Yannick/
├── public/
│   ├── img/yannick_eko.PNG
│   ├── doc/CV-Yannick-EKO.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/      # Header, Hero, Projects, Contact, etc.
│   ├── hooks/           # thème, section active, apparition au scroll
│   ├── data/            # projets, contenu des sections
│   ├── styles/style.css
│   ├── api.js           # appels à l'API du back office
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 💻 **Installation locale**

Prérequis : [Node.js](https://nodejs.org/) (version LTS récente).

```bash
git clone https://github.com/yannickeko70-gif/Portfolio_Eko_Yannick.git
cd Portfolio_Eko_Yannick
npm install
npm run dev
```

Le site s'ouvre sur `http://localhost:5173`.

| Commande | Rôle |
|----------|------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Génère la version de production dans `dist/` |
| `npm run preview` | Prévisualise la version de production |

En local, le site appelle l'API sur `http://localhost:5000/api`. Pour utiliser une autre adresse, crée un fichier `.env` avec :

```
VITE_API_URL=https://adresse-de-ton-api/api
```

---

## 🎨 **Thèmes disponibles**

| Thème | Accent |
|-------|--------|
| ⚫ **Noir** | Bleu clair |
| ⚪ **Blanc** | Bleu cobalt |
| 🟤 **Beige** | Vert profond |

---

## 📬 **Contact**

- 📧 Email : [yannickeko70@gmail.com](mailto:yannickeko70@gmail.com)
- 💼 LinkedIn : [yannick-eko-3a2152409](https://www.linkedin.com/in/yannick-eko-3a2152409)
- 🐙 GitHub : [yannickeko70-gif](https://github.com/yannickeko70-gif)
- 🌐 Portfolio : [portfolio-eko-yannick.vercel.app](https://portfolio-eko-yannick.vercel.app)

---

## 📄 **Licence**

Projet sous licence ISC.