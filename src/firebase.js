import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBHOytnoGZvK3bTMdrYJM9gdxDVy1Jmt1s",
    authDomain: "piece-by-peace.firebaseapp.com",
    databaseURL: "https://piece-by-peace.firebaseio.com",
    projectId: "piece-by-peace",
    storageBucket: "piece-by-peace.appspot.com",
    messagingSenderId: "280408012510"
};

firebase.initializeApp(config);

export const leaderboardDbRef = firebase.database().ref('/leaderboard');

export default firebase;