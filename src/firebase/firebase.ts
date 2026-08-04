import { initializeApp } from "firebase/app";
import {
  getMessaging,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
 apiKey: "AIzaSyCsBwpLrVjPtEm1DaFoeOzcWGq2ObeNG08",
  authDomain: "task-manager-7ebf5.firebaseapp.com",
  projectId: "task-manager-7ebf5",
  storageBucket: "task-manager-7ebf5.firebasestorage.app",
  messagingSenderId: "364413316177",
  appId: "1:364413316177:web:c4b70866c00aca9a041c70",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export { onMessage };