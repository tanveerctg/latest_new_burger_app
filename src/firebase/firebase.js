import  firebase from 'firebase';
var config = {
  apiKey: "AIzaSyDY-wmG7l38fTdCKa5WeFevbmqZIUkGJnc",
  authDomain: "testing-bc79f.firebaseapp.com",
  databaseURL: "https://testing-bc79f.firebaseio.com",
  projectId: "testing-bc79f",
  storageBucket: "testing-bc79f.appspot.com",
  messagingSenderId: "573436584778"
};
firebase.initializeApp(config);

const googleProvider = new firebase.auth.GoogleAuthProvider();

const fbProvider=new firebase.auth.FacebookAuthProvider();
const database=firebase.database();

export {firebase,googleProvider,database,fbProvider};