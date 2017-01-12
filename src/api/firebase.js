const firebase = require('firebase');

const firebaseConfig = {
     apiKey: "AIzaSyDbZrqst3exLOFhmaT-kSl07uwq_Seqf-s",
    authDomain: "comforter-co.firebaseapp.com",
    databaseURL: "https://comforter-co.firebaseio.com",
    storageBucket: "comforter-co.appspot.com",
    messagingSenderId: "6139426553"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = firebaseApp;
// module.exports = firebaseApp.database();





// <script src="https://www.gstatic.com/firebasejs/3.6.4/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyDbZrqst3exLOFhmaT-kSl07uwq_Seqf-s",
//     authDomain: "comforter-co.firebaseapp.com",
//     databaseURL: "https://comforter-co.firebaseio.com",
//     storageBucket: "comforter-co.appspot.com",
//     messagingSenderId: "6139426553"
//   };
//   firebase.initializeApp(config);
// </script>