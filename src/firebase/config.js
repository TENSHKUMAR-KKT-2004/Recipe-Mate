import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCf126Fybj4B4RU6huFL8Zk6wNiuJ7p33k",
    authDomain: "recipe-mate-site.firebaseapp.com",
    projectId: "recipe-mate-site",
    storageBucket: "recipe-mate-site.appspot.com",
    messagingSenderId: "1078586991296",
    appId: "1:1078586991296:web:c4108d25f473969e020325"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const firestore = firebase.firestore()

export { firestore }