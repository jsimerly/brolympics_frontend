import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_GFB_API_KEY,
    authDomain: import.meta.env.VITE_GFB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_GFB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_GFB_STORAGE_BUCKET,
    messageSenderId: import.meta.env.VITE_GFB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_GFB_APP_ID,
}
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, app }
export default app;
  