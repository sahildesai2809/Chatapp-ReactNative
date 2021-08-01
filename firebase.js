import firebase  from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyDPcGJ4ISLqTQG219yh3oSxgG6J_IFvPAk",
  authDomain: "nativechat-11402.firebaseapp.com",
  projectId: "nativechat-11402",
  storageBucket: "nativechat-11402.appspot.com",
  messagingSenderId: "468998256388",
  appId: "1:468998256388:web:1fe8e291da6b6df6868251",
};

let app;
if (firebase.apps.length === 0){
   app = firebase.initializeApp(firebaseConfig);

} else {
    app = firebase.app()
}
 
// firebase.initializeApp(firebaseConfig);


const db = app.firestore();
const auth = firebase.auth()

export {db,auth}