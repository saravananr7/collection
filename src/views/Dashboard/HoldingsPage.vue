<template>
    <div>
        <v-snackbar class="snakbar-sty rounded-pill" transition="slide-x-reverse-transition" v-model="snackbar"
            timeout="6000" :value="true" :color="snackcolor" top right outlined absolute text-color="white">
            <v-icon class="mr-2" :color="snackcolor">mdi-alert-outline</v-icon>
            {{ mesg }}
            <v-icon @click="snackbar = false" class="float-right" :color="snackcolor">mdi-close-circle</v-icon>
        </v-snackbar>
        <div>
            <p style="word-spacing: 5px" class="caption mb-0 pt-16">
                <span style="color: #0037b7; cursor: pointer; " @click="$router.push('/')">Collection</span>
                <span style="color: #000; "> > </span>
                <span style="color: #000; ">Holdings</span>
            </p>

            <p class="title mb-0 font-weight-bold">Holdings</p>
            <div class="d-none d-lg-block d-xl-block">
            <v-row>
                <v-col cols="12" class="">
                    <!-- <v-card outlined style="border-radius: 4px; border: 1px solid #ddd"
                        class="elevation-0 mt-3 pa-2 pt-2 pb-2 rounded-lg  ">
                        <div class="d-flex justify-space-between">

                            <div class="ml-4 justify-space-between">
                                <p class="mb-0 subtitle-1 font-weight-medium black--text">2024-06-12 10:28:40</p>
                                <span class="mb-0 body-1 font-weight-medium" style="color:#666">Z51875</span>

                            </div>
                           
                            <div class="ml-4 justify-space-between">
                                <p class="mb-0 subtitle-1 mt-2 font-weight-medium black--text">GROWTH SECTORS 15</p>
                            </div>
                            <div class="ml-4 justify-space-between ">
                                <p class="mb-0 subtitle-1 font-weight-medium black--text ">Min Price </p>
                                <span class="mb-0 body-1 font-weight-medium" style="color:#666">3256</span>
                            </div>
                            <div class="ml-4 justify-space-between ">
                               
                               <div> 
                                    <v-btn icon  class="mt-2">
                                       
                                        <v-icon size="30" color="black">mdi-chevron-right</v-icon>
                                    </v-btn>
                                </div>
                            </div>

                        </div>

                    </v-card> -->

                    <v-card class="pa-3 mt-2" elevation="0" outlined
                        style="border-radius: 4px; border: 1px solid #ddd;background-color:#FAFBFF">
                        <div class="d-flex justify-space-between">
                            <div class="ml-4 justify-space-between">
                                <span class="mb-0 body-2 " style="color:#666">Current value</span>
                                <p class="mb-0 subtitle-1 font-weight-medium black--text">₹1,09,000</p>
                            </div>
                            <div class="ml-4 justify-space-between">
                                <span class="mb-0 body-2 " style="color:#666">1D Change</span>
                                <p class="mb-0 subtitle-1 font-weight-medium black--text">₹1,09,000</p>
                            </div>
                            <div class="ml-4 justify-space-between">
                                <span class="mb-0 body-2 " style="color:#666">Total Invested</span>
                                <p class="mb-0 subtitle-1 font-weight-medium black--text">₹1,09,000</p>
                            </div>
                            <div class="ml-4 justify-space-between">
                                <span class="mb-0 body-2 " style="color:#666">Profit & Loss</span>
                                <p class="mb-0 subtitle-1 font-weight-medium black--text">₹1,09,000</p>
                            </div>
                            <div class="ml-4 justify-space-between mr-4">
                                <span class="mb-0 body-2 " style="color:#666">P&L Change%</span>
                                <p class="mb-0 subtitle-1 font-weight-medium black--text">₹1,09,000</p>
                            </div>



                        </div>
                    </v-card>


                    <v-card v-for="(item, index) in items" :key="index" outlined
                        class="elevation-0 mt-3 pa-2 pt-2 pb-2 rounded-lg"
                        style="border-radius: 4px; border: 1px solid #ddd">
                        <div class="d-flex justify-space-between">
                            <div class="ml-4 justify-space-between">
                                <p class="mb-0 body-2 mb-0" style="color:#666">{{ item.date }}
                                </p>
                                <span class="mb-0  subtitle-1 font-weight-medium black--text">{{ item.id }}</span>

                            </div>
                            <div class="ml-4 justify-space-between">
                                <p class="mb-0 subtitle-1 font-weight-medium black--text mt-3 mb-0" style="color:#666">{{ item.sector }}</p>

                            </div>
                            <div class="ml-4 justify-space-between">
                                <p class="mb-0 body-2 mb-0" style="color:#666">Buy Price</p>
                                <span class="mb-0 subtitle-1 font-weight-medium black--text">{{ item.minPrice
                                    }}</span>
                            </div>
                            <div class="ml-4 justify-space-between">
                                <p class="mb-0 body-2 mb-0" style="color:#666">Current Price</p>
                                <span class="mb-0 subtitle-1 font-weight-medium black--text">{{ item.minPrice
                                    }}</span>
                            </div>
                            <div class="ml-4 justify-space-between">
                                <p class="mb-0 body-2 mb-0" style="color:#666">1D Change</p>
                                <span class="mb-0 subtitle-1 font-weight-medium black--text">{{ item.minPrice
                                    }}</span>
                            </div>
                            <div class="ml-4 justify-space-between">
                                <v-btn icon class="mt-2" @click="toggleDetails(index)">
                                    <v-icon size="30" color="black">{{ expandedIndex === index ? 'mdi-chevron-up' :
                                        'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <v-expand-transition>
                            <div v-show="expandedIndex === index">
                                <v-divider></v-divider>
                                <v-data-table height="200px" :headers="bidherder" :items="item.orderdetail"
                                    :items-per-page="100" hide-default-footer class="elevation-0 mt-2 mb-3 ma-0 pa-0"
                                    outlined fixed-header disable-sort dense style="border: 1px solid #ddd">
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
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <div class="d-block d-lg-none">
            <v-row>
                <v-col cols="12">
                       <v-card class="pa-3 mt-2" elevation="0" outlined
                        style="border-radius: 4px; border: 1px solid #ddd;background-color:#FAFBFF">
<div class="text-center">
    <p class="mb-0 black--text title font-weight-bold">₹1,09,000</p>
    <span class="mb-0 body-2 " style="color:#666">Current value</span>

</div>

<v-divider></v-divider>

<div class="d-flex">
   
<span class="mb-0 body-2 " style="color:#666">1D Change</span>
    <p class="mb-0 black--text subtitle-1 ml-auto font-weight-bold">₹1,09,000  </p>
</div>


   <div class="d-flex">
   
   <span class="mb-0 body-2 " style="color:#666">Total Invested</span>
       <p class="mb-0 black--text subtitle-1 ml-auto font-weight-bold">₹1,09,000  </p>
   </div>
   <div class="d-flex">
   
   <span class="mb-0 body-2 " style="color:#666">Profit & Loss</span>
       <p class="mb-0 black--text subtitle-1 ml-auto font-weight-bold">₹1,09,000  </p>
   </div>
   <div class="d-flex">
   
   <span class="mb-0 body-2 " style="color:#666">P&L Change%</span>
       <p class="mb-0 black--text subtitle-1 ml-auto font-weight-bold">₹1,09,000  </p>
   </div>

   

                    </v-card>

                    <div>
        <v-expansion-panels accordion style="z-index: 0" class="pa-1 mt-2 d-block d-lg-none expan">
          <v-expansion-panel v-for="(item, i) in items" :key="i">
            <v-expansion-panel-header class="pa-2">

              <p class="mb-0"><span class="font-weight-medium caption black--text">{{ item.sector }}</span><br>
                <span class="font-weight-light caption grey--text">{{ item.date }}</span> </p> 

                <p class="mb-0"><span class="font-weight-medium caption black--text">{{ item.minPrice}}</span><br>
                    <span class="font-weight-light caption grey--text">Buy prc</span> </p> 

                    <p class="mb-0"><span class="font-weight-medium caption black--text">{{ item.minPrice}}</span><br>
                        <span class="font-weight-light caption grey--text">Current prc</span> </p>

                        <!-- <p class="mb-0"><span class="font-weight-medium caption black--text">{{ item.minPrice}}</span><br>
                            <span class="font-weight-light caption grey--text">1D Change</span> </p> -->

              

          



            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card v-for="iitem in item.orderdetail" :key="iitem.index" style="border-top: 5px #f1f3f8 solid"
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
                        Buy Price

                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                        Currect Value

                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                        One day Returns

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

                    <!-- <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                      {{ iitem. }}
                    </p>
                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                      {{ iitem.tsym }}
                    </p>
                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                      {{ iitem.quantity }}
                    </p> -->

                   
                  </v-col>
                </v-row>
              </v-card>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-expansion-panels>
      </div>
                </v-col>
            </v-row>
        </div>

        </div>
    </div>
</template>

<script>
//   import apiurl from "@/apiurl";
import eventBus from "@/eventBus";
//   import axios from "axios";

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
            items: [
                {
                    date: '2024-06-12 10:28:40',
                    id: 'Z51875',
                    sector: 'GROWTH SECTORS 15',
                    minPrice: 3256,
                    details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
                    show: false,
                    orderdetail: [
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017315",
                            "ordertype": "B",
                            "quantity": 9,
                            "rejmsg": "RED:Margin Shortfall:INR 12,286.74 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "13538",
                            "tsym": "TECHM-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017316",
                            "ordertype": "B",
                            "quantity": 4,
                            "rejmsg": "RED:Margin Shortfall:INR 13,563.50 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "3506",
                            "tsym": "TITAN-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017317",
                            "ordertype": "B",
                            "quantity": 1,
                            "rejmsg": "RED:Margin Shortfall:INR 10,994.07 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "11532",
                            "tsym": "ULTRACEMCO-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017318",
                            "ordertype": "B",
                            "quantity": 27,
                            "rejmsg": "RED:Margin Shortfall:INR 12,993.07 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "3787",
                            "tsym": "WIPRO-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017315",
                            "ordertype": "B",
                            "quantity": 9,
                            "rejmsg": "RED:Margin Shortfall:INR 12,286.74 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "13538",
                            "tsym": "TECHM-EQ"
                        },],
                },
                {
                    date: '2024-06-12 10:28:40',
                    id: 'Z51875',
                    sector: 'GROWTH SECTORS 15',
                    minPrice: 3256,
                    details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
                    show: false,
                    orderdetail: [
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017315",
                            "ordertype": "B",
                            "quantity": 9,
                            "rejmsg": "RED:Margin Shortfall:INR 12,286.74 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "13538",
                            "tsym": "TECHM-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017315",
                            "ordertype": "B",
                            "quantity": 9,
                            "rejmsg": "RED:Margin Shortfall:INR 12,286.74 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "13538",
                            "tsym": "TECHM-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017316",
                            "ordertype": "B",
                            "quantity": 4,
                            "rejmsg": "RED:Margin Shortfall:INR 13,563.50 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "3506",
                            "tsym": "TITAN-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017317",
                            "ordertype": "B",
                            "quantity": 1,
                            "rejmsg": "RED:Margin Shortfall:INR 10,994.07 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "11532",
                            "tsym": "ULTRACEMCO-EQ"
                        },
                        {
                            "exch": "NSE",
                            "msg": "REJECTED",
                            "norenordno": "24061200017318",
                            "ordertype": "B",
                            "quantity": 27,
                            "rejmsg": "RED:Margin Shortfall:INR 12,993.07 Available:INR -27.89 for C-Z51875 [ZEBUPRE20]",
                            "request_time": "10:28:41 12-06-2024",
                            "stat": "Ok",
                            "token": "3787",
                            "tsym": "WIPRO-EQ"
                        }],
                },

            ],
            bidherder: [
                { text: "Order Id", value: "token" },
                { text: "Date & Time", value: "request_time" },
                { text: "Script", value: "tsym" },
                { text: "Quantity", value: "quantity" },

                { text: "Buy Price ", value: "" },
                { text: "Currect Value", value: "" },
                { text: "One day Returns", value: "" },


            ],
            expandedIndex: -1
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
        toggleDetails(index) {
            this.expandedIndex = this.expandedIndex === index ? -1 : index;
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


    },
};
</script>