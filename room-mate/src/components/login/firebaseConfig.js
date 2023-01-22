import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyC5bVnNFlyuRHVC22rhg849jiWFrZCMZ8M",
  authDomain: "roommate-331020.firebaseapp.com",
  projectId: "roommate-331020",
  storageBucket: "roommate-331020.appspot.com",
  messagingSenderId: "537240050348",
  appId: "1:537240050348:web:43eee27e1bf4732469dd09"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);