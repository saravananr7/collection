<template>
  <div>
    <v-snackbar class="snakbar-sty rounded-pill" transition="slide-x-reverse-transition" v-model="snackbar"
      timeout="6000" :value="true" :color="snackcolor" top right outlined absolute text-color="white">
      <v-icon class="mr-2" :color="snackcolor">mdi-alert-outline</v-icon>
      {{ mesg }}
      <v-icon @click="snackbar = false" class="float-right" :color="snackcolor">mdi-close-circle</v-icon>
    </v-snackbar>
    <div>
      <p style="word-spacing: 5px" class="caption pt-16">
        <span style="color: #0037b7; cursor: pointer; " @click="$router.push('/')">Collection</span>
        <span style="color: #000; "> > </span>
        <span style="color: #000; ">Orderbook</span>
      </p>

      <p class="title font-weight-bold">Order Book</p>
      <v-progress-linear indeterminate color="primary" v-if="tabload" class="d-block d-lg-none"></v-progress-linear>
      <v-data-table :loading="tabload" style="border: 1px solid #efeef3" disable-sort :headers="headers"
        :items="fullresdata" single-expand show-expand :expanded.sync="expanded1" fixed-header item-key="date_time"
        class="elevation-0  d-none d-lg-block d-xl-block">
        <template v-slot:[`item.id`]="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-slot:[`item.stat`]="{ item }">

          <p class="font-weight-medium black--text mb-0">
            <svg v-if="item.order_status == 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="15"
              viewBox="0 0 20 15" fill="none">
              <rect width="20" height="15" rx="7" fill="#2DB266" />
              <path d="M6.25 8.2475L8.415 10.4125L13.8275 5" stroke="white" stroke-width="1.2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
              <rect width="20" height="15" rx="7" fill="#DC2626" />
              <path d="M7.5 10L12.5 5M7.5 5L12.5 10" stroke="white" stroke-width="1.2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>

            <span class="ml-1 text-capitalize">
              {{ item.order_status ? item.order_status : '' }}
            </span>
          </p>
        </template>
        <template v-slot:[`item.button`]="{ item }">
          <v-btn color="success" v-if="item.order_status === 'success'" outlined small>
            success
          </v-btn>
          <v-btn elevation="0" rounded outlined color="black" class="text-none ma-2 bodu-2 black--text" v-else
            @click="order_details_show(item), (dialogbox = !dialogbox)" small>

            <span class="font-weight-bold">Re-Order</span>
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pl-0 pr-0">
            <v-data-table :loading="tabload" :items-per-page="10" :headers="bidherder" :items="item.order_detail"
              @click:row="toggleExpanded" fixed-header disable-sort class="elevation-0">

              <template v-slot:[`item.msg`]="{ item }">
                <v-chip small label
                  :style="{ 'border': item.msg == 'REJECTED' ? '1px solid #FFCDCD' : '1px solid #C1E7BA', 'background-color': item.msg == 'REJECTED' ? '#FCF3F3' : '#ECF8F1' }"><span
                    class="caption" style="text-transform: capitalize"
                    :style="{ 'color': item.msg == 'REJECTED' ? '#FF1717' : '#43A833' }"> {{ item.msg }}</span></v-chip>
              </template>
            </v-data-table>
          </td>
        </template>
        <template v-slot:no-data>
          <v-col cols="12" class="text-center pa-16">
            <div class="mx-auto ">
              <img class="align-self-stretch mx-auto" width="80px" :src="require('@/assets/no data folder.svg')"
                alt="no data" />
              <h5 class="txt-999 font-weight-regular">There is no
                data here yet!
              </h5>
            </div>
          </v-col>
        </template>
      </v-data-table>
      <div class="text-center">
        <v-dialog v-model="dialogbox" width="400">
          <v-card>
            <v-card-title class="title-1 lighten-2 font-weight-bold px-0 mx-4">
              Re-order List
              <v-spacer></v-spacer>
              <v-btn icon @click="dialogbox = false" class="float-end">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-simple-table style="border: 1px solid #E0E0E0;" height="300px" fixed-header class="mx-4 my-2">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="body-1 text-left font-weight-bold">Symbol</th>
                    <th class="body-1 text-left font-weight-bold text-center">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody v-if="identifyid && identifyid.order_detail">
                  <tr v-for="item in identifyid.order_detail" :key="item.token">
                    <td v-if="
                      item.msg == 'REJECTED' ||
                      item.stat == 'Not Ok' ||
                      item.msg == 'order failed'
                    ">
                      {{ item.tsym }}
                    </td>
                    <td v-if="
                      item.msg == 'REJECTED' ||
                      item.stat == 'Not Ok' ||
                      item.msg == 'order failed'
                    " class="text-center">
                      {{ item.quantity }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-card-actions>
              <v-btn color="black" block class="white--text elevation-0  rounded-pill"
                @click="re_orderapi(identifyid.id_x)" :loading="loading">
                Place order
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>

      <div>
        <v-expansion-panels accordion style="z-index: 0" class="pa-1 expan d-block d-lg-none">
          <v-expansion-panel v-for="(item, i) in fullresdata" :key="i">
            <v-expansion-panel-header class="pa-2">

              <p class="mb-0"><span class="font-weight-medium caption black--text">{{ item.basket_title }}</span><br>
                <span class="font-weight-light caption grey--text">{{ item.date_time }}</span> </p>




              <p class="font-weight-medium black--text mb-0">
                <!-- <svg v-if="item.order_status != 'failed'" xmlns="http://www.w3.org/2000/svg"
              width="20" height="15" viewBox="0 0 20 15" fill="none">
              <rect width="20" height="15" rx="7" fill="#2DB266" />
              <path d="M6.25 8.2475L8.415 10.4125L13.8275 5" stroke="white" stroke-width="1.2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="15"
              viewBox="0 0 20 15" fill="none">
              <rect width="20" height="15" rx="7" fill="#DC2626" />
              <path d="M7.5 10L12.5 5M7.5 5L12.5 10" stroke="white" stroke-width="1.2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg> -->

                <span class="ml-1 caption text-capitalize"
                  :style="{ 'color': item.order_status == 'failed' ? '#FF1717' : '#43A833' }">
                  {{ item.order_status ? item.order_status : '' }}
                </span>
              </p>

              <v-btn elevation="0" v-if="item.order_status !== 'success'" rounded outlined color="black"
                class="text-none ma-2 bodu-2 black--text" @click="order_details_show(item), (dialogbox = !dialogbox)"
                small>

                <span class="font-weight-medium caption">Re-Order</span>
              </v-btn>




            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card v-for="iitem in item.order_detail" :key="iitem.index" style="border-top: 5px #f1f3f8 solid"
                class="elevation-0 px-4 pt-2" width="100%">

                <v-row class="px-2">
                  <v-col>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                      Order Id
                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                      Date & Time
                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                      Script

                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                      Quantity:

                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                      Status

                    </p>

                  </v-col>
                  <v-col class="text-end">
                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                      {{ iitem.token }}
                    </p>

                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                      {{ iitem.request_time }}
                    </p>
                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                      {{ iitem.tsym }}
                    </p>
                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                      {{ iitem.quantity }}
                    </p>

                    <v-chip small label
                      :style="{ 'border': iitem.msg == 'REJECTED' ? '1px solid #FFCDCD' : '1px solid #C1E7BA', 'background-color': iitem.msg == 'REJECTED' ? '#FCF3F3' : '#ECF8F1' }"><span
                        class="caption" style="text-transform: capitalize"
                        :style="{ 'color': iitem.msg == 'REJECTED' ? '#FF1717' : '#43A833' }"> {{ iitem.msg
                        }}</span></v-chip>

                  </v-col>
                </v-row>
              </v-card>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-expansion-panels>
      </div>


    </div>
  </div>
</template>

<script>
import apiurl from "@/apiurl";
import eventBus from "@/eventBus";
import axios from "axios";

export default {
  data() {
    return {
      snackcolor: "#000",
      mesg: "",
      snackbar: false,
      singleExpand: false,
      fullresdata: [],
      expanded1: [],
      loader: null,
      loading: false,
      tabload: true,
      identifyid: [],
      order_place_btn: false,
      dialogbox: false,
      sess: "",
      usession: "",
      uid: "",
      headers: [
        { text: "Id", value: "id" },
        { text: "Date & Time", value: "date_time" },
        { text: "Baskset name", value: "basket_title" },
        { text: "Client Id", value: "client_id" },
        { text: "", value: "button" },
        { text: "Status", value: "stat" },
        { text: "", value: "data-table-expand" },

        // { text: "Amount", value: "amount", },
      ],
      bidherder: [
        { text: "Order Id", value: "token" },
        { text: "Date & Time", value: "request_time" },
        { text: "Script", value: "tsym" },
        { text: "Quantity", value: "quantity" },

        { text: "Status", value: "msg" },
        { text: "Reject Reason", value: "rejmsg" },

      ],
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  methods: {
    oredrdetails() {
      this.tabload = true;
      this.fullresdata = [];
      const axios = require("axios");
      let data = "";

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiurl.collectionurl}/fetchOrderDetails`,
        headers: {
          Authorization: this.usession,
          clientid: this.uid,
        },
        data: data,
      };
      var axiosThis = this;
      axios
        .request(config)
        .then((response) => {
          axiosThis.tabload = false;
          if (typeof response.data.msg !== "string") {
            axiosThis.fullresdata = response.data.msg;
          } else if (response.data.emsg === "token expired") {
            eventBus.$emit("login-event");
          } else {
            axiosThis.snackbar = false;
            axiosThis.snackcolor = "error";
            axiosThis.mesg = response.data.msg;
          }
        })
        .catch((error) => {
          console.log(error);
          axiosThis.tabload = false;
          axiosThis.snackbar = true;
          axiosThis.snackcolor = "error";
          axiosThis.mesg = "Network Error";
        });
    },
    order_details_show(item) {
      this.identifyid = item;
      this.getLedgerPrice()
      //  this.identifyid=this.fullresdata.find(({id_x})=>id_x===id)
      //  this.identifyid[0]=this.identifyid.order_detail.map((key)=>{
      //   if((key.msg=="REJECTED") || (key.stat=='Not Ok') ){
      //     return key
      //   }else{
      //     return ''
      //   }
      //  }
      //  this.identifyid.id_x=id
      //  console.log(this.identifyid)
    },
    re_orderapi(id) {
      this.loading = true;
      let data = JSON.stringify({
        orderbook_id: id,
        session: this.sess,
        url__: localStorage.getItem("apiorderurl"),

      });

      let config = {
        method: "post",
        url: `${apiurl.collectionurl}/orderbook_order_execute`,
        headers: {
          Authorization: this.usession,
          clientid: this.uid,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const axiosThis = this;
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.msg === "order initiated") {
            axiosThis.loading = false;
            axiosThis.dialogbox = false;
            axiosThis.dialog = false;
            axiosThis.snackbar = true;
            axiosThis.snackcolor = "success";
            axiosThis.mesg = response.data.msg;
          } else {
            axiosThis.loading = false;
            axiosThis.dialogbox = false;
            axiosThis.snackbar = true;
            axiosThis.snackcolor = "error";
            axiosThis.mesg = response.data.msg;
          }
          this.oredrdetails();
        })
        .catch((error) => {
          console.log(error);
          axiosThis.loading = false;
          axiosThis.dialogbox = false;
          axiosThis.snackbar = true;
          axiosThis.snackcolor = "error";
          axiosThis.mesg = "Network Error";
        });
    },
    toggleExpanded(item) {
      const index = this.expanded1.indexOf(item);
      if (index === -1) {
        this.expanded1 = this.singleExpand ? [item] : [...this.expanded1, item];
      } else {
        this.expanded1 = this.expanded1.filter((el) => el !== item);
      }
    },
    getLedgerPrice() {
      var axiosThis = this
      let data = JSON.stringify({
        "clientid": this.uid
      });

      let config = {
        method: 'post',
        url: `${apiurl.legetbalance_api}/all_ledger_balance`,
        headers: {
          "Authorization": this.usession,
          "Clientid": this.uid,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          var res = response.data
          // axiosThis.leadgerBal = res.total
          axiosThis.leadgerBal = Number(res.total)
          console.log(typeof axiosThis.leadgerBal);

        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    if (
      localStorage.getItem("sess") === "" ||
      localStorage.getItem("sess") === null
    ) {
      eventBus.$emit("login-event");
    }
    this.sess = localStorage.getItem("sess");
    this.usession = localStorage.getItem("usession");
    this.uid = localStorage.getItem("userid");

    this.oredrdetails();
  },
};
</script>
