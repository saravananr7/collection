<template>
  <!-- <p class="font-weight-bold caption">Collection</p> -->
  <v-row>
    <v-snackbar
      transition="slide-x-reverse-transition"
      v-model="snakebar"
      timeout="6000"
      :value="true"
      :color="snakebarcolor"
      top
      right
      outlined
      absolute
      text-color="white"
    >
      <v-icon class="mr-2" :color="snakebarcolor">mdi-alert-outline</v-icon>
      {{ msg }}
      <v-icon
        @click="snakebar = false"
        :color="snakebarcolor"
        class="float-right"
        >mdi-close-circle</v-icon
      >
    </v-snackbar>
    <v-col cols="12" md="9" class="mt-3">
      <div class="headingSearch">
        <v-toolbar class="elevation-0">
          <div>
            <!-- <v-badge
            :content="collections.length ? collections.length : 0"
            :value="collections.length ? collections.length : 0"
            overlap
            
          > -->
            <p class="title font-weight-bold">Top Collections</p>
            <!-- </v-badge> -->
          </div>
          <v-spacer class="d-none d-sm-inline"></v-spacer>
          <div class="d-block d-sm-flex">
            <v-text-field
              v-model="searchkeyfield"
              class="body-2"
              prepend-inner-icon="mdi-magnify"
              style="max-width: 270px"
              label="Search"
              single-line
              filled
              dense
              rounded
            />
            <v-btn
              icon
              class="ms-1 d-none d-sm-inline-block"
              height="40"
              width="40"
              @click="toggleView"
            >
              <v-icon dense>{{
                listView ? "mdi-view-day":"mdi-view-dashboard" 
              }}</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
      </div>
      <v-divider></v-divider>
      <div class="cardused">
        <v-row class="mt-2" v-if="!collectload && listView">
          <v-col
            class="mb-2"
            v-for="(item, i) in MobsearchItem"
            :key="i"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="elevation-0 rounded-lg py-2"
              outlined
              style="cursor: pointer"
              @click="
                $router.push({
                  name: 'singlePage stock'
                }),setId(item.id)
              "
            >
              <v-toolbar class="elevation-0 pa-0 align-center transparent">
                <img
                  height="50px"
                  width="50px"
                  class="rounded"
                  :src="modifyurl(item.basket_img)"
                />
                <v-spacer></v-spacer>
                <v-chip
                  class="px-4 py-3 rounded-lg mx-auto caption"
                  x-small
                  :style="{
                          color: item.access === 'free' ? '#4BAC3C' : '#093FBA',
                          background:
                            item.access === 'free' ? '#ECF8F1' : '#ccd9ff',
                  }"
                  ><span>{{ item.access }}</span></v-chip
                ></v-toolbar
              >
              <p
                class="text-uppercase py-1 ps-5 mb-0 subtitle-1 font-weight-bold"
              >
                {{ item.basket_title }}
              </p>
              <div class="ps-3 mb-5">
                <v-chip
                  style="background-color: #f1f3f8"
                  label
                  class="text--secondary mx-1 text-capitalize caption mt-2"
                  small
                  v-for="(j, l) in item.tags"
                  :key="l"
                  ><span style="color: #666">{{ j }}</span></v-chip
                >
              </div>
              <v-toolbar class="elevation-0 pt-2 caption transparent">
                <div>
                  <span style="color: gray">MIN. INVEST</span>
                  <p class="body-2">{{ item.price }}</p>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <span style="color: gray">TOTAL STOCKS</span>
                  <p class="font-weight-semibold body-2">
                    {{ item.stockcount }} stocks
                  </p>
                </div>
              </v-toolbar>
            </v-card></v-col
          >
        </v-row>
        <v-row class="mt-2" v-else-if="!collectload && !listView" no-gutters>
          <v-card
            v-for="(item, i) in MobsearchItem"
            :key="i"
            width="100%"
            class="my-3 elevation-0"
            outlined
            @click="
              $router.push({
                name: 'singlePage stock',
                params: { best: item.id },
              })
            "
          >
            <v-list class="px-3 d-flex">
              <v-list-item-icon>
                <img
                  :src="modifyurl(item.basket_img)"
                  width="50"
                  height="50"
                  alt="basket_img"
                />
              </v-list-item-icon>
              <v-list-item-content class="py-1">
                <div class="d-flex">
                  <div>
                    <p class="font-weight-bold text-uppercase mb-2">
                      {{ item.basket_title }}
                      <v-chip
                        class="px-4 py-2 mx-auto caption text-lowercase"
                        small
                        :style="{
                          color: item.access === 'free' ? '#4BAC3C' : '#093FBA',
                          background:
                            item.access === 'free' ? '#ECF8F1' : '#ccd9ff',
                        }"
                        >{{ item.access }}</v-chip
                      >
                    </p>
                    <div class="d-flex">
                      <v-chip
                        style="background-color: #f1f3f8"
                        label
                        class="ml-3 text--secondary text-capitalize caption mx-1"
                        small
                        v-for="(j, l) in item.tags"
                        :key="l"
                        ><span style="color: #666">{{ j }}</span></v-chip
                      >
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                  <div class="d-flex">
                    <div class="caption">
                      <span style="color: gray">MIN. INVEST</span>
                      <p class="body-2 pt-1">
                        {{ item.price }}
                      </p>
                    </div>
                    <div class="caption ms-6">
                      <span style="color: gray">TOTAL STOCKS</span>
                      <p class="font-weight-semibold body-2 pt-1">
                        {{ item.stockcount }} stocks
                      </p>
                    </div>
                  </div>
                </div>
              </v-list-item-content>
            </v-list>
          </v-card>
        </v-row>
        <v-row class="mt-2" v-if="collectload">
          <v-col class="mb-2" cols="12" sm="6" md="4" v-for="i in 6" :key="i">
            <v-skeleton-loader
              type="image"
              class="custom-skeleton-loader"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col cols="3">
      <div style="position: sticky; top: 123px; z-index: 1">
        <v-toolbar class="elevation-0 my-auto transparent px-0 mx-0 tool-sty">
          <p class="subtitle-1 font-weight-bold mb-0">Filters</p>
          <v-spacer></v-spacer>

          <v-btn
            class="font-weight-bold body-1 elevation-0 transparent text-capitalize"
            text
            style="color:#0037B7;"
            @click="handleReset"
            :disabled="resetbtn"
            >Reset</v-btn
          >
        </v-toolbar>

        <v-expansion-panels
          class="mx-0 py-0 elevation-0 expan"
          flat
          style="width: 100%"
        >
          <v-expansion-panel class="px-0 mx-0">
            <v-expansion-panel-header class="px-0 mx-0"> AMU </v-expansion-panel-header>
            <v-expansion-panel-content class="px-0 mx-0"> 
              <div class="">
                <v-range-slider
                  v-model="range"
                  :max="max"
                  :min="min"
                  hide-details
                  class="align-center "
                  @change="handleRangeChange"
                  color="#FF1717"
                >
                  <template v-slot:prepend>
                    <p
                      :value="range[0]"
                      class="my-auto caption"
                      style="width: 30px"
                      @change="$set(range, 0, $event)"
                    >
                      ₹{{
                        range[0] > 1000
                          ? Math.round(range[0] / 1000) + "K"
                          : range[0]
                      }}<span class="caption text--secondary">Cr</span>
                    </p>
                  </template>
                  <template v-slot:append>
                    <p
                      :value="range[1]"
                      class="my-auto caption"
                      @change="$set(range, 1, $event)"
                    >
                      ₹{{
                        range[1] > 1000
                          ? Math.round(range[1] / 1000) + "K"
                          : range[1]
                      }}<span class="caption text--secondary">Cr</span>
                    </p>
                  </template>
                </v-range-slider>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-divider></v-divider>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import apiurl from "@/apiurl";
import axios from "axios";

export default {
  data: () => ({
    collections: [],
    collectload: false,
    snakebar: false,
    snakebarcolor: "#000",
    listView: true,
    msg: "",
    condition: "",
    searchkeyfield: "",
    min: 10,
    max: 100000,
    resetbtn:true,
    range: [10, 100000],
    apiurlcollection: `${apiurl.collectionurl}`,
  }),
  methods: {
    collection() {
      this.collections = [];
      this.collectload = true;
      let config = {
        method: "post",
        url: `${apiurl.collectionurl}/collectiondetails`,
        headers: {},
      };
      var axiosThis = this;
      axios
        .request(config)
        .then((response) => {
          this.collectload = false;
          if (response.data.stat == "ok" && response.data.msg != "No data") {
            axiosThis.collections = response.data.msg;
          } else {
            axiosThis.snakebar = true;
            axiosThis.collectload = false;
            axiosThis.snakebarcolor = "error";
            axiosThis.msg = response.data.msg;
          }
        })
        .catch((error) => {
          console.log(error);
          axiosThis.snakebar = true;
          axiosThis.collectload = false;
          axiosThis.snakebarcolor = "error";
          axiosThis.msg = error;
        });
    },
    modifyurl(itemppath) {
      const modifyurl =
        this.apiurlcollection + "/static/" + itemppath.split("/static/")[1];
      return modifyurl;
    },
    toggleView() {
      this.listView = !this.listView;
    },
    handleRangeChange() {
      this.condition = "range";
      this.resetbtn=false
    },
    handleReset() {
      this.condition = "";
      this.resetbtn=true
      this.range=[10, 100000]
    },
    setId(id){
      localStorage.setItem('id',id)
    }
  },
  computed: {
    MobsearchItem() {
      if (this.condition === "range") {
        return this.collections.filter((item) => {
          return item.price >= this.range[0] && item.price <= this.range[1];
        });
      } else {
        return this.collections.filter((post) => {
          return post.basket_title
            .toLowerCase()
            .includes(this.searchkeyfield.toLowerCase());
        });
      }
    },
  },
  mounted() {
    this.collection();
  },
};
</script>

<style scoped>
.custom-skeleton-loader >>> .v-skeleton-loader__image {
  height: 240px !important;
}
</style>
