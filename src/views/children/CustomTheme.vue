<template>
  <div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h5 mb-0 text-gray-800">{{ theme.title }}</h1>
      <router-link v-bind:to="'/dashboard/' + theme.title + '/new-item'" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">New item</router-link>
    </div>
    <div class="card shadow mb-4" v-if="isLoading">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>Seen at</th>
              <th>Title item</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in listItemsCurrentTheme" v-bind:key="index">
              <td><i v-on:click="goToCurrentItem(item.id, item.seen)" class="fa fa-arrow-up fafontsize"></i> {{ item.seen }}</td>
              <td><router-link v-bind:class="item.__state === 'pendientIssueGreen' ? 'greenBackground': ''" v-on:click="setMoreSeen(item.id, item.seen)" v-bind:to="'/dashboard/item/' + item.id" class="decoration">{{ item.title }}</router-link></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <span class="small-text">{{ themeId }}</span>
  </div>
</template>
<script>
import api from '@/api/index';
export default {
  data() {
    return {
      isLoading: true,
      theme: {},
      listItemsCurrentTheme: Array
    }
  },
   computed:{
     themeId(){
       this.refreshData();
       return this.$route.params.id;
     }
   },
  created() {

  },
  methods: {
    refreshData(){
      api.getDataCurrentTheme(this.$route.params.id).then((res) => {
        this.theme = res; this.$store.commit('pushCurrentGlobalTheme', res );
      });
      api.getListTitlesFromCurrentTheme(this.$route.params.id).then((res) => {
        this.listItemsCurrentTheme = res;
      });
    },
    goToCurrentItem(itemId, seen){
        this.addOneSeem(itemId, seen)
        window.open('/dashboard/item/' + itemId);
    },
    setMoreSeen(itemId, seen){
      this.addOneSeem(itemId, seen)
    },
    addOneSeem(itemId, seen){
        api.addNewSeenFromCurrentItem(itemId, seen);
    }
  }
}
</script>