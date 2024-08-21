interface ImportMetaEnv {
    VITE_PRODUCT_URL:any;
    VITE_BASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  