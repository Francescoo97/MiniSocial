export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FEED: "/feed",
  PROFILE: "/profile/:id",
} as const;

// Costanti per gli URL dell'app centralizzate cosi che se un URL cambia, lo aggiorni solo qui;
// uso di 'as const' per evitare modifiche accidentali.
