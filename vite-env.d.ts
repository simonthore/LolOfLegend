/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_RIOT_API_KEY: string;
    // Ajoutez d'autres variables d'environnement si nécessaire
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  