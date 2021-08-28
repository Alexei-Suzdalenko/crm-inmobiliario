<template>
  <div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h5 mb-0 text-gray-800">All themes</h1>
      <span class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" v-on:click="openFormFunc">{{ open_form }}</span>
    </div>
    <div class="card shadow mb-4" v-if="formOpen">
      <div class="card-body">
        <div class="table-responsive">
            <input type="search" class="form-control form-control-sm" placeholder="Title new theme" v-model="titleTheme"><br>
          <span class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" v-on:click="saveThemeNewTheme">{{ save_new_theme }}</span>
        </div>
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>Seen at</th>
              <th>Title theme</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in this.$store.state.suzdalenko.listThemesGlobal" v-bind:key="index">
              <td>{{ item.seen }}</td>
              <td><span class="decoration" v-on:click="saveCurrentThemeAndGoIt(item.id, item.seen)">{{ item.title }}</span></td>
            </tr>  
            </tbody>
          </table>
        </div>
      </div>
    </div> 
  </div>
</template>
<script>
import firebase from 'firebase/app';
import api from '@/api/index';
export default {
  data(){
    return {
      titleTheme: '',
      listThemes: [],
      save_new_theme: 'Save new theme',
      formOpen: false,
      open_form: 'Open form new theme'
    }
  },
  methods: {
    openFormFunc(){
      this.formOpen = !this.formOpen;
      if(this.open_form == 'Open form new theme') {this.open_form = 'Close form'; return; }
      if(this.open_form == 'Close form') {this.open_form = 'Open form new theme'; }
    },
    saveThemeNewTheme(){
      if( !this.titleTheme.trim() ) return;
      this.new_theme = 'Save this theme';
      let stringUid = window.localStorage.getItem('uid');
      let currentContextData = this;
      let currentTime = String(parseInt(new Date().getTime() / 1000));
      this.save_new_theme = 'Saving';

      firebase.database().ref('users/' + stringUid + '/themes/' + currentTime).set({
         title: currentContextData.titleTheme,
         seen: 0,
         id: currentTime
       }).then(() => {
         setTimeout(function (){ currentContextData.save_new_theme = 'Saved';
            setTimeout(function (){ currentContextData.save_new_theme = 'Save new theme'; currentContextData.openFormFunc(); currentContextData.titleTheme = ''; currentContextData.getlistCurrentThemes(); }, 2000);
         }, 1000);
       }).catch((error) => {
          setTimeout(function (){ currentContextData.save_new_theme = 'Error, try one more time';}, 20000);
       });
    },
    saveCurrentThemeAndGoIt(themeId, seenTheme){
      window.localStorage.setItem('currentTheme', themeId);
      api.addThisThemeOneSeem(themeId, seenTheme).then(() => this.getlistCurrentThemes());
      this.$router.push('/dashboard/theme/' + themeId);
    },
    getlistCurrentThemes() {
        api.getListThemes().then((res) => {
          this.$store.commit('pushGlobalListThemes', {'listThemes': res.reverse() });
        });
    }
  },
  created(){
   // this.getlistCurrentThemes()
  }
}
</script>
