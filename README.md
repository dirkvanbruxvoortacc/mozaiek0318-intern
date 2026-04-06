# Deelkracht — Mozaiek 0318

Een mobiele vrijwilligers rooster app voor Mozaiek 0318, geïntegreerd met Planning Center Online.

## Functies

- 🔐 **Inloggen via Planning Center** (OAuth2)
- 📅 **Mijn Rooster** — Bekijk aankomende diensten, bevestig of meld je af
- 👥 **Team** — Bekijk alle teams en hun leden
- 👤 **Profiel** — Jouw account informatie en uitloggen
- 📱 **Mobile-first** design in de stijl van Mozaiek 0318

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) voor PCO OAuth2
- [Planning Center API](https://api.planningcenteronline.com/)

## Installatie

### 1. Vereisten

- Node.js 18+
- Een Planning Center account met admin toegang
- Een geregistreerde OAuth app op https://api.planningcenteronline.com/oauth/applications

### 2. OAuth App instellen in Planning Center

1. Ga naar https://api.planningcenteronline.com/oauth/applications
2. Klik op **New Application**
3. Vul in:
   - **Name**: Deelkracht
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/planningcenter` (voor development)
   - **Scopes**: `people services`
4. Kopieer de **Application ID** (Client ID) en **Secret**

### 3. Project instellen

```bash
npm install
cp .env.example .env.local
```

Bewerk `.env.local` en vul je gegevens in:

```env
PCO_CLIENT_ID=jouw_planning_center_client_id
PCO_CLIENT_SECRET=jouw_planning_center_client_secret
NEXTAUTH_SECRET=genereer_met_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

### 4. Development server starten

```bash
npm run dev
```

Open http://localhost:3000 in je browser.

## Productie deployment

### Vercel (aanbevolen)

1. Push naar GitHub
2. Importeer het project in Vercel
3. Voeg de environment variabelen toe
4. Pas de Redirect URI aan: `https://jouw-domein.vercel.app/api/auth/callback/planningcenter`
5. Zet `NEXTAUTH_URL` op je productie URL

## API Routes

| Route | Methode | Beschrijving |
|-------|---------|--------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js handler |
| `/api/pco/me` | GET | Huidig gebruikersprofiel |
| `/api/pco/schedules` | GET | Aankomende diensten |
| `/api/pco/schedules/[id]` | PATCH | Bevestigen of afmelden |
| `/api/pco/service-types` | GET | Service types |
| `/api/pco/teams` | GET | Teams |
| `/api/pco/teams/members` | GET | Team leden |

## Schermen (Figma nodes)

| Node | Scherm |
|------|--------|
| 0-810 | Login / Welkomst |
| 0-902 | Home / Dashboard |
| 0-904 | Mijn Rooster |
| 0-906 | Team |
| 0-908 | Profiel |

## Licentie

Zie LICENSE.md
