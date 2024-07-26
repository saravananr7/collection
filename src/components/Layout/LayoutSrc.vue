<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <AppBar />
    <v-container class="pt-0">
      <div class="pb-2 d-none  d-lg-block d-xl-block" style="position: sticky; top: 64px; z-index: 1">
        <v-tabs v-model="tab">
          <v-tab  :to="'/collection'" class="text-none text-start d-none mt-5 d-lg-block d-xl-block">
            Collection
          </v-tab>
          <v-spacer></v-spacer>

          <v-tab class="d-none mt-5 d-lg-block d-xl-block"  :to="'/holding'">
           
           <v-tooltip bottom color="black">
              <template v-slot:activator="{ on, attrs }">
                <div v-on="on" v-bind="attrs">
                  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.71387 4.37662V1H12.4282V4.37662" stroke="#666" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.85714 11.1302H1V5.50249C1 5.20398 1.12041 4.9177 1.33474 4.70662C1.54906 4.49554 1.83975 4.37695 2.14286 4.37695H17C17.3031 4.37695 17.5938 4.49554 17.8081 4.70662C18.0224 4.9177 18.1429 5.20398 18.1429 5.50249V11.1302H11.2857" stroke="#666" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.9997 13.3809V15.6319C16.9997 15.9305 16.8793 16.2167 16.665 16.4278C16.4507 16.6389 16.16 16.7575 15.8569 16.7575H3.28544C2.98233 16.7575 2.69164 16.6389 2.47731 16.4278C2.26299 16.2167 2.14258 15.9305 2.14258 15.6319V13.3809" stroke="#666" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.287 8.87891H7.8584V13.3811H11.287V8.87891Z" stroke="#666" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
              </template>
              <span>Holding</span>
            </v-tooltip>
          </v-tab>

         

          <v-tab class="d-none mt-4 d-lg-block d-xl-block" :to="'/orderbook'">
            <v-tooltip bottom color="black">
              <template v-slot:activator="{ on, attrs }">
                <div v-on="on" v-bind="attrs">
                  <img src="@/assets/usermenu/orderbook_icon.svg" alt="Order book icon" />
                </div>
              </template>
              <span>Order book</span>
            </v-tooltip>
          </v-tab>
          <v-tab class="d-none mt-5 d-lg-block d-xl-block" :to="'/sip'">
            SIP
            <v-tooltip bottom color="black">
             
              <span>SIP</span>
            </v-tooltip>
          </v-tab>
          <v-tabs-slider color="#0037B7"></v-tabs-slider>
        </v-tabs>

        <v-divider class="d-none  d-lg-block d-xl-block"></v-divider>
       
      </div>
      <v-footer
      v-bind="localAttrs"
      class="d-block d-lg-none"
      style="margin-top: 54px;"
      :padless="padless"
     
    >
      <v-card
        flat
        tile
        width="100%"
        class="  text-center"
      >
      <v-tabs v-model="tab" grow class="pa-0 ma-0">
        <v-tab :to="'/collection'"  class="text-none pa-0 ma-0 tab-container text-start">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.957 11.916C19.2352 11.916 21.082 10.0692 21.082 7.79102C21.082 5.51284 19.2352 3.66602 16.957 3.66602C14.6789 3.66602 12.832 5.51284 12.832 7.79102C12.832 10.0692 14.6789 11.916 16.957 11.916Z" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
<path d="M11.9167 13.75H5.5V20.1667H11.9167V13.75Z" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
<path d="M1.83203 9.16667L5.4987 2.75L9.16536 9.16667H1.83203Z" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
</svg>
<span class="overline text-none mb-0">Collection</span>

            
          </v-tab>

          <v-tab  :to="'/holding'" class="tab-container">
   
            <svg width="33" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.83333 14.666H3.5V19.666H6.83333V14.666Z" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
<path d="M13.5013 8.83398H10.168V19.6673H13.5013V8.83398Z" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
<path d="M20.1654 3H16.832V19.6667H20.1654V3Z" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
</svg>
    <span class="overline text-none mb-0">Holding</span>
     
          </v-tab>

         

          <v-tab :to="'/orderbook'" class="tab-container">
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.8">
<path d="M4 6.00195H19" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10"/>
<path d="M19 19.5H4V6L7 3H16L19 6V19.5Z" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
<path d="M15.25 9.75C15.25 11.85 13.6 13.5 11.5 13.5C9.4 13.5 7.75 11.85 7.75 9.75" stroke="#666666" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/>
</g>
</svg>
    <span class="overline text-none mb-0">Order book</span>
  </v-tab>

          <v-tab  :to="'/sip'" class="tab-container">
            <!-- <div class="mt-1"> -->
            <svg width="23" height="22" viewBox="0 0 18 20"  fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 8.63134L16.5 4.46467L9.405 0.523003C9.28113 0.45412 9.14174 0.417969 9 0.417969C8.85826 0.417969 8.71887 0.45412 8.595 0.523003L1.5 4.46467L9 8.63134Z" fill="#666666"/>
<path d="M8.16797 10.0749L0.667969 5.9082V14.5849C0.667963 14.7334 0.707671 14.8793 0.782981 15.0073C0.858292 15.1354 0.966466 15.241 1.0963 15.3132L8.16797 19.2415V10.0749Z" fill="#666666"/>
<path d="M9.83594 10.076V19.2427L16.9076 15.3143C17.0374 15.2421 17.1456 15.1365 17.2209 15.0085C17.2962 14.8804 17.3359 14.7345 17.3359 14.586V5.91016L9.83594 10.076Z" fill="#666666"/>
</svg>
<!-- </div> -->
    <span class="overline text-none mb-0">SIP</span>
  <!-- </p> -->
            <!-- SIP -->
            <!-- <v-tooltip bottom color="black">
             
              <span>SIP</span>
            </v-tooltip> -->
          </v-tab>
          <v-tabs-slider color="#0037B7"></v-tabs-slider>
        </v-tabs>

       
      </v-card>
    </v-footer>

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
    tab: 0,
   
     
      padless: true,
      variant: 'fixed',
  }),
  components: {
    AppBar,
  },
  created() {
    let path = window.location.pathname;
    path == '/orderbook' ? this.tab = 1 : this.tab = 0
  },
  computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
};
</script>

<style>
@import "../..//assets/style.css";

.v-tabs-bar {
    border-radius: inherit;
    /* height: 0px; */
}

</style>

<style scoped>
.tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-container {
  margin-top: 8px; 
}

.icon-image {
  width: 24px;
  height: 24px;
}
</style>
