MiniSocial 🌐

Un'app social feed full-stack costruita con React, TypeScript e Supabase. Gli utenti possono registrarsi, pubblicare post, mettere like e visualizzare il proprio profilo.

Link per demo:
mini-social-awgr4bj4h-francesco97.vercel.app


✨ Funzionalità


Autenticazione — registrazione e login con email/password tramite Supabase Auth
Feed — visualizzazione di tutti i post in ordine cronologico
Creazione post — pubblicazione di nuovi contenuti con validazione
Like — sistema di like con toggle (aggiungi/rimuovi) persistito su database
Profilo utente — visualizzazione dei propri post e statistiche (post totali, like ricevuti)
Rotte protette — accesso al feed e al profilo solo per utenti autenticati
Responsive — layout mobile first con breakpoint per tablet (768px) e desktop (1024px)



🛠️ Stack Tecnico

React 18 per UI e gestione dello stato
TypeScript per tipizzazione statica
Vite per Build tool e dev server
React Router v6 per navigazione e rotte protette
Supabase per database PostgreSQL, Auth e RLS
React Hook Form per gestione dei form
Zod per validazione degli schemi
CSS per stile responsive con clamp() e media query


🏗️ Architettura

Struttura cartelle

src/
  components/
    ui/           # Componenti UI riutilizzabili (PostCard)
    forms/        # Form (FormPost)
    layout/       # Layout (NavBar, ProtectedRoutes, PublicRoutes)
    posts/        # Componenti specifici per i post (PostCardWrapper)
  context/
    AuthContext   # Stato globale autenticazione
    PostContext   # Stato globale post
  hooks/
    useLike       # Hook custom per la logica dei like
  lib/
    supabase      # Client Supabase
  pages/          # Pagine dell'app
  types/          # Tipi TypeScript
  constants/      # Costanti (rotte)

Pattern utilizzati

Context API — lo stato dell'utente loggato (AuthContext) e dei post (PostContext) è condiviso globalmente, evitando il prop drilling.

Container/Presenter — PostCardWrapper gestisce la logica dei like tramite useLike, mentre PostCard si occupa esclusivamente del render. Questo mantiene i componenti UI puri e riutilizzabili.

Custom Hook — useLike incapsula tutta la logica dei like (fetch, insert, delete su Supabase) e può essere riutilizzato in qualsiasi componente.

Rotte protette — ProtectedRoutes e PublicRoutes gestiscono i redirect in base allo stato di autenticazione, con supporto per il loading state iniziale di Supabase.


🔒 Supabase e RLS

Il database utilizza Row Level Security (RLS) per proteggere i dati


📋 Form e Validazione

I form utilizzano React Hook Form con Zod per la validazione:


Registrazione — username (min 3 caratteri), email valida, password (min 8 caratteri, almeno un numero)
Login — email valida, password (min 8 caratteri), gestione errori server con setError('root')
Crea post — contenuto obbligatorio (min 1 carattere)



📱 Responsive Design

L'app è costruita con approccio mobile first:


Font-size fluidi con clamp() per scalare tra viewport piccoli e grandi
Layout a colonna su mobile, adattivo su tablet e desktop
Breakpoint: 768px (tablet), 1024px (desktop)



⚙️ Installazione locale

#Clona il repository
git clone https://github.com/Francescoo97/MiniSocial.git
cd MiniSocial

#Installa le dipendenze
npm install

#Crea il file .env con le credenziali Supabase
cp .env.example .env
#Inserisci VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY

#Avvia il server di sviluppo
npm run dev


🗄️ Schema Database

sqlprofiles (id, username, avatar_url, created_at)
posts    (id, author_id → profiles.id, content, image_url, created_at)
likes    (id, user_id → profiles.id, post_id → posts.id, created_at)


👨‍💻 Autore

Francesco Costantini — Junior Frontend Developer
