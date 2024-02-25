import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXnrrSIZqe2Ql5ppfyPjPjTMrzcz8XgpE",
  authDomain: "pisici-765a3.firebaseapp.com",
  projectId: "pisici-765a3",
  storageBucket: "pisici-765a3.appspot.com",
  messagingSenderId: "625253649367",
  appId: "1:625253649367:web:c30b553aef900486b65992"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);