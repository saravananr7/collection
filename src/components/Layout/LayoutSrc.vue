<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <AppBar />
    <v-container class="pt-0">
      <div class="pb-2" style="position: sticky; top: 64px; z-index: 1">
        <v-tabs v-model="tab">
          <v-tab :to="'/collection'" class="text-none text-start" style="color: #0037b7">
            Collection
          </v-tab>
          <v-spacer></v-spacer>
          <v-tab>
            <v-tooltip bottom color="black">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  class="elevation-0 rounded-0 transparent"
                  text
                  height="100%"
                  color="#ffffff"
                  :to="'/orderbook'"
                >
                  <img
                    src="@/assets/usermenu/orderbook_icon.svg"
                    alt="Order book icon"
                  />
                </v-btn>
              </template>
              <span>Order book</span>
            </v-tooltip>
          </v-tab>
          <v-tabs-slider color="#0037B7"></v-tabs-slider>
        </v-tabs>

        <v-divider></v-divider>
      </div>
      <router-view />
    </v-container>
  </div>
</template>

<script>
import AppBar from "../AppBar.vue";
export default {
  data: () => ({
    isLoading: false,
    pagesin: [{ tabname: "Collection", movepath: "/" }],
    tab: null,
  }),
  components: {
    AppBar,
  },
};
</script>

<style>
@import "../..//assets/style.css";
</style>
