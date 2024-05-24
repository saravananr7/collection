<template>
  <div>

    <v-snackbar class="snakbar-sty rounded-pill mt-sm-16" transition="slide-x-reverse-transition" v-model="snackbar"
      timeout="6000" :value="true" :color="snackcolor" top right outlined fixed text-color="white">
      <v-icon class="mr-2" :color="snackcolor">mdi-alert-outline</v-icon>
      {{ snackbarmsg }}
      <v-icon @click="snackbar = false" class="float-right" :color="snackcolor">mdi-close-circle</v-icon>
    </v-snackbar>
    <p style="word-spacing: 5px" class="mb-0 pt-16 caption">
      <span style="color: #003f9e; cursor: pointer; " @click="$router.push('/')">Collection</span>
      <span style="color: #000; "> > </span>
      <span style="color: #003f9e; cursor: pointer; "
        @click="$router.push('/collection/singlepage')">SinglePage</span>
      <span style="color: #000; "> > </span>
      <span style="color: #000; ">Customize</span>
    </p>
    <v-row no-gutters>
      <p class="title mt-3">Customize Collection</p>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex">
          <div class="d-flex">
            <!-- <v-btn icon class="elevation-0 text-none py-5 transparent blue--text lighten-2 mr-4 px-0" >
                <v-icon>mdi-plus</v-icon>
            </v-btn> -->
            <v-autocomplete outlined rounded dense  v-model="orderscitt" return-object :search-input.sync="searchaa"
              :items="searchdataaa" item-text="tsym" item-key="tsym" placeholder="Search Symbol" required hide-details
              hide-selected no-filter append-icon="" style="
                font-size: 13px;
                min-width: 240px;
                background-color: #f1f3f8;
              " solo flat @change="setValue()" :loading="autoload" class="tophundraedmutual searchfundlabel"
              oninput="this.value = this.value.toUpperCase()"><template #append><v-icon v-if="orderscitt"
                  @click="orderscitt = ''" size="14">mdi-close</v-icon></template>
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title class="text-center subtitle-2 font-weight-bold textfnt">
                    Type more than 2 letter
                  </v-list-item-title>
                </v-list-item>
                <p color="#999999" class="mb-0 caption textfnt text-center">
                  Eg. for Nifty Type: Nif
                </p>
              </template>
            </v-autocomplete>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex">
            <v-tooltip bottom color="black">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="elevation-0 transparent caption pa-0 mx-6 font-weight-bold" style="color: black"
                  @click="resetsigleres()" outlined icon v-bind="attrs" v-on="on"><v-icon>mdi-refresh</v-icon></v-btn>
              </template>
              <span>Reset Values</span>
            </v-tooltip>
            <v-select rounded style="max-width: 220px;" background-color="#f1f3f8" v-model="weightselected"
              :items="weightedChange" @change="
                weightselected == 'Equial-Weighted' ? changetoEqualWeight() : ''
                " required append-icon="mdi-chevron-down" filled dense hide-details class="body-2 pt-1 text-center"></v-select>
          </div>
        </div>
        <v-row class="text--secondary subtitle-2 font-weight-medium py-1 pt-4 my-0" no-gutters>
          <v-col cols="4" class="py-0">
            <p class="mb-0">Segments and stocks</p>
          </v-col>
          <v-col cols="2">Price</v-col>
          <v-col cols="3" class="py-0">
            <span> Weightage (%)</span>
          </v-col>
          <v-col cols="1"> Share </v-col>
          <v-col cols="1" class="text-right">Avg Weight </v-col>
        </v-row>
        <v-divider class="pt-0"> </v-divider>
        <div v-if="
          fullsingleres && fullsingleres[0] && fullsingleres[0].etfs_weights
        ">
          <div v-for="(item, index, k) in fullsingleres[0].etfs_weights" :key="k">
            <v-row class="text--black font-weight-medium py-1 pt-4 my-0" no-gutters>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="4" class="py-0">
                    <p class="mb-0 text-capitalize">{{ index }}</p>
                  </v-col>
                  <v-col cols="2"></v-col>
                  <v-col cols="2" class="py-0 text-center">
                    <span>
                      {{
                        calculateTotalWeight(item)
                          ? calculateTotalWeight(item)
                          : ""
                      }}%</span>
                  </v-col>
                </v-row>
                <v-row v-for="(m, j) in fullsingleres[0].etfs_weights[index]" :key="j" no-gutters>
                  <v-col cols="4" class="py-0">
                    <p class="mb-0 text-capitalize caption my-2">
                      {{ m.tsym ? m.tsym : "" }}
                    </p>
                  </v-col>
                  <v-col cols="2" class="py-0">
                    <p class="mb-0 text-capitalize body-2 my-2 ml-2 font-weight-medium">
                      ₹{{ m.price ? Number(m.price).toFixed(2) : "" }}
                    </p>
                  </v-col>
                  <v-col cols="3" class="py-0 text-center my-1">
                    <div class="d-flex">
                      <v-text-field v-model="m.weights" class="mt-0 pt-0 px-0 elevation-0 caption text-center"
                        hide-details 
                        @keyup="m.weights < maxvalueperc
                                            ? (m.weights = Number(m.weights) + 1)
                                            : null,getAddbtn(
                                        fullsingleres[0].etfs_weights[index][j]
                                          .token,
                                        parseFloat(m.weights)
                                      )"
                                    @keydown="m.weights > 1
                                            ? (m.weights = Number(m.weights) - 1)
                                            : null,
                                          getAddbtn(
                                            fullsingleres[0].etfs_weights[
                                              index
                                            ][j].token,
                                            m.weights
                                          )"
                        @change="
                          getAddbtn(
                            fullsingleres[0].etfs_weights[index][j].token,
                            parseFloat(m.weights)
                          )
                          " outlined type="number" hide-spin-buttons style="max-width: 120px;"
                        :min="minweights" :readonly="weightselected == 'Equial-Weighted'" :max="maxvalueperc" dense>
                        <template #append>
                          <v-btn :disabled="weightselected == 'Equial-Weighted'" @click="
                            m.weights < maxvalueperc
                              ? (m.weights = Number(m.weights) + 1)
                              : null,
                            getAddbtn(
                              fullsingleres[0].etfs_weights[index][j].token,
                              m.weights
                            )
                            " icon class="elevation-0" small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                              fill="none">
                              <circle cx="12" cy="12" r="12" fill="white" />
                              <path d="M12 8V16" stroke="#666666" stroke-width="2" stroke-linecap="round" />
                              <path d="M16 12L8 12" stroke="#666666" stroke-width="2" stroke-linecap="round" />
                            </svg>
                          </v-btn>
                        </template>
                        <template #prepend-inner>
                          <v-btn :disabled="weightselected == 'Equial-Weighted'" @click="
                            m.weights > 1
                              ? (m.weights = Number(m.weights) - 1)
                              : null,
                            getAddbtn(
                              fullsingleres[0].etfs_weights[index][j].token,
                              m.weights
                            )
                            " icon class="elevation-0" small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                              fill="none">
                              <circle cx="12" cy="12" r="12" fill="white" />
                              <path d="M16 12L8 12" stroke="#666666" stroke-width="2" stroke-linecap="round" />
                            </svg>
                          </v-btn>
                        </template>
                      </v-text-field>
                      <span class="title font-weight-semibold my-auto ms-1" style="color: #666666">
                      </span>
                    </div>
                  </v-col>
                  <v-col cols="1">
                    <div class="mb-0 text-capitalize body-2 my-2 ml-2 font-weight-medium">
                      <span class="justify-end d-inline-flex" style="width: 20px">{{ m.quantity }}</span>
                    </div>
                  </v-col>
                  <v-col cols="1" class="py-0 text-right">
                    <div class="mb-0 text-capitalize body-2 my-2 ml-2 font-weight-medium">
                      <span>{{ m.avg_weight_percent }}%</span>
                    </div>
                  </v-col>
                  <v-col cols="1" class="text-center">
                    <v-btn icon small @click="
                      deletesegment(
                        fullsingleres[0].etfs_weights[index][j].token
                      )
                      ">
                      <v-icon size="20"> mdi-trash-can-outline </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-divider v-if="
              fullsingleres[0] &&
              k != Object.entries(fullsingleres[0].etfs_weights).length - 1
            "></v-divider>
          </div>
        </div>
        <v-row class="my-2">
          <v-col cols="10" class="my-auto ps-4">
            <span class="font-weight-bold">Min.invest amount :
              ₹ {{
                fullsingleres[0] && fullsingleres[0].price
                  ? fullsingleres[0].price
                  : ""
              }}
            </span>
          </v-col>
          <v-col cols="2" class="text-center d-flex">
            <v-btn class="elevation-0 white--text text-none px-8" rounded block dense color="black" height="40"
              @click="confirmation = true">Invest</v-btn></v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="confirmation" persistent max-width="380">
      <v-card class="rounded-lg px-2 px-md-2">
        <v-card-title class="pr-2">Order Confirmation <v-spacer></v-spacer>
          <v-btn icon @click="confirmation = false">
            <v-icon>mdi-close</v-icon>
          </v-btn></v-card-title>
        <v-card-text>
          <b>{{
            fullsingleres[0]
              ? fullsingleres[0].basket_title
                ? fullsingleres[0].basket_title
                : ""
              : ""
          }}</b>
          <p class="my-2 body-1 font-weight-medium">
            Invest Amount :{{
              fullsingleres[0] && fullsingleres[0].price
                ? fullsingleres[0].price
                : ""
            }}
          </p>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn elevation="0" color="black white--text" rounded block @click="deploybasket()" :loading="basload">
            <span class="text-none">Proceed</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import apiurl from "@/apiurl";
import eventBus from "@/eventBus";
import axios from "axios";
export default {
  data() {
    return {
      urlPrefix: apiurl.collectionurl,
      params_id: "",
      snackbar: "",
      snackcolor: "",
      snackbarmsg: "",
      singleload: false,
      inputchange: "",
      usession: "",
      sess: "",
      uid: "",
      confirmation: false,
      ltpminpricedump: "",
      maxvalueperc: 99,
      minweights: (1.0).toFixed(2),
      countvalue: 0,
      weightcheck: 0,

      weightselected: "Custom-Weighted",
      weightedChange: ["Equial-Weighted", "Custom-Weighted"],
      fullsingleres: [],
      dumpdata: [],
      stockcountdump: 0,
      orderscitt: [],
      searchaa: null,
      searchdataaa: [],
      basload: false,
      autoload: false,
    };
  },
  watch: {
    searchaa(val) {
      val && val !== this.orderscitt && this.searchscrpt(val);
    },
  },
  methods: {
    singlepagedata() {
      this.singleload = true;
      this.fullsingleres = [];
      let data = JSON.stringify({
        basketid: this.params_id,
        client_id: "",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiurl.collectionurl}/singlebasketDateils`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      var axiosThis = this;
      axios
        .request(config)
        .then((response) => {
          axiosThis.singleload = false;
          if (response.data.stat == "ok") {
            axiosThis.fullsingleres = response.data.msg;
            axiosThis.textfieltext = axiosThis.fullsingleres[0].rebal_freq;
            axiosThis.textfieltext11 = axiosThis.fullsingleres[0].experience;
            axiosThis.textdate = axiosThis.fullsingleres[0].date_time;
            axiosThis.ltpminpricedump = axiosThis.fullsingleres[0].price;
            axiosThis.stockcountdump = axiosThis.fullsingleres[0].stockcount;
            axiosThis.dumpdata = JSON.parse(
              JSON.stringify(axiosThis.fullsingleres[0].etfs_weights)
            );
          }
        })
        .catch((error) => {
          console.log(error);
          axiosThis.singleload = false;
          axiosThis.snackbar = true;
          axiosThis.snackcolor = "error";
          axiosThis.snackbarmsg = error;
        });
    },
    calculateTotalWeight(item) {
      let totalWeight = 0;
      item.forEach((item) => {
        totalWeight += parseFloat(item.weights);
      });
      return totalWeight.toFixed(2);
    },
    sumvaluefor(token) {
      this.weightcheck = 0;
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          if (this.fullsingleres[0].etfs_weights[key][i].token != token) {
            this.weightcheck += parseFloat(
              this.fullsingleres[0].etfs_weights[key][i].weights
            );
          }
        })
      );
      this.weightcheck = 100 - this.weightcheck;
    },
    resetsigleres() {
      this.fullsingleres[0].etfs_weights = JSON.parse(
        JSON.stringify(this.dumpdata)
      );
      this.fullsingleres[0].price = this.ltpminpricedump;
      this.fullsingleres[0].stockcount = this.stockcountdump;
      this.weightselected = this.weightedChange[1];
    },
    deletesegment(token) {
      this.countvalue = 0;
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach(() => {
          this.countvalue = this.countvalue + 1;
        })
      );
      if (this.countvalue > 1) {
        Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) => {
          this.fullsingleres[0].etfs_weights[key] =
            this.fullsingleres[0].etfs_weights[key].filter((key2, i) => {
              return this.fullsingleres[0].etfs_weights[key][i].token != token;
            });
          if (this.fullsingleres[0].etfs_weights[key].length == 0) {
            delete this.fullsingleres[0].etfs_weights[key];
          }
        });

        this.fullsingleres[0].stockcount =
          parseInt(this.fullsingleres[0].stockcount) - 1;
        this.changetoEqualWeight();
      } else {
        this.snackbar = true;
        this.snackcolor = "error";
        this.snackbarmsg = "Atleast One Symbol";
      }
      this.countvalue = 0;
    },

    changetoEqualWeight() {
      this.countvalue = 0;
      this.weightcheck = 100 / parseInt(this.fullsingleres[0].stockcount);
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          if (
            parseInt(this.fullsingleres[0].stockcount) - 1 ==
            this.countvalue
          ) {
            this.sumvaluefor(key2.token);

            this.fullsingleres[0].etfs_weights[key][i].weights =
              this.weightcheck.toFixed(2);
          } else {
            this.fullsingleres[0].etfs_weights[key][i].weights =
              this.weightcheck.toFixed(2);
          }
          this.countvalue += 1;
        })
      );
      this.weightCalculation();
    },
    weightCalculation() {
      const price_per_weight = [];

      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          this.fullsingleres[0].etfs_weights[key][i].price_per_weight = (
            key2.price / key2.weights
          ).toFixed(2);
          price_per_weight.push(
            parseFloat((key2.price / key2.weights).toFixed(2))
          );
        })
      );
      let max_value = Math.max(...price_per_weight);
      let minprice = 0;
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          this.fullsingleres[0].etfs_weights[key][i].quantity = Math.round(
            (key2.weights / key2.price) * max_value
          );
          this.fullsingleres[0].etfs_weights[key][i].total_value =
            key2.price * this.fullsingleres[0].etfs_weights[key][i].quantity;
          minprice += this.fullsingleres[0].etfs_weights[key][i].total_value;
        })
      );
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          this.fullsingleres[0].etfs_weights[key][i].avg_weight_percent = (
            (key2.total_value / minprice) *
            100
          ).toFixed(2);
        })
      );
      this.fullsingleres[0].price = minprice.toFixed(2);
    },
    deploybasket() {
      this.basload = true;
      let data = JSON.stringify({
        basketid: this.fullsingleres[0].id,
        etfs_weights: this.fullsingleres[0].etfs_weights,
        session: this.sess,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiurl.collectionurl}/orderExecute`,
        headers: {
          Authorization: this.usession,
          clientid: this.uid,
          "Content-Type": "application/json",
        },
        data: data,
      };
      var axiosThis = this;
      axios
        .request(config)
        .then((response) => {
          axiosThis.basload = false;
          if (response.data.msg == "order initiated") {
            axiosThis.confirmation = false;
            axiosThis.snackbarmsg = response.data.msg;
            axiosThis.snackcolor = "success";
            axiosThis.snackbar = true;
          } else {
            axiosThis.confirmation = false;
            axiosThis.snackbar = true;
            axiosThis.snackbarmsg = response.data.msg;
            axiosThis.snackcolor = "error";
          }
        })
        .catch((error) => {
          console.log(error);
          axiosThis.basload = false;
          axiosThis.confirmation = false;
          axiosThis.snackbarmsg = "Network Error";
          axiosThis.snackcolor = "error";
          axiosThis.snackbar = true;
        });
    },
    getAddbtn(token, value) {
      if (!value) {
        value = 1.0;
      }
      if (value > this.maxvalueperc) {
        value = this.maxvalueperc;
      }
      this.weightcheck = 100 - value.toFixed(2);
      this.weightcheck =
        this.weightcheck / (parseInt(this.fullsingleres[0].stockcount) - 1);
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          if (this.fullsingleres[0].etfs_weights[key][i].token == token) {
            if (value == 1) {
              this.fullsingleres[0].etfs_weights[key][i].weights = 1.0;
              this.snackcolor = "red";
              this.snackbar = true;
              this.snackbarmsg = "Invaild input value";
            } else if (value == this.maxvalueperc) {
              this.fullsingleres[0].etfs_weights[key][i].weights = parseFloat(
                this.maxvalueperc
              ).toFixed(2);
              this.snackcolor = "red";
              this.snackbar = true;
              this.snackbarmsg = "Invaild input value";
            } else {
              this.fullsingleres[0].etfs_weights[key][i].weights =
                value.toFixed(2);
            }
          }
          if (this.fullsingleres[0].etfs_weights[key][i].token != token) {
            if (
              parseInt(this.fullsingleres[0].stockcount) - 2 ==
              this.countvalue
            ) {
              this.sumvaluefor(
                this.fullsingleres[0].etfs_weights[key][i].token
              );
              this.fullsingleres[0].etfs_weights[key][i].weights =
                this.weightcheck.toFixed(2);
            } else {
              this.fullsingleres[0].etfs_weights[key][i].weights =
                this.weightcheck.toFixed(2);
            }
            this.countvalue += 1;
          }
        })
      );
      this.weightCalculation();

      this.countvalue = 0;
      this.weightcheck = 0;
    },
    searchscrpt(script) {
      var axiosThis = this;
      if (script.length > 2) {
        this.autoload = true;
        var data = `jData={"uid":"${this.uid}","stext":"${script}"}&jKey=${this.sess}`;
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${apiurl.kambala_api}/SearchScrip`,
          headers: {
            "Content-Type": "text/plain",
          },
          data: data,
        };
        const axiosThis = this;
        axios
          .request(config)
          .then((response) => {
            axiosThis.autoload = false;
            if (response.data.stat != "Not_Ok") {
              axiosThis.searchdataaa = response.data.values;
              axiosThis.autoload = false;
            }
          })
          .catch((error) => {
            console.log(error.response);

            if (
              error.response.data.emsg ==
              "Session Expired :  Invalid Session Key"
            ) {
              axiosThis.dialog = true;
              setTimeout(() => {
                window.location.assign("/");
                localStorage.clear();
              }, 2000);
            } else if (error.response.data.stat == "Not_Ok") {
              axiosThis.searchdataaa = [];

              axiosThis.autoload = false;
            }
          });
      } else {
        axiosThis.mcxdata = [];
      }
    },
    getltpservice(value, exch) {
      var data = { data: [{ token: value, exch: exch }] };
      let config = {
        method: "post",
        url: `${apiurl.ltb_check_api}/GetLtp`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      // const axiosThis=this;
      axios
        .request(config)
        .then((response) => {
          this.orderscitt.price = response.data.data[value].lp;

          const keyname = Object.keys(this.fullsingleres[0].etfs_weights);
          if (
            this.orderscitt?.exch == "NSE" ||
            this.orderscitt?.exch == "BSE"
          ) {
            this.product_tye = "I";

            this.fullsingleres[0].etfs_weights[keyname[0]].push({
              exch: this.orderscitt.exch,
              token: this.orderscitt.token,
              cname: this.orderscitt.cname,
              tsym: this.orderscitt.tsym,
              instname: this.orderscitt.instname,
              weights: 0,
              quantity: 0,
              price: this.orderscitt.price,
              price_per_weight: 0,
              total_value: 0,
              avg_weight_percent: 0,
            });
          } else {
            this.product_tye = "I";
            this.fullsingleres[0].etfs_weights[keyname[0]].push({
              exch: this.orderscitt.exch,
              token: this.orderscitt.token,
              cname: this.orderscitt.tsym,
              tsym: this.orderscitt.tsym,
              instname: this.orderscitt.instname,
              weights: 0,
              quantity: 0,
              price: this.orderscitt.price,
              price_per_weight: 0,
              total_value: 0,
              avg_weight_percent: 0,
            });
          }
          this.fullsingleres[0].stockcount =
            parseInt(this.fullsingleres[0].stockcount) + 1;

          this.changetoEqualWeight();
        })
        .catch((error) => {
          console.log(error.response);
          this.snackcolor = "error";
          this.snackbar = true;
          this.snackbarmsg = "Network error";
        });
      return;
    },
    setValue() {
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          if (
            this.fullsingleres[0].etfs_weights[key][i].token ==
            this.orderscitt.token
          ) {
            this.snackbar = true;
            this.snackcolor = "error";
            this.snackbarmsg = "Already added this symbol";
          }
        })
      );
      if (!this.snackbar) {
        this.getltpservice(this.orderscitt.token, this.orderscitt.exch);
      }
    },
  },
  mounted() {
    let params = this.$route.params;
    if (params.itemid) {
      this.params_id = params.itemid;
      this.singlepagedata();
    } else {
      if (this.$router) {
        setTimeout(() => {
          this.$router.push("/collection");
        }, 200);
      } else {
        console.error("Vue Router instance is not available.");
      }
    }
    if (
      localStorage.getItem("sess") === "" ||
      localStorage.getItem("sess") === null
    ) {
      eventBus.$emit("login-event");
    }
    this.sess = localStorage.getItem("sess");
    this.usession = localStorage.getItem("usession");
    this.uid = localStorage.getItem("userid");
  },
};
</script>
