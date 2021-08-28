<template>
  <div class="form-group">
    <input type="text" class="form-control form-control-user" v-model="username" aria-describedby="emailHelp" placeholder="Introduzca el nombre..">
  </div>
  <div class="form-group">
    <input type="email" class="form-control form-control-user" v-model="email" aria-describedby="emailHelp" placeholder="Introduzca el correo electrónico..">
  </div>
  <div class="form-group">
    <input type="text" class="form-control form-control-user" v-model="password" placeholder="Contraseña">
  </div><br>
  <span class="btn btn-primary btn-user btn-block" v-on:click="tryToRegister">{{ login }}</span><br>
  <div class="text-center">
    <router-link class="small" to="/">¿Ya tienes una cuenta? Inicie sesión</router-link>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import apiinmob from '@/api/apiinmob';
// import lang from '@/languages/reslang'; let language = lang.language;
export default {
    data(){
        return{
            username: window.localStorage.getItem('username') || '',
            email:    window.localStorage.getItem('email') || '',
            password: window.localStorage.getItem('password') || '',
            login: 'REGISTRARSE',
        }
    },
    created(){
      console.log(this.language)
    },
    methods: {
      tryToRegister(){
         let currentContextApp = this;
         if(this.username != '' && this.username.length > 3){ 
             currentContextApp.login = 'Intentando registrarse';
             firebase.auth().createUserWithEmailAndPassword(currentContextApp.email, currentContextApp.password).then((userCredential) => {
             
             window.localStorage.setItem('username', currentContextApp.username);
             window.localStorage.setItem('uid', userCredential.user.uid);
             window.localStorage.setItem('email', currentContextApp.email);
             window.localStorage.setItem('password', currentContextApp.password);
             currentContextApp.login = 'Estás registrado';

             currentContextApp.saveUserData (userCredential.user.uid, currentContextApp.username, currentContextApp.email);
             setTimeout(() => { currentContextApp.$router.push('/'); }, 1000);
           })
            .catch((error) => {
              currentContextApp.login = error.message;
              setTimeout(() => { currentContextApp.login = 'REGISTRARSE'; }, 2000);
            });
         } else {
           currentContextApp.login = 'Ingrese el nombre correctamente';
           setTimeout(() => { currentContextApp.login = 'REGISTRARSE'; }, 2000);
         }
      },

      saveUserData(uid, username, email){
        let user = {};
        user.uid = uid; user.username = username; user.email = email;
        apiinmob.pushUserData(user);
      },
     
    },
}
</script>