import { createApp } from 'vue';
import App from './App.vue';
// import './registerServiceWorker'
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import lang from '@/languages/reslang';

var firebaseConfig = {
    apiKey: "AIzaSyAr0Wa_8q0Gacc9EsdVvb_oomnPPH7tydE",
    authDomain: "crm-inmobiliario-software.firebaseapp.com",
    databaseURL: "https://crm-inmobiliario-software-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crm-inmobiliario-software",
    storageBucket: "crm-inmobiliario-software.appspot.com",
    messagingSenderId: "840909875093",
    appId: "1:840909875093:web:2b9a00e4c3e7edd862789c",
    measurementId: "G-80ERCDKS26"
};
firebase.initializeApp(firebaseConfig); // firebase.analytics();

let app = createApp(App)
app.config.globalProperties.language = lang.languageObj;
app.use(store).use(router).mount('#app');
