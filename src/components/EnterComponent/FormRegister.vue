<template>
  <div class="form-group">
    <input type="email" class="form-control form-control-user" v-model="email" aria-describedby="emailHelp" placeholder="Introduzca el correo electrónico...">
  </div>
  <div class="form-group">
    <input type="text" class="form-control form-control-user" v-model="password" placeholder="Contraseña">
  </div><br>
  <span class="btn btn-primary btn-user btn-block" v-on:click="tryLogin">{{ login }}</span><br>
  <div class="text-center">
    <router-link class="small" to="/">¿Ya tienes una cuenta? Inicie sesión</router-link>
  </div>
</template>

<script>
export default {
    data(){
        return{
            email: window.localStorage.getItem('email') || '',
            password:  window.localStorage.getItem('password') || '',
            login: 'REGISTRARSE',
        }
    }
}
</script>