# 🏢 Alutec Glass - Website & Calculator de Preț

Un website modern, interactiv și complet responsiv construit pentru **Alutec Glass**, specializat în sisteme de sticlă glisantă și culisantă pentru terase și balcoane. 

Proiectul include prezentarea produselor, generare de schițe dinamice, un calculator de preț în timp real și un sistem de comenzi bazat pe coș de cumpărături.

## ✨ Tehnologii Folosite

Acest proiect este construit pe o fundație modernă și extrem de rapidă:

### 🎯 Core & UI
- **⚡ Next.js** - Framework React pentru producție (App Router)
- **📘 TypeScript** - Pentru un cod sigur, stabil și ușor de întreținut
- **🎨 Tailwind CSS** - Framework CSS utility-first pentru design responsiv
- **🧩 shadcn/ui** - Componente de interfață premium, accesibile (Radix UI)
- **🎯 Lucide React** - Librărie de iconițe moderne

### ⚙️ Funcționalități Cheie
- **🧮 Calculator Dinamic:** Calculează prețul instant în funcție de lățime, înălțime, număr de panouri, tip de profil și culoarea sticlei.
- **🛒 Sistem de Coș (State Management local):** Salvarea configurațiilor în `localStorage` folosind un manager customizat.
- **📧 Integrare Web3Forms:** Formular de checkout care preia datele din coș și le trimite direct pe adresa de email a administratorului, fără a necesita un server de backend complicat.
- **📐 Schițe Vizuale (SVG):** Generare automată a schiței sistemului de sticlă pe baza dimensiunilor introduse de client.
- **📱 Mobile-First:** Design perfect adaptabil pe telefoane, tablete și desktop.

## 🚀 Ghid de Instalare (Quick Start)

Dacă dorești să rulezi proiectul local pe calculatorul tău, urmează acești pași:

1. Instalează pachetele necesare
npm install

2. Pornește serverul de dezvoltare
npm run dev

Deschide http://localhost:3000 în browser pentru a vedea website-ul.

## 🌍 Publicare (Deployment)

Proiectul este configurat pentru a rula flexibil în funcție de platformă (gestionat prin variabila `basePath`):

### Varianta 1: GitHub Pages (Pentru Testare/Prezentare)
Dacă publici pe GitHub Pages, imaginile și rutele folosesc sufixul repository-ului.

Compilează și publică automat pe ramura gh-pages:
npm run deploy

*Notă: Funcția de trimitere email prin API route intern nu este suportată de GitHub Pages (necesită trecerea pe API extern precum Web3Forms).*

### Varianta 2: Vercel (Recomandat pentru Producție)
Cea mai bună platformă pentru găzduirea aplicațiilor Next.js.
1. Asigură-te că `basePath` este lăsat gol (`''`) în fișiere pentru găzduirea pe un domeniu principal (ex: `www.alutecglass.ro`).
2. Importă repository-ul de pe GitHub în Vercel.
3. Adaugă variabila de mediu necesară pentru formular (`WEB3FORMS_ACCESS_KEY`).
4. Apasă "Deploy".

## 📁 Structura Proiectului

src/
├── app/                 # Paginile și rutele aplicației (Next.js App Router)
│   ├── acasa/           # Pagina principală
│   ├── calcul/          # Calculatorul de preț
│   ├── contact/         # Pagina de contact
│   ├── cos/             # Coșul de cumpărături
│   ├── produse/         # Lista de sisteme
│   └── api/             # API Routes (ex: send-email)
├── components/          # Componente React reutilizabile (inclusiv shadcn/ui)
├── lib/                 # Utilitare (calculator de preț, management coș)
└── public/              # Fișiere statice (imagini, iconițe, ghid PDF)

---
*Construit cu pasiune pentru a simplifica procesul de ofertare și achiziție a sistemelor premium din sticlă.*