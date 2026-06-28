# ⚽ Mon Foot

Application web moderne de suivi de matchs de football avec authentification, favoris et notifications.

## 🚀 Technologies

- **Framework**: [Next.js 13](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Base de données**: [PostgreSQL](https://www.postgresql.org/) avec [Prisma](https://www.prisma.io/)
- **Cache**: [Redis](https://redis.io/) (Upstash)
- **Authentification**: [NextAuth.js](https://next-auth.js.org/) (Google OAuth)
- **API Football**: [API-Football](https://www.api-football.com/) (RapidAPI)
- **Validation**: [Zod](https://zod.dev/)
- **State Management**: [SWR](https://swr.vercel.app/)
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa)

## ✨ Fonctionnalités

- 🏆 Suivi des matchs de 19 ligues internationales
- 🔐 Authentification Google OAuth
- ⭐ Gestion des équipes favorites
- 📱 Progressive Web App (PWA)
- ⚡ Cache Redis pour performances optimales
- 🎨 Interface responsive (mobile & desktop)
- 🔔 Notifications (à venir)

## 📋 Prérequis

- **Node.js** >= 24.x
- **PostgreSQL** (local ou cloud)
- **Redis** (Upstash recommandé)
- **Compte Google Cloud** (pour OAuth)
- **API-Football Key** (RapidAPI)

## 🛠️ Installation

### 1. Cloner le repository

```bash
git clone https://github.com/dassoukhi/monFoot.git
cd mon-foot
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/monfoot"

# Redis (Upstash)
URL_REDIS="your-redis-url.upstash.io"
PASSWORD_REDIS="your-redis-password"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# API Football (RapidAPI)
API_FOOTBALL_KEY="your-rapidapi-key"

# Node Environment
NODE_ENV="development"
```

### 4. Configurer la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate dev

# (Optionnel) Ouvrir Prisma Studio
npx prisma studio
```

### 5. Configurer Google OAuth

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez-en un existant
3. Activez l'API Google+ 
4. Créez des identifiants OAuth 2.0
5. Configurez les URIs de redirection :
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://votre-domaine.com/api/auth/callback/google` (prod)

### 6. Lancer l'application

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
mon-foot/
├── app/                      # Pages Next.js 13 (App Router)
│   ├── api/                 # API Routes
│   │   ├── auth/           # NextAuth
│   │   └── leagues/        # API ligues
│   ├── home/               # Page d'accueil
│   ├── favoris/            # Favoris utilisateur
│   ├── equipes/            # Liste des équipes
│   └── connexion/          # Page de connexion
├── components/              # Composants React
│   ├── League.tsx          # Composant ligue
│   ├── Match.tsx           # Composant match
│   ├── FavorisCard.tsx     # Carte favoris
│   └── ...
├── constants/               # Constantes
│   └── api.ts              # Configuration API
├── context/                 # Context API
│   └── SideBarContext.tsx  # Contexte sidebar
├── hooks/                   # Custom hooks
│   └── useLeagues.ts       # Hook SWR ligues
├── lib/                     # Libraries
│   ├── instancePrisma.ts   # Client Prisma
│   ├── redis.ts            # Client Redis
│   └── nextauth.ts         # Config NextAuth
├── pages/api/              # API Routes (Pages Router)
│   └── favoris.ts          # API favoris
├── prisma/                  # Prisma schema
│   └── schema.prisma       # Modèles de données
├── public/                  # Fichiers statiques
│   └── manifest.json       # PWA manifest
├── requests/                # Logique métier API
│   ├── leagues.ts          # Récupération ligues
│   ├── teams.ts            # Recherche équipes
│   ├── addToFavoris.ts     # Ajouter favori
│   └── RemoveFavoris.ts    # Retirer favori
├── utils/                   # Utilitaires
│   ├── dateFormat.ts       # Formatage dates
│   ├── expireRedis.ts      # Expiration cache
│   └── leagues.ts          # Liste des ligues
├── types.d.ts              # Types TypeScript globaux
└── tailwind.config.ts      # Configuration Tailwind
```

## 🎯 Scripts disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de développement

# Production
npm run build        # Build de production
npm run start        # Démarrer le serveur de production

# Prisma
npm run postinstall  # Générer le client Prisma (auto après install)

# Linting
npm run lint         # Vérifier le code avec ESLint
```

## 🏗️ Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement :
   - `DATABASE_URL`
   - `URL_REDIS` & `PASSWORD_REDIS`
   - `NEXTAUTH_URL` & `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
   - `API_FOOTBALL_KEY`
3. Déployez !

### Autres plateformes

L'application est compatible avec toutes les plateformes supportant Next.js :
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)

## 🔧 Configuration

### Cache Redis

Le cache Redis expire automatiquement à minuit pour garantir des données fraîches chaque jour.

Configuration dans `utils/expireRedis.ts` :

```typescript
const tomorrow = moment().add(1, "day").startOf("day");
const today = moment();
const MAX_AGE = tomorrow.diff(today); // Expire à minuit
```

### Ligues suivies

Les ligues sont configurées dans `utils/leagues.ts`. Pour ajouter une ligue :

```typescript
export const leagues = [
  { id: "39", name: "Premier League" },
  { id: "140", name: "La Liga" },
  // Ajouter votre ligue ici
];
```

## 🐛 Dépannage

### Erreur de connexion à PostgreSQL

```bash
Error: P1001: Can't reach database server
```

**Solution** : Vérifiez que PostgreSQL est démarré et que `DATABASE_URL` est correct.

### Erreur Redis

```bash
[Redis] Could not connect after 3 attempts
```

**Solution** : Vérifiez `URL_REDIS` et `PASSWORD_REDIS` dans votre `.env`.

### Erreur OAuth Google

```bash
Error 400: redirect_uri_mismatch
```

**Solution** : Ajoutez l'URI de redirection dans Google Cloud Console :
- `http://localhost:3000/api/auth/callback/google` (dev)
- `https://votre-domaine.com/api/auth/callback/google` (prod)

## 📝 License

MIT

## 👤 Auteur

**Saleh Dassoukhi**

- GitHub: [@dassoukhi](https://github.com/dassoukhi)
- Email: dassbosch50@gmail.com

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 🙏 Remerciements

- [API-Football](https://www.api-football.com/) pour les données
- [Vercel](https://vercel.com/) pour l'hébergement
- [Upstash](https://upstash.com/) pour Redis

---

⚡ Généré avec [Claude Code](https://claude.com/claude-code)
