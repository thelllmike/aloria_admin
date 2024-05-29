import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2bh4vqNobHA3G19wNWAxhfZZJkaDKxC0",
    authDomain: "skin-detection-440e4.firebaseapp.com",
    projectId: "skin-detection-440e4",
    storageBucket: "skin-detection-440e4.appspot.com",
    messagingSenderId: "301443102586",
    appId: "1:301443102586:web:08478a0194157bbd3748c3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };