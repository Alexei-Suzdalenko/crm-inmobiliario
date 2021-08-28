<template>
  <div class="form-group">
    <input type="email" class="form-control form-control-user" v-model="email" aria-describedby="emailHelp" placeholder="Introduzca el correo electrónico...">
  </div>
  <div class="form-group">
    <input type="text" class="form-control form-control-user" v-model="password" placeholder="Contraseña">
  </div>
  <div class="form-group">
    <div class="custom-control custom-checkbox small">
      <input type="checkbox" class="custom-control-input" id="customCheck">
      <label class="custom-control-label" for="customCheck">Recuérdame</label>
    </div>
  </div>
  <span class="btn btn-primary btn-user btn-block" v-on:click="tryLogin">{{ login }}</span>
  <br>
    <div class="text-center">
      <router-link class="small" to="/register">Registrarse</router-link>
    </div>
</template>
<script>
import firebase from 'firebase/app';
export default {
  data(){
    return {
      email: window.localStorage.getItem('email') || '',
      password:  window.localStorage.getItem('password') || '',
      login: 'ENTRAR'
    }
  },
  methods: {
    tryLogin(){ this.login = 'Iniciando sesión...';
      let currentContext = this;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => { this.login = 'Ha iniciado la sesión';
            window.localStorage.setItem('uid', userCredential.user.uid);
            window.localStorage.setItem('email', this.email);
            window.localStorage.setItem('password', this.password);
            setTimeout(function(){
                  currentContext.$router.push('/dashboard/all-items');             
              }, 1500);
          })
          .catch((error) => { currentContext.login = error.message;
            let errorCode = error.code;
            let errorMessage = error.message;
          });
    }
  }
}
</script>