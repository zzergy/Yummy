import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
    //Put your sdk here..
  };

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth(); 
export default app;