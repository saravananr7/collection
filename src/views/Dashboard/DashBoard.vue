<template>
  <div>
    <v-snackbar transition="slide-x-reverse-transition" v-model="snakebar" timeout="6000" :value="true"
      :color="snakebarcolor" top right outlined absolute text-color="white">
      <v-icon class="mr-2" :color="snakebarcolor">mdi-alert-outline</v-icon>
      {{ msg }}
      <v-icon @click="snakebar = false" :color="snakebarcolor" class="float-right">mdi-close-circle</v-icon>
    </v-snackbar>
    <v-row class="mt-14">
      <v-col cols="12" md="12">
        <v-toolbar dense class="elevation-0 tool-sty">
          <p class="title font-weight-bold mb-0">Top Collections</p>
          <v-spacer></v-spacer>
          <v-text-field v-model="searchkeyfield" class="body-2" prepend-inner-icon="mdi-magnify" hide-details
            style="max-width: 270px" label="Search" single-line background-color="#F1F3F8" filled dense rounded />
          <v-btn icon class="ms-1 d-none d-sm-inline-block" color="#000" @click="listView = !listView">
            <v-icon dense>{{
              listView ? "mdi-view-day" : "mdi-view-dashboard"
            }}</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- <v-divider></v-divider> -->
        <div class="cardused">
          <v-row class="mt-2" v-if="!collectload && listView">
            <v-col class="mb-2" v-for="(item, i) in MobsearchItem" :key="i" cols="12" sm="6" md="4">
              <v-card class="rounded-lg px-4 pos-rlt" outlined style="cursor: pointer" @click="
                $router.push({
                  name: 'singlePage stock'
                }), setId(item.id)
                ">
                <p class="mb-0 text-right lh-16">
                  <v-chip class="px-2 text-capitalize" style="top:8px; z-index:1px;" x-small
                    :text-color="item.access === 'free' ? '#4BAC3C' : '#093FBA'"
                    :color="item.access === 'free' ? '#ECF8F1' : '#ccd9ff'"><span>{{ item.access == 'free' ? 'free' :
                      'paid' }}</span></v-chip>
                </p>
                <v-list-item class="px-0">
                  <v-list-item-avatar class="mr-2 mt-auto">
                    <img width="100%" :src="modifyurl(item.basket_img)" />
                  </v-list-item-avatar>
                  <v-list-item-content class="pt-0">
                    <v-list-item-title class="text-uppercase font-weight-medium fs-13 mb-1">
                      {{ item.basket_title }}
                    </v-list-item-title>

                    <v-list-item-subtitle class="fs-12">
                      by <span class="font-weight-medium">{{ item.master_name }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item-subtitle class="mb-2"> <v-chip color="#f1f3f8" text-color="#666666" label
                    class="text--secondary mr-1 text-capitalize px-1" x-small v-for="(j, l) in item.tags" :key="l">{{ j
                    }}</v-chip></v-list-item-subtitle>
                <div style="height: 40px;">
                  <v-list-item three-line class="px-0">
                    <v-list-item-content style="height: 40px;" class="py-0">
                      <v-list-item-subtitle class="mb-auto"> {{ item.mang_sht_con }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <v-list-item class="px-0">
                  <v-list-item-content>
                    <div class="fs-13">
                      <span style="color: gray">Min. Invest</span>
                      <p class="font-weight-medium body-2 mb-0  mt-1">{{ item.price }}</p>
                    </div>
                  </v-list-item-content>
                  <v-list-item-content>
                    <!-- <div class="fs-13">
                      <span style="color: gray">No.of Stocks</span>
                      <p class="font-weight-medium body-2 mb-0 mt-1">
                        {{ item.stockcount }}
                      </p>
                    </div> -->
                    <v-btn block class="elevation-0 rounded-pill text-none txt-fobly font-weight-bold"
                      color="#F1F3F8">Invest</v-btn>
                  </v-list-item-content>
                </v-list-item>



              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-2" v-else-if="!collectload && !listView" no-gutters>
            <v-card v-for="(item, i) in MobsearchItem" :key="i" width="100%" class="my-3 pt-1 pb-2 px-4 " outlined
              @click="
                $router.push({
                  name: 'singlePage stock',
                  params: { best: item.id },
                })
                ">
              <!-- <p class="mb-0 text-right lh-16">
                <v-chip class="px-2 text-capitalize" x-small
                  :text-color="item.access === 'free' ? '#4BAC3C' : '#093FBA'"
                  :color="item.access === 'free' ? '#ECF8F1' : '#ccd9ff'"><span>{{ item.access == 'free' ? 'free' :
                    'paid' }}</span></v-chip>
              </p> -->
              <v-list-item class="px-0">
                <v-list-item-avatar class="mr-2">
                  <v-img :src="modifyurl(item.basket_img)"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>

                  <v-list-item-title class="text-uppercase subtitle-2 mb-1">
                    {{ item.basket_title }}
                  </v-list-item-title>

                  <v-list-item-subtitle class="fs-12">
                    by <span class="font-weight-medium">{{ item.master_name }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content class="pr-1">
                  <p style="display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;" class="mb-0 subtitle-2 txt-666 font-weight-regular lh-20">{{
                    item.mang_sht_con }}</p>
                </v-list-item-content>
                <v-list-item-content>
                  <div class="fs-13">
                    <span style="color: gray">Min. Invest</span>
                    <p class="font-weight-medium body-2 mb-0  mt-1">{{ item.price }}</p>
                  </div>
                </v-list-item-content>
                <v-list-item-content>
                  <div class="fs-13">
                    <span style="color: gray">No.of Stocks</span>
                    <p class="font-weight-medium body-2 mb-0 mt-1">
                      {{ item.stockcount }}
                    </p>
                  </div>
                </v-list-item-content>
                <v-list-item-content class="py-0 pos-rlt">
                  <v-chip class="px-2 text-capitalize pos-abs" style="top:0; right:0;" x-small
                  :text-color="item.access === 'free' ? '#4BAC3C' : '#093FBA'"
                  :color="item.access === 'free' ? '#ECF8F1' : '#ccd9ff'"><span>{{ item.access == 'free' ? 'free' :
                    'paid' }}</span></v-chip>
                  <v-btn class="elevation-0 rounded-pill text-none txt-fobly font-weight-bold mt-5"
                    color="#F1F3F8">Invest</v-btn>
                </v-list-item-content>
              </v-list-item>
              <v-list-item-subtitle> <v-chip color="#f1f3f8" text-color="#666666" label
                  class="text--secondary mr-1 text-capitalize px-1" x-small v-for="(j, l) in item.tags" :key="l">{{
                    j
                  }}</v-chip></v-list-item-subtitle>
            </v-card>
          </v-row>
          <v-row class="mt-2" v-if="collectload">
            <v-col class="mb-2" cols="12" sm="6" md="4" v-for="i in 6" :key="i">
              <v-skeleton-loader type="image" class="custom-skeleton-loader"></v-skeleton-loader>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="3" class="d-none">
        <div style="position: sticky; top: 123px; z-index: 1">
          <v-toolbar class="elevation-0 my-auto transparent px-0 mx-0 tool-sty">
            <p class="subtitle-1 font-weight-bold mb-0">Filters</p>
            <v-spacer></v-spacer>

            <v-btn v-if="!resetbtn" class="font-weight-bold body-1 elevation-0 transparent text-none" text
              style="color:#0037B7;" @click="handleReset" :disabled="resetbtn">reset</v-btn>
          </v-toolbar>

          <v-expansion-panels class="mx-0 py-0 elevation-0 expan" flat style="width: 100%">
            <v-expansion-panel class="px-0 mx-0">
              <v-expansion-panel-header class="px-0 mx-0"> AMU </v-expansion-panel-header>
              <v-expansion-panel-content class="px-0 mx-0">
                <div>
                  <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center "
                    @change="handleRangeChange" color="#FF1717">
                    <template v-slot:prepend>
                      <p :value="range[0]" class="my-auto caption" style="width: 30px" @change="$set(range, 0, $event)">
                        ₹{{
                          range[0] > 1000
                            ? Math.round(range[0] / 1000) + "K"
                            : range[0]
                        }}<span class="caption text--secondary">Cr</span>
                      </p>
                    </template>
                    <template v-slot:append>
                      <p :value="range[1]" class="my-auto caption" @change="$set(range, 1, $event)">
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
  </div>
  <!-- <p class="font-weight-bold caption">Collection</p> -->

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
    resetbtn: true,
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
    handleRangeChange() {
      this.condition = "range";
      this.resetbtn = false
    },
    handleReset() {
      this.condition = "";
      this.resetbtn = true
      this.range = [10, 100000]
    },
    setId(id) {
      localStorage.setItem('id', id)
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
.custom-skeleton-loader>>>.v-skeleton-loader__image {
  height: 198px !important;
}
</style>
