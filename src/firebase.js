import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA7uLZNj11QETp_2FkxlWgAJJo5Dt7JQK0",
  authDomain: "yummy-dev-2f6d6.firebaseapp.com",
  databaseURL: "https://yummy-dev-2f6d6-default-rtdb.firebaseio.com",
  projectId: "yummy-dev-2f6d6",
  storageBucket: "yummy-dev-2f6d6.appspot.com",
  messagingSenderId: "637364639138",
  appId: "1:637364639138:web:0c7fed5f516a869e13cefb"
  };

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth(); 
export default app;
