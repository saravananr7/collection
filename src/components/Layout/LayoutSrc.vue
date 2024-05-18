<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <AppBar />
  <v-container class="pt-0">
    <div class="pb-2" style="position: sticky; top: 64px;z-index: 1;" >
    <v-tabs  >
        <v-tab
          v-for="(item, index) in pagesin"
          :key="index"
          class="text-none" :to="item.movepath"
          >{{ item.tabname }}</v-tab
        >
        <v-spacer></v-spacer>
        <v-tooltip bottom color="black">
        <template v-slot:activator="{on,attrs}">
        <v-btn v-on="on" v-bind="attrs" class="elevation-0 mr-2 px-8 rounded-0" height="100%" color="#ffffff" to="/orderbook" ><img src="@/assets/usermenu/orderbook_icon.svg" alt=""></v-btn></template>
        <span>Order book</span>
      </v-tooltip>
      </v-tabs>
      <v-divider></v-divider></div>
    <router-view />  
  </v-container>
  </div>
</template>

<script>
import AppBar from "../AppBar.vue";
export default {
    data: () => ({
      isLoading: false,
        pagesin: [{'tabname':"Collection","movepath":"/"}],
        
    }),
    components:{
        AppBar
    }
}

</script>

<style >
@import '../..//assets/style.css';

</style>