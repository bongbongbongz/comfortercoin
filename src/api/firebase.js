const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyC6QYwP_DDV54lNKbE0nsSnwWuodoNzeAY",
    authDomain: "comfortercoin-3db32.firebaseapp.com",
    databaseURL: "https://comfortercoin-3db32.firebaseio.com",
    storageBucket: "comfortercoin-3db32.appspot.com",
    messagingSenderId: "96841691832"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = firebaseApp;
// module.exports = firebaseApp.database();




// <script src="https://www.gstatic.com/firebasejs/3.6.4/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyC6QYwP_DDV54lNKbE0nsSnwWuodoNzeAY",
//     authDomain: "comfortercoin-3db32.firebaseapp.com",
//     databaseURL: "https://comfortercoin-3db32.firebaseio.com",
//     storageBucket: "comfortercoin-3db32.appspot.com",
//     messagingSenderId: "96841691832"
//   };
//   firebase.initializeApp(config);
// </script>