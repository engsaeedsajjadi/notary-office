/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** شناسه اندازه‌گیری Google Analytics 4 — مثلاً G-XXXXXXXXXX */
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
