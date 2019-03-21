import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBjomoN0A-YCCTiLXfmU_6_gexwxw5fdKk",
    authDomain: "gymexercises-dfcd5.firebaseapp.com",
    databaseURL: "https://gymexercises-dfcd5.firebaseio.com",
    projectId: "gymexercises-dfcd5",
    storageBucket: "gymexercises-dfcd5.appspot.com",
    messagingSenderId: "1099018727241"
};
var fire = firebase.initializeApp(config);
export default fire;