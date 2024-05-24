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
      <v-data-table :loading="tabload" style="border: 1px solid #efeef3" disable-sort :headers="headers"
        :items="fullresdata" single-expand show-expand :expanded.sync="expanded1" item-key="date_time"
        class="elevation-0">
        <template v-slot:[`item.id`]="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-slot:[`item.button`]="{ item }">
          <v-btn color="success" v-if="item.order_status === 'success'" outlined small>
            success
          </v-btn>
          <v-btn color="info" class="ma-2 white--text" v-else
            @click="order_details_show(item), (dialogbox = !dialogbox)" small>
            Re-Order
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pl-0 pr-0">
            <v-data-table :loading="tabload" :items-per-page="10" hide-default-footer dense :headers="bidherder"
              :items="item.order_detail" @click:row="toggleExpanded" fixed-header disable-sort class="elevation-1">
            </v-data-table>
          </td>
        </template>
        <template v-slot:no-data>
          <v-col cols="12" class="text-center pa-16">
              <div class="mx-auto ">
                  <img class="align-self-stretch mx-auto" width="80px"
                      :src="require('@/assets/no data folder.svg')" alt="no data" />
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
            <v-simple-table style="border: 1px solid gray;" class="mx-4 my-2">
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
        { text: "", value: "data-table-expand" },

        // { text: "Amount", value: "amount", },
      ],
      bidherder: [
        { text: "Order Id", value: "token" },
        { text: "Date & Time", value: "request_time" },
        { text: "Script", value: "tsym" },
        { text: "Quantity", value: "quantity" },

        { text: "Status", value: "msg" },
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
