interface ImportMetaEnv {
    readonly VITE_GFB_API_KEY: string,
    readonly VITE_GFB_AUTH_DOMAIN: string,
    readonly VITE_GFB_PROJECT_ID: string,
    readonly VITE_GFB_STORAGE_BUCKET: string,
    readonly VITE_GFB_MESSAGING_SENDER_ID: string,
    readonly VITE_GFB_APP_ID: string,

    readonly VITE_APP_ENV: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}