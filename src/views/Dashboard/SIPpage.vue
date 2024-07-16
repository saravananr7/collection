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
                <span style="color: #000; ">SIP </span>
            </p>

            <p class="title font-weight-bold">SIP </p>
            <v-data-table :loading="tabload" style="border: 1px solid #efeef3" disable-sort :headers="headers"
                :items="fullresdata" single-expand show-expand :expanded.sync="expanded1" fixed-header item-key="sip_id"
                class="elevation-0">

                <template v-slot:[`item.status`]="{ item }">
                    <span>{{ item.internal.active == 'true' ? 'Active' : item.internal.active }}</span>
                </template>


                <template v-slot:[`item.cancel`]="{ item }" >

                    <v-btn v-if="item.del_status == false" elevation="0" rounded outlined color="red"
                        class="text-none ma-2 bodu-2 black--text" @click="order_details_show(item)" small>

                        <span class="font-weight-bold">Cancel</span>
                    </v-btn>
                    <v-btn v-if="item.del_status == false" elevation="0" rounded  color="balck"
                        class="text-none ma-2 bodu-2 black--text" @click="modifysipfun(item)" icon>
<v-icon>mdi-pencil</v-icon>
                      
                    </v-btn>
                </template>
             
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="pl-0 pr-0">
                        <v-data-table :loading="tabload" :items-per-page="10" :headers="bidherder"
                            :items="item.order_etf" @click:row="toggleExpanded" fixed-header disable-sort
                            class="elevation-0">


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
                    <v-card class="pa-7 rounded-lg">


                        <p class="subtitle-1 mb-0 text-center">Do you want to cancel this SIP?</p>
                        <p class="text-center"> <b class="text-center">{{ identifyid.sip_name ? identifyid.sip_name :
                            '--' }}</b>
                        </p>
                        <v-row>
                            <v-col cols="6">
                                <v-btn @click="dialogbox = false" elevation="0" outlined rounded block
                                    color="black"><span>Cancel</span></v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn @click="cancelsipfun()" elevation="0" :loading="cancelsipload" rounded block
                                    color="black"><span class="white--text">Proceed</span></v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-dialog>

            </div>

            <v-dialog v-model="sipmodifyorder" width="500" style="height:300">
                <v-card elevation="0" class="pa-3">
                    <v-card-title class="px-4 pb-0">Modify SIP<v-spacer></v-spacer>
                        <v-btn icon @click="sipmodifyorder = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn></v-card-title>
                    <v-card>

                        <v-card outlined elevation="0" class="pa-3">

                            <v-row>
                                <v-col cols="6" class="pb-0">
                                    <span class="body-2 ml-3">SIP Name <span class="ml-1 red--text">*</span></span>
                                    <v-text-field v-model="fullsingleres.sip_name" outlined hide-details class="ml-3"
                                        dense></v-text-field>
                                </v-col>
                                <v-col cols="6" class="pb-0">
                                    <span class="body-2 ">Start Date<span class="ml-1 red--text">*</span></span>
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field hide-details outlined dense v-model="date"
                                                prepend-inner-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6" class="pt-0 mt-0">
                                    <span class="body-2 mt-0 pt-0 ml-3">Frequency <span
                                            class="ml-1 red--text">*</span></span>
                                    <v-select v-model="fullsingleres.frequency" outlined hide-details class="ml-3" dense
                                        :items="['Daily', 'Monthly', 'Weekly', 'Fortnightly']"></v-select>
                                </v-col>
                                <v-col cols="6" class="pt-0 mt-0">
                                    <span class="body-2 mt-0 pt-0 ">No of SIPs <span
                                            class="ml-1 red--text">*</span></span>
                                    <v-text-field v-model="fullsingleres.end_period" outlined type="number"
                                        hide-spin-buttons hide-details dense></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>


                        <v-card elevation='0' class="elevation-0 rounded-lg  ">
                            <div class="">

                                <div>
                                    <v-card color="#FAFBFF" class="rounded-0 elevation-0 px-4">
                                        <v-row class="text--secondary subtitle-2 font-weight-medium my-0"
                                            style="padding: 10px 0;" no-gutters>
                                            <v-col cols="4" class="py-0">Exchange</v-col>
                                            <v-col cols="4" class="py-0">Stocks</v-col>
                                            <v-col cols="4">Share</v-col>
                                        </v-row>
                                    </v-card>
                                    <v-divider></v-divider>
                                    <div class="px-4">
                                        <div v-for="(item, index) in fullsingleres.order_etf" :key="index">

                                            <div>
                                                <v-row no-gutters class="py-2">
                                                    <v-col cols="4" class="py-0 d-flex align-center">
                                                        <p class="mb-0 text-capitalize fs-14 font-weight-medium">
                                                            {{ item.exch ? item.exch : "" }}
                                                        </p>
                                                    </v-col>
                                                    <v-col cols="4" class="py-0 d-flex align-center">
                                                        <p class="mb-0 text-capitalize fs-14 font-weight-medium">
                                                            {{ item.tsym ? item.tsym : "" }}
                                                        </p>
                                                    </v-col>
                                                    <v-col cols="4" class="py-0 d-flex align-center">
                                                        <v-text-field v-model="item.qty" class="mb-0 font-weight-medium"
                                                            hide-details solo elevation-0 type="number" outlined
                                                            dense></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </v-card>

                    </v-card>
                    <v-btn @click="submitData()" :loading="sipbtload" rounded class="mt-2 mb-2" block color="black"><span
                            class="white--text">Proceed</span></v-btn>

                </v-card>

            </v-dialog>






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
                { text: "SIP Id", value: "sip_id" },
                { text: "SIP Name", value: "sip_name" },
                { text: "Date", value: "start_date" },
                // { text: "Baskset name", value: "basket_title" },
                { text: "Client Id", value: "client_id" },
                { text: "Frequency", value: "frequency" },
                { text: "End Period", value: "end_period" },
                { text: "Status", value: "status" },

                { text: "", value: "cancel", align: 'right' },
                // { text: "", value: "modify" },


                { text: "", value: "data-table-expand" },

                // { text: "Amount", value: "amount", },
            ],
            bidherder: [
                { text: "Exchange", value: "exch" },
                { text: "Script", value: "tsym" },
                { text: "Quantity", value: "qty" },


            ],
            cancelsipload: false,
            fullsingleres: [],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            dataemodify: '',
            sipmodifyorder: false,
            sipbtload:false
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

        submitData() {
            // Flatten the nested array and map the data for submission
           this.processedData = this.fullsingleres.order_etf.flat().map(item => ({
                exch: item.exch,
                tsym: item.tsym,
                qty: item.qty,
                "prd":"C",
                token:item.token
            }));
            // console.log('Processed data:', processedData);

            this.sipbtload = true
            const axios = require('axios');
            let data = JSON.stringify({
                "siptype": "modify",
                session: localStorage.getItem("sess"),
                sip_id:this.fullsingleres.sip_id,
                etfs_weights: this.processedData,
                startdate: this.date.slice(8, 10) + this.date.slice(5, 7) + this.date.slice(0, 4),
                end_period: this.fullsingleres.end_period,
                sip_name: this.fullsingleres.sip_name,
                frequency: this.fullsingleres.frequency
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://192.168.5.179:5111/siporder',
                headers: {
                    Authorization: this.usession,
                    clientid: this.uid,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            var axiosThis = this
            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    axiosThis.sipbtload = false
                    if (response.data.msg == "OK") {
                        axiosThis.confirmation = false;
                        axiosThis.mesg = response.data.msg;
                        axiosThis.snackcolor = "success";
                        axiosThis.snackbar = true;
                    } else {
                        axiosThis.confirmation = false;
                        axiosThis.snackbar = true;
                        axiosThis.mesg = response.data.msg;
                        axiosThis.snackcolor = "error";
                    }
                    axiosThis.sipmodifyorder = false
                    axiosThis.processedData = []
                    // axiosThis.sipname = ''
                    // axiosThis.sipfreq = ''
                    // axiosThis.noossip = ''

                })
                .catch((error) => {
                    console.log(error);
                    axiosThis.sipbtload = false
                    axiosThis.sipmodifyorder = false
                    // axiosThis.sipname = ''
                    // axiosThis.sipfreq = ''
                    // axiosThis.noossip = ''
                    axiosThis.mesg = "Network Error";
                    axiosThis.snackcolor = "error";
                    axiosThis.snackbar = true;

                });
        },


        oredrdetails() {
            this.fullresdata = []
            this.tabload = true
            const axios = require('axios');
            let data = JSON.stringify({
                "session": localStorage.getItem("sess")
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://192.168.5.179:5111/siplistshow',
                headers: {
                    Authorization: this.usession,
                    clientid: this.uid,
                    'Content-Type': 'application/json'

                },
                data: data
            };
            var axiosThis = this
            axios.request(config)
                .then((response) => {
                    axiosThis.tabload = false

                    if (response.data.msg != 'No data') {
                        axiosThis.fullresdata = response.data.msg

                    }
                    axiosThis.tabload = false
                })
                .catch((error) => {
                    console.log(error);
                    axiosThis.tabload = false
                    axiosThis.snackbar = true;
                    axiosThis.snackcolor = "error";
                    axiosThis.mesg = "Network Error";

                });

        },
        order_details_show(item) {
            this.identifyid = item;
            this.getLedgerPrice()
            this.dialogbox = true
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
        cancelsipfun() {
            this.cancelsipload = true

            const axios = require('axios');
            let data = JSON.stringify({
                "siptype": "delete",
                "session": localStorage.getItem("sess"),
                "sip_id": this.identifyid.sip_id
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://192.168.5.179:5111/siporder',
                headers: {
                    Authorization: this.usession,
                    clientid: this.uid,
                    'Content-Type': 'application/json'

                },
                data: data
            };
            var axiosThis = this
            axios.request(config)
                .then((response) => {
                    axiosThis.cancelsipload = false

                    // console.log(JSON.stringify(response.data));
                    if (response.data.msg.ReqStatus == "OK") {
                        axiosThis.dialogbox = false;
                        axiosThis.mesg = 'SIP Cancel Successfull';
                        axiosThis.snackcolor = "success";
                        axiosThis.snackbar = true;
                        axiosThis.oredrdetails()
                    } else {
                        axiosThis.dialogbox = false;
                        axiosThis.snackbar = true;
                        axiosThis.mesg = response.data.msg;
                        axiosThis.snackcolor = "error";
                    }
                })
                .catch((error) => {
                    console.log(error);
                    axiosThis.cancelsipload = false

                    axiosThis.dialogbox = false;
                    axiosThis.snackbar = true;
                    axiosThis.snackcolor = "error";
                    axiosThis.mesg = "Network Error";
                });

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

        // -----------------------------------------modify sip order function ----------------------------------------------

        modifysipfun(item) {
            this.fullsingleres = item
            console.log(this.fullsingleres.register_date);
            this.dataemodify = this.fullsingleres.register_date.slice(4) + '-' + this.fullsingleres.register_date.slice(2, 4) + '-' + this.fullsingleres.register_date.slice(0, 2);
            console.log(' this.dataemodify', this.dataemodify);
            this.date = this.dataemodify
            this.sipmodifyorder = true
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