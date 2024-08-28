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
            <v-progress-linear
            v-if="holdinglisloader"
      indeterminate
      class="mt-2"
      color="primary"
    ></v-progress-linear>
            <div class="d-none d-lg-block d-xl-block">
                <v-row>
                    <v-col cols="12" lg="9" md="12" sm="12">

                        <v-card class="pa-3 mt-2" elevation="0" outlined
                            style="border-radius: 4px; border: 1px solid #ddd;background-color:#FAFBFF">
                            <div class="d-flex justify-space-between">
                                <div class="ml-4 justify-space-between">
                                    <span class="mb-0 body-2 " style="color:#666">Total Invested</span>
                                    <p class="mb-0 subtitle-1 font-weight-medium "
                                        :style="{ color: (holdingdata && holdingdata.total_invest > 0) ? 'green' : 'red' }">
                                        ₹ {{ holdingdata && holdingdata.total_invest ?
                                            (holdingdata.total_invest) : '--' }}</p>
                                </div>
                                <div class="ml-4 justify-space-between">
                                    <span class="mb-0 body-2 " style="color:#666">Current value</span>
                                    <p class="mb-0 subtitle-1 font-weight-medium "
                                        :style="{ color: (holdingdata && holdingdata.current_value > 0) ? 'black' : 'black' }">
                                        ₹ {{ holdingdata && holdingdata.current_value ?
                                            (holdingdata.current_value) : '--' }}</p>
                                </div>
                                <!-- <div class="ml-4 justify-space-between">
                                <span class="mb-0 body-2 " style="color:#666">1D Change</span>
                                <p class="mb-0 subtitle-1 font-weight-medium black--text">₹1,09,000</p>
                            </div> -->


                                <div class="ml-4 justify-space-between mr-4">
                                    <span class="mb-0 body-2 " style="color:#666">Profit & Loss</span>
                                    <p class="mb-0 subtitle-1 font-weight-medium "
                                        :style="{ color: (holdingdata && holdingdata.p_l > 0) ? 'green' : 'red' }">₹
                                        {{ holdingdata && holdingdata.p_l ? (holdingdata.p_l) : '--' }}</p>

                                </div>



                            </div>
                        </v-card>


                        <v-card v-for="(item, index) in holdingorderdata" :key="index" outlined
                            class="elevation-0 mt-3 pa-2 pt-2 pb-2 rounded-lg"
                            style="border-radius: 4px; border: 1px solid #ddd">
                            <div class="d-flex justify-space-between">

                                <div class="ml-4 justify-space-between">
                                    <p class="mb-0 subtitle-1 font-weight-medium black--text mt-3 mb-0"
                                        style="color:#666">{{ item.basket_title }}</p>

                                </div>
                               
                                <div class="ml-4 justify-space-between">
                                    <p class="mb-0 body-2 mb-0" style="color:#666">Buy Price</p>
                                    <span class="mb-0 subtitle-1 font-weight-medium black--text">₹ {{
                                        (item.invest_value)
                                    }}</span>
                                </div>
                                <div class="ml-4 justify-space-between">
                                    <p class="mb-0 body-2 mb-0" style="color:#666">Current Price</p>
                                    <span class="mb-0 subtitle-1 font-weight-medium "
                                        :style="{ color: item.current_price > 0 ? 'black' : 'black' }">₹ {{
                                            (item.current_price)
                                        }}</span>
                                </div>
                                <div class="ml-4 justify-space-between">
                                    <p class="mb-0 body-2 mb-0" style="color:#666">Profit & Loss</p>
                                    <span class="mb-0 subtitle-1 font-weight-medium "
                                        :style="{ color: item.p_l > 0 ? 'green' : 'red' }">₹ {{ (item.p_l)
                                        }}</span>
                                </div>
                                <div class="ml-4 justify-space-between">
                                    <p class="mb-0 body-2 mb-0" style="color:#666">XIRR Value</p>
                                    <span class="mb-0 subtitle-1 font-weight-medium black--text"> {{
                                        (item.xirr_value)
                                    }} %</span>
                                </div>
                                <div class="ml-4 mr-6 mt-2 justify-space-between">
                                    <v-btn icon class="mt-2" @click="toggleDetails(index)">
                                        <v-icon size="30" color="black">{{ expandedIndex === index ? 'mdi-chevron-up' :
                                            'mdi-chevron-down' }}</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                            <v-expand-transition>
                                <div v-show="expandedIndex === index">
                                    <v-divider></v-divider>
                                    <v-data-table height="200px" :headers="bidherder" :items="item.order_detail"
                                        :items-per-page="100" hide-default-footer
                                        class="elevation-0 mt-2 mb-3 ma-0 pa-0" outlined fixed-header disable-sort dense
                                        style="border: 1px solid #ddd">
                                        <template v-slot:[`item.invest_price_sum`]="{ item }">
                                            <span  :style="{ color: item.invest_price_sum > 0 ? 'black' : 'black' }"> {{ Number(item.invest_price_sum).toFixed(1) }}</span>
                                        </template>
                                        <template v-slot:[`item.current_value`]="{ item }">
                                            <span  :style="{ color: item.current_value > 0 ? 'black' : 'black' }"> {{ Number(item.current_value).toFixed(1) }}</span>
                                        </template>
                                        <template v-slot:[`item.avgprc`]="{ item }">
                                            <span  :style="{ color: item.avgprc > 0 ? 'black' : 'black' }"> {{ Number(item.avgprc).toFixed(1) }}</span>
                                        </template>
                                        <template v-slot:[`item.lp`]="{ item }">
                                            <span  :style="{ color: item.lp > 0 ? 'black' : 'black' }"> {{ Number(item.lp).toFixed(1) }}</span>
                                        </template>
                                        <template v-slot:[`item.xirr`]="{ item }">
                                            <span  :style="{ color: item.xirr > 0 ? 'black' : 'black' }"> {{ Number(item.xirr).toFixed(2) }} %</span>
                                        </template>
                                        <template v-slot:[`item.per_sh_p_l`]="{ item }">
                                            <span  :style="{ color: item.per_sh_p_l > 0 ? 'green' : 'red' }"> {{ Number(item.per_sh_p_l).toFixed(2) }}</span>
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
                                </div>
                            </v-expand-transition>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="3" md="12" sm="12" class="d-none d-lg-block d-xl-block">
                        <div class="mr-14 mt-2 rounded-lg pa-3 pb-5"
                            style="position: fixed; border: 1px solid #dddddd;">
                            <div class="text-center">


                                <div class="mt-3">



                                    <svg width="45vh" height="30vh" viewBox="0 0 60 60" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M30 30C37.2487 30 43.125 24.1237 43.125 16.875C43.125 9.62626 37.2487 3.75 30 3.75C22.7513 3.75 16.875 9.62626 16.875 16.875C16.875 24.1237 22.7513 30 30 30Z"
                                            fill="#EFD358" />
                                        <path
                                            d="M34.7344 14.1104L34.29 15.6465H26L26.438 14.1104H34.7344ZM30.7417 24L26.165 18.4331L26.146 17.2461H28.4185C28.994 17.2461 29.4806 17.1593 29.8784 16.9858C30.2804 16.8123 30.5851 16.5584 30.7925 16.2241C31.0041 15.8898 31.1099 15.4751 31.1099 14.98C31.1099 14.2479 30.8919 13.6702 30.4561 13.2471C30.0202 12.8197 29.341 12.606 28.4185 12.606H26L26.4507 11H28.4185C29.4637 11 30.3228 11.1693 30.9956 11.5078C31.6727 11.8421 32.1763 12.3055 32.5063 12.8979C32.8364 13.4904 33.0015 14.1675 33.0015 14.9292C33.0015 15.6147 32.8597 16.2389 32.5762 16.8018C32.2969 17.3604 31.8504 17.8153 31.2368 18.1665C30.6232 18.5135 29.8149 18.7061 28.812 18.7441L28.7549 18.7568L32.957 23.8921V24H30.7417ZM34.7344 11L34.29 12.5488L27.6948 12.5044L28.1392 11H34.7344Z"
                                            fill="#B2500D" />
                                        <path
                                            d="M15 34.6875H11.25V30H9.375V34.6875H5.625C5.37636 34.6875 5.1379 34.7863 4.96209 34.9621C4.78627 35.1379 4.6875 35.3764 4.6875 35.625V45C4.6875 45.2486 4.78627 45.4871 4.96209 45.6629C5.1379 45.8387 5.37636 45.9375 5.625 45.9375H9.375V50.625H11.25V45.9375H15C15.2486 45.9375 15.4871 45.8387 15.6629 45.6629C15.8387 45.4871 15.9375 45.2486 15.9375 45V35.625C15.9375 35.3764 15.8387 35.1379 15.6629 34.9621C15.4871 34.7863 15.2486 34.6875 15 34.6875Z"
                                            fill="#009E77" />
                                        <path
                                            d="M41.25 35.625H37.5V30.9375H35.625V35.625H31.875C31.6264 35.625 31.3879 35.7238 31.2121 35.8996C31.0363 36.0754 30.9375 36.3139 30.9375 36.5625V45.9375C30.9375 46.1861 31.0363 46.4246 31.2121 46.6004C31.3879 46.7762 31.6264 46.875 31.875 46.875H35.625V51.5625H37.5V46.875H41.25C41.4986 46.875 41.7371 46.7762 41.9129 46.6004C42.0887 46.4246 42.1875 46.1861 42.1875 45.9375V36.5625C42.1875 36.3139 42.0887 36.0754 41.9129 35.8996C41.7371 35.7238 41.4986 35.625 41.25 35.625Z"
                                            fill="#009E77" />
                                        <path
                                            d="M28.125 41.25H24.375V36.5625H22.5V41.25H18.75C18.5014 41.25 18.2629 41.3488 18.0871 41.5246C17.9113 41.7004 17.8125 41.9389 17.8125 42.1875V51.5625C17.8125 51.8111 17.9113 52.0496 18.0871 52.2254C18.2629 52.4012 18.5014 52.5 18.75 52.5H22.5V57.1875H24.375V52.5H28.125C28.3736 52.5 28.6121 52.4012 28.7879 52.2254C28.9637 52.0496 29.0625 51.8111 29.0625 51.5625V42.1875C29.0625 41.9389 28.9637 41.7004 28.7879 41.5246C28.6121 41.3488 28.3736 41.25 28.125 41.25Z"
                                            fill="#FF4D6C" />
                                        <path
                                            d="M54.375 41.25H50.625V36.5625H48.75V41.25H45C44.7514 41.25 44.5129 41.3488 44.3371 41.5246C44.1613 41.7004 44.0625 41.9389 44.0625 42.1875V51.5625C44.0625 51.8111 44.1613 52.0496 44.3371 52.2254C44.5129 52.4012 44.7514 52.5 45 52.5H48.75V57.1875H50.625V52.5H54.375C54.6236 52.5 54.8621 52.4012 55.0379 52.2254C55.2137 52.0496 55.3125 51.8111 55.3125 51.5625V42.1875C55.3125 41.9389 55.2137 41.7004 55.0379 41.5246C54.8621 41.3488 54.6236 41.25 54.375 41.25Z"
                                            fill="#FF4D6C" />
                                    </svg>


                                    <p style="color:#666" class="font-weight-medium body-2 mt-3 mb-0 text-center">
                                        Holdings display the stocks and securities an investor owns in their portfolio.
                                    </p>
                                </div>
                            </div>



                        </div>
                    </v-col>
                </v-row>
            </div>

            <div class="d-block d-lg-none">
                <v-row>
                    <v-col cols="12">
                        <v-card class="pa-3 mt-2" elevation="0" outlined
                            style="border-radius: 4px; border: 1px solid #ddd;background-color:#FAFBFF">
                            <div class="text-center">
                                <p class="mb-0 title font-weight-bold"
                                    :style="{ color: (holdingdata && holdingdata.current_value > 0) ? 'black' : 'black' }">
                                    ₹
                                    {{ holdingdata && holdingdata.current_value ? (holdingdata.current_value)
                                        : '--' }}
                                </p>
                                <span class="mb-0 body-2 " style="color:#666">Current value</span>

                            </div>

                            <v-divider></v-divider>



                            <div class="d-flex mt-3">

                                <span class="mb-0 body-2 " style="color:#666">Total Invested</span>
                                <p class="mb-0  subtitle-1 ml-auto font-weight-bold"
                                    :style="{ color: (holdingdata && holdingdata.total_invest > 0) ? 'green' : 'red' }">
                                    ₹
                                    {{ holdingdata && holdingdata.total_invest ? (holdingdata.total_invest) :
                                        '--' }} </p>
                            </div>
                            <div class="d-flex">

                                <span class="mb-0 body-2 " style="color:#666">Profit & Loss</span>
                                <p class="mb-0  subtitle-1 ml-auto font-weight-bold"
                                    :style="{ color: (holdingdata && holdingdata.p_l > 0) ? 'green' : 'red' }">₹
                                    {{ holdingdata &&
                                        holdingdata.p_l ? (holdingdata.p_l) : '--' }} </p>
                            </div>




                        </v-card>

                        <div>
                            <v-expansion-panels accordion style="z-index: 0" class="pa-1 mt-2 d-block d-lg-none expan">
                                <v-expansion-panel v-for="(item, i) in holdingorderdata" :key="i">
                                    <v-expansion-panel-header class="pa-2">

                                        <p class="mb-0"><span class="font-weight-medium caption black--text">{{
                                            item.basket_title
                                        }}</span><br>

                                        </p>
                                      
                                        <p class="mb-0"><span class="font-weight-medium caption black--text">{{
                                            (item.invest_value) }}</span><br>
                                            <span class="font-weight-light caption grey--text">Buy prc</span>
                                        </p>

                                        <p class="mb-0"><span class="font-weight-medium caption "
                                                :style="{ color: item.current_price > 0 ? 'green' : 'red' }">{{
                                                    (item.current_price) }}</span><br>
                                            <span class="font-weight-light caption grey--text">Current prc</span>
                                        </p>

                                        <p class="mb-0"><span class="font-weight-medium caption "
                                                :style="{ color: item.p_l > 0 ? 'green' : 'red' }">{{
                                                    (item.p_l) }}</span><br>
                                            <span class="font-weight-light caption grey--text">P&L</span>
                                        </p>

                                        <p class="mb-0"><span class="font-weight-medium caption black--text">{{
                                            (item.xirr_value) }} %</span><br>
                                            <span class="font-weight-light caption grey--text">XIRR Value</span>
                                        </p>





                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-card v-for="iitem in item.order_detail" :key="iitem.index"
                                            style="border-top: 5px #f1f3f8 solid" class="elevation-0 px-4 pt-2"
                                            width="100%">

                                            <v-row class="px-2">
                                                <v-col>
                                                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                                                      Script
                                                    </p>
                                                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                                                       Quantity
                                                    </p>
                                                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                                                        Buy Price

                                                    </p>
                                                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                                                        Currect Value

                                                    </p>
                                                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                 Average Price

                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                        LTP

                    </p>
                    <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                        XIRR

                    </p>
                      <p class="mb-1 body-2 font-weight-regular" style="color: #666666">
                        P&L

                    </p>


                                                </v-col>
                                                <v-col class="text-end">
                                                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                                                        {{ iitem.tsym }}
                                                    </p>

                                                    <p class="mb-0 body-2 font-weight-regular" style="color: #666666">
                                                        {{ iitem.quantity }}
                                                    </p>
                                                    <p class="mb-0 body-2 font-weight-regular" :style="{ color: iitem.invest_price_sum > 0 ? 'green' : 'red' }">
                                                       {{ Number(iitem.invest_price_sum).toFixed(2) }}
                                                    </p>
                                                    <p class="mb-0 body-2 font-weight-regular" :style="{ color: iitem.invest_price_sum > 0 ? 'green' : 'red' }">
                                                        {{ Number(iitem.invest_price_sum).toFixed(2) }}
                                                    </p>
                                                      <p class="mb-0 body-2 font-weight-regular" :style="{ color: iitem.invest_price_sum > 0 ? 'green' : 'red' }">
                                                 {{ Number(iitem.invest_price_sum).toFixed(2) }}
                                                    </p>
                                                    <p class="mb-0 body-2 font-weight-regular" :style="{ color: iitem.lp > 0 ? 'green' : 'red' }">
                                                         {{ Number(iitem.lp).toFixed(2) }}
                                                    </p>  <p class="mb-0 body-2 font-weight-regular" :style="{ color: iitem.xirr > 0 ? 'green' : 'red' }">
                                                         {{ Number(iitem.xirr).toFixed(2) }} %
                                                    </p>
                                                    <p class="mb-0 body-2 font-weight-regular" :style="{ color: iitem.per_sh_p_l > 0 ? 'green' : 'red' }">
                                                       {{ Number(iitem.per_sh_p_l).toFixed(2) }}
                                                    </p>



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
            <!-- {{ holdingdata }}
{{ holdingdata.current_value }} -->


            <!-- <div class="mx-auto text-center ">
                            <img class="align-self-stretch mx-auto" width="80px"
                                :src="require('@/assets/no data folder.svg')" alt="no data" />
                            <h5 class="txt-999 font-weight-regular">There is no
                                data here yet!
                            </h5>
                        </div> -->
        </div>
    </div>
</template>

<script>
  import apiurl from "@/apiurl";
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

            bidherder: [

                { text: "Script", value: "tsym" },
                { text: "Quantity", value: "quantity" },

                { text: "Buy Price", value: "invest_price_sum" },

                { text: "Currect Value", value: "current_value" },
                { text: "Average Price", value: "avgprc" },
                { text: "LTP", value: "lp" },
                { text: "XIRR", value: "xirr" },
                { text: "P&L", value: "per_sh_p_l" },



            ],
            expandedIndex: -1,
            holdingdata: [],
            holdingorderdata: [],
            holdinglisloader:true

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
        holdingdetails() {
        this.holdinglisloader = true
            this.holdingdata = []
            this.holdingorderdata = []
            const axios = require('axios');
            let data = '';

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${apiurl.collectionurl}/holdingsupdate`,
                headers: {
                    Authorization: this.usession,
                    clientid: this.uid
                },
                data: data
            };
            var axiosThis = this
            axios.request(config)
                .then((response) => {
                    //   console.log(JSON.stringify(response.data)); 
        axiosThis.holdinglisloader = false

                    axiosThis.holdingdata = response.data.msg
                    axiosThis.holdingorderdata = response.data.msg.order_data
                    const orderDataArray = response.data.msg.order_data;
                    const tableItems = [];

                    // Transform data
                    orderDataArray.forEach(order => {
                        const orderDetailArray = Object.entries(order.order_detail).map(([key, value]) => ({
                            ...value,
                            key,
                            basket_title: order.basket_title,
                            current_price: order.current_price
                        }));

                        tableItems.push({
                            ...order,
                            order_detail_array: orderDetailArray
                        });
                    });

                    // Update holdingorderdata
                    this.holdingorderdata = tableItems;
                })
                .catch((error) => {
                    console.log(error);
        axiosThis.holdinglisloader = false

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

        this.holdingdetails()
    },
};
</script>