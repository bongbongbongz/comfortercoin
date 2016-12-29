const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyAjACr-KQveUV_CGACrmpIZZww0sYEb1Us",
    authDomain: "smart-money-f702e.firebaseapp.com",
    databaseURL: "https://smart-money-f702e.firebaseio.com",
    storageBucket: "smart-money-f702e.appspot.com",
    messagingSenderId: "723382697493"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = firebaseApp;
// module.exports = firebaseApp.database();