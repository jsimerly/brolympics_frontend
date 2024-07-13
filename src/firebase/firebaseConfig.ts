import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_GFB_API_KEY,
    authDomain: import.meta.env.VITE_GFB_AUTH_DOMAIN,
    projectID: import.meta.env.VITE_GFB_PROJECT_ID,
}
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

if (import.meta.env.VITE_APP_ENV === 'DEV') {
    connectAuthEmulator(auth, "http://localhost:9099")
}

export { auth }
export default app;
  