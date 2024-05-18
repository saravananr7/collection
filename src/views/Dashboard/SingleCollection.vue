<template>
  <div>
    <v-snackbar
      class="snakbar-sty rounded-pill mt-sm-16"
      transition="slide-x-reverse-transition"
      v-model="snackbar"
      timeout="6000"
      :value="true"
      :color="snackcolor"
      top
      right
      outlined
      fixed
      text-color="white"
    >
      <v-icon class="mr-2" :color="snackcolor">mdi-alert-outline</v-icon>
      {{ mesg }}
      <v-icon @click="snackbar = false" class="float-right" :color="snackcolor"
        >mdi-close-circle</v-icon
      >
    </v-snackbar>
    <!-- <v-progress-circular :size="50" color="primary" indeterminate 
      class="text-centre"></v-progress-circular> -->
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-if="singleload"
      class="text-centre"
    ></v-progress-circular>
    <v-row no-glutters>
      <v-col cols="12" md="9">
        <v-card
          style="border-radius: 4px; border: 1px solid #ddd"
          class="elevation-0 rounded-lg pb-5 d-none d-md-block"
        >
          <v-card style="background-color: #fafbff" class="pa-3" elevation="0">
            <v-toolbar
              style="background-color: #fafbff"
              class="tool-sty elevation-0 py-4 mb-7 px-4"
              color="#fff"
              dense
            >
              <v-list-item class="pl-0">
                <v-list-item-icon class="mr-4">
                  <img height="48px" width="48px" :src="modifiedUrl" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold title"
                    style="text-transform: capitalize"
                  >
                    {{
                      fullsingleres[0]
                        ? fullsingleres[0].basket_title
                          ? fullsingleres[0].basket_title
                          : ""
                        : ""
                    }}
                    <!-- <v-chip x-small v-if="fullsingleres[0]"
                                        :style="{ 'background-color': fullsingleres[0].access === 'subscribe' ? '#DEE4F4' : '#E4EFE8' }">
                                        <span v-if="fullsingleres[0]"
                                            :style="{ 'color': fullsingleres[0].access === 'subscribe' ? 'blue' : '#41A231' }">
                                            {{ fullsingleres[0].access ? fullsingleres[0].access : "" }}
                                        </span>
                                    </v-chip> -->
                  </v-list-item-title>
                  <div
                    class=""
                    v-if="
                      fullsingleres[0] &&
                      fullsingleres[0].etfs_weights &&
                      Object.keys(fullsingleres[0].etfs_weights).length > 0
                    "
                  >
                    <v-chip
                      class="ml-2"
                      label
                      v-for="(key, index) in Object.keys(
                        fullsingleres[0].etfs_weights
                      )"
                      :key="index"
                      style="background-color: #f1f3f8"
                      small
                    >
                      <span
                        style="color: #666666; text-transform: capitalize"
                        >{{ key }}</span
                      >
                    </v-chip>
                    <!-- <span class="fs-12 ml-3 mt-2 caption " style="color:blue"> ( Manged by
                                        {{ fullsingleres[0] ? (fullsingleres[0].master_name ?
            fullsingleres[0].master_name : "") : "" }} )
                                    </span> -->
                  </div>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <div>
                  <span
                    class="caption"
                    style="color: #666666; text-transform: uppercase !important"
                    >Min. Invest</span
                  >
                  <p class="fs-12 txt-000 font-weight-bold mb-0 body-2">
                    {{
                      fullsingleres[0] && fullsingleres[0].price
                        ? fullsingleres[0].price
                        : ''
                    }}
                    <v-btn class="ml-3" @click="refrshltp()" text icon
                      ><v-icon size="18">mdi-refresh</v-icon>
                    </v-btn>
                  </p>
                </div>
                <div class="ml-7">
                  <span
                    class="caption"
                    style="color: #666666; text-transform: uppercase !important"
                    >Total stocks</span
                  >
                  <p class="fs-12 txt-000 font-weight-bold mb-0 body-2">
                    {{
                      fullsingleres[0] && fullsingleres[0].stockcount
                        ? fullsingleres[0].stockcount
                        : ""
                    }}
                    stocks
                  </p>
                </div>
              </v-list-item>
            </v-toolbar>
          </v-card>
          <v-divider class="mb-4"></v-divider>
          <div class="ml-8">
            <p
              class="body-1 mt-1 fs-24 font-weight-bold mb-1"
              style="text-transform: capitalize"
            >
              {{
                fullsingleres[0]
                  ? fullsingleres[0].basket_title
                    ? fullsingleres[0].basket_title
                    : ""
                  : ""
              }}
            </p>
            <span class="mt-2 body-2" style="color: #666666">
              {{
                fullsingleres[0]
                  ? fullsingleres[0].basket_title
                    ? fullsingleres[0].basket_title
                    : ""
                  : ""
              }}
              {{
                fullsingleres[0]
                  ? fullsingleres[0].mang_sht_con
                    ? fullsingleres[0].mang_sht_con
                    : ""
                  : ""
              }}</span
            >
          </div>

          <v-row class="mt-4">
            <v-col cols="6" class="">
              <div class="ml-8">
                <span
                  style="text-transform: uppercase; color: #666666"
                  class="caption mb-0"
                  >Rebalance Frequency</span
                >
                <!-- <v-text-field v-model="textfieltext" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field> -->
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textfieltext }}
                </p>
                <v-divider></v-divider>
              </div>
            </v-col>
            <v-col cols="6" class="">
              <div class="mr-8">
                <span
                  style="text-transform: uppercase; color: #666666"
                  class="caption mb-0"
                  >Launched Date</span
                >
                <!-- <v-text-field v-model="textdate" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field> -->
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textdate }}
                </p>
                <v-divider></v-divider>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-card
          hide-actions
          style="border-radius: 4px; border: 1px solid #ddd"
          class="elevation-0 rounded-lg pa-5 pl-8 mt-5 d-none d-md-block"
        >
          <div color="black" class="text-none mx-auto my-auto" style=""></div>
          <div>
            <p class="mb-2 font-weight-bold title">Collection Weights</p>
            <p class="body-1 fs-24 font-weight-bold mb-2">
              Constituents Weights and Segment Composition
            </p>
            <span class="mb-2 mt-2 body-2" style="color: #666666"
              >Each fund is uniquely allocated to suit and match customer
              expectations based on the profile and return expectations.</span
            >
            <v-row>
              <v-col cols="12" class="mt-5">
                <span
                  class="mb-2 mt-14 font-weight-bold title"
                  style="color: #666666"
                  >Constituents</span
                ><br />
                <span class="mb-2 mt-2 body-2" style="color: #666666"
                  >See detailed composition of smallcase portfolio</span
                >
                <v-divider class="mt-3 mb-4"></v-divider>

                <div
                  v-if="
                    fullsingleres[0] && fullsingleres[0].access != 'subscribe'
                  "
                  :style="{
                    opacity: fullsingleres[0]
                      ? fullsingleres[0].access == 'subscribe'
                        ? '0'
                        : ''
                      : '',
                    'user-select': fullsingleres[0]
                      ? fullsingleres[0].access == 'subscribe'
                        ? 'none'
                        : ''
                      : '',
                  }"
                >
                  <div class="d-flex mx-auto justify-space-between">
                    <div class="d-flex">
                      <v-btn
                        class="elevation-0 transparent caption pa-0 font-weight-bold"
                        style="color: red"
                        @click="resetsigleres()"
                        depressed
                        outlined
                        >Reset Changes</v-btn
                      ></div><div>
                      <v-select
                        style="max-width: 200px"
                        v-model="weightselected"
                        :items="weightedChange"
                        @change="
                          weightselected == 'Equial-Weighted'
                            ? changetoEqualWeight()
                            : ''
                        "
                        required
                        dense
                        hide-details
                        outlined
                        class="body-2 mb-0 pt-0 mt-0"
                      ></v-select>
                    </div>
                  </div>
                  <v-row
                    class="text--secondary font-weight-medium py-1 pt-4 my-0"
                    no-gutters
                  >
                    <v-col cols="4" class="py-0">
                      <p class="mb-0">Segments and stocks</p></v-col
                    >
                    <v-col cols="2">Price</v-col>
                    <v-col cols="3" class="py-0">
                      <span> Weightage (%)</span>
                    </v-col>
                    <v-col cols="1"> Share </v-col>
                    <v-col cols="2">Avg Weight </v-col>
                  </v-row>
                  <v-divider class="pt-0"> </v-divider>
                  <div
                    v-if="
                      fullsingleres &&
                      fullsingleres[0] &&
                      fullsingleres[0].etfs_weights
                    "
                  >
                    <div
                      v-for="(item, index, k) in fullsingleres[0].etfs_weights"
                      :key="k"
                    >
                      <v-row
                        class="text--black font-weight-medium py-1 pt-4 my-0"
                        no-gutters
                      >
                        <v-col cols="12">
                          <v-row no-gutters>
                            <v-col cols="4" class="py-0">
                              <p class="mb-0 text-capitalize">{{ index }}</p>
                            </v-col>
                            <v-col cols="2"></v-col>
                            <v-col cols="3" class="py-0 text-center">
                              <span>
                                {{
                                  calculateTotalWeight(item)
                                    ? calculateTotalWeight(item)
                                    : ""
                                }}%</span
                              >
                            </v-col>
                          </v-row>
                          <v-row
                            v-for="(m, j) in fullsingleres[0].etfs_weights[
                              index
                            ]"
                            :key="j"
                            no-gutters
                          >
                            <v-col cols="4" class="py-0">
                              <p class="mb-0 text-capitalize caption my-2 ml-1">
                                {{ m.tsym ? m.tsym : "" }}
                              </p>
                            </v-col>
                            <v-col cols="2" class="py-0">
                              <p
                                class="mb-0 text-capitalize body-2 my-2 ml-2 font-weight-medium"
                              >
                                {{ m.price ? m.price : "" }}
                              </p>
                            </v-col>
                            <v-col cols="3" class="py-0 text-center my-1">
                              <div class="d-flex">
                                <v-text-field
                                  v-model="m.weights"
                                  class="mt-0 pt-0 px-0 elevation-0 caption text-center"
                                  hide-details
                                  @change="
                                    getAddbtn(
                                      fullsingleres[0].etfs_weights[index][j]
                                        .token,
                                      parseFloat(m.weights)
                                    )
                                  "
                                  single-line
                                  outlined
                                  type="number"
                                  hide-spin-buttons
                                  style="max-width: 120px; height: 40px"
                                  :min="minweights"
                                  :readonly="
                                    weightselected == 'Equial-Weighted'
                                  "
                                  :max="maxvalueperc"
                                  dense
                                >
                                  <template #append>
                                    <v-btn
                                      :disabled="
                                        weightselected == 'Equial-Weighted'
                                      "
                                      @click="
                                        m.weights < maxvalueperc
                                          ? (m.weights = Number(m.weights) + 1)
                                          : null,
                                          getAddbtn(
                                            fullsingleres[0].etfs_weights[
                                              index
                                            ][j].token,
                                            m.weights
                                          )
                                      "
                                      icon
                                      class="elevation-0"
                                      small
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <circle
                                          cx="12"
                                          cy="12"
                                          r="12"
                                          fill="white"
                                        />
                                        <path
                                          d="M12 8V16"
                                          stroke="#666666"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                        />
                                        <path
                                          d="M16 12L8 12"
                                          stroke="#666666"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                        />
                                      </svg>
                                    </v-btn>
                                  </template>
                                  <template #prepend-inner>
                                    <v-btn
                                      :disabled="
                                        weightselected == 'Equial-Weighted'
                                      "
                                      @click="
                                        m.weights > 1
                                          ? (m.weights = Number(m.weights) - 1)
                                          : null,
                                          getAddbtn(
                                            fullsingleres[0].etfs_weights[
                                              index
                                            ][j].token,
                                            m.weights
                                          )
                                      "
                                      icon
                                      class="elevation-0"
                                      small
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <circle
                                          cx="12"
                                          cy="12"
                                          r="12"
                                          fill="white"
                                        />
                                        <path
                                          d="M16 12L8 12"
                                          stroke="#666666"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                        />
                                      </svg>
                                    </v-btn>
                                  </template>
                                </v-text-field>
                                <span
                                  class="title font-weight-semibold my-auto ms-1"
                                  style="color: #666666"
                                >
                                </span>
                              </div>
                            </v-col>
                            <v-col cols="1">
                              <div
                                class="mb-0 text-capitalize body-2 my-2 ml-2 font-weight-medium"
                              >
                                <span
                                  class="justify-end d-inline-flex"
                                  style="width: 20px"
                                  >{{ m.quantity }}</span
                                >
                              </div>
                            </v-col>
                            <v-col cols="1" class="py-0">
                              <div
                                class="mb-0 text-capitalize body-2 my-2 ml-2 font-weight-medium"
                              >
                                <span>{{ m.avg_weight_percent }}</span>
                              </div>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-divider
                        v-if="
                          fullsingleres[0] &&
                          k !=
                            Object.entries(fullsingleres[0].etfs_weights)
                              .length -
                              1
                        "
                      ></v-divider>
                    </div>
                  </div>
                  <v-row class="my-2">
                    <v-col cols="7" class="my-auto ps-4">
                      <span class="font-weight-bold"
                        >Min.invest amount :
                        {{
                          fullsingleres[0] && fullsingleres[0].price
                            ? fullsingleres[0].price
                            : ''
                        }}
                      </span>
                    </v-col>
                    <v-col cols="5" class="text-center d-flex">
                      <v-btn class=" text-none elevation-0 mr-2 blue--text lighten-1 transparent body-2" @click="$router.push({
                        name:'customize collection',
                        params:{itemid:fullsingleres[0].id}
                      })" >Customize collection</v-btn>
                      <v-btn
                        class="elevation-0 white--text text-none"
                        rounded
                        depressed
                        color="black"
                        @click="confirmation = true"
                        >Invest</v-btn
                      ></v-col
                    >
                  </v-row>
                </div>
                <div v-else class="text-center">
                  <v-btn class="white--text" color="black">Subscribe</v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <v-card
          outlined
          elevation="0"
          class="mt-7 pl-7 pa-5"
          rounded-lg
          style="border: 1px solid #dddddd"
        >
          <p class="mb-2 font-weight-bold title ml-2 mt-1">
            About the
            {{
              fullsingleres[0]
                ? fullsingleres[0].master_name
                  ? fullsingleres[0].master_name
                  : ""
                : ""
            }}
          </p>

          <v-row class="">
            <v-col cols="7">
              <p class="body-1 fs-24 ml-2 font-weight-bold mb-2">
                Collection Objective
              </p>
              <p class="mb-2 mt-2 ml-2 body-2" style="color: #666666">
                {{
                  fullsingleres[0]
                    ? fullsingleres[0].master_sht_cont
                      ? fullsingleres[0].master_sht_cont
                      : ""
                    : ""
                }}
              </p>
            </v-col>
            <v-col cols="5">
              <p class="mb-0 ml-2 body-1 fs-24 font-weight-bold mb-1">
                Collection Managers
              </p>
              <v-card
                elevation="0"
                style="
                  border-radius: 8px;
                  border: 1.5px solid #ccc;
                  background: #fff;
                "
                class="pl-3 pt-3 pr-3 mt-3"
              >
                <v-row>
                  <v-col cols="2">
                    <div>
                      <img :src="modifiedUrl1" width="45px" height="45px" />
                      <!-- {{modifiedUrl1}} -->
                    </div>
                  </v-col>
                  <v-col>
                    <p class="mb-0 body-1 font-weight-bold">
                      {{
                        fullsingleres[0]
                          ? fullsingleres[0].master_name
                            ? fullsingleres[0].master_name
                            : ""
                          : ""
                      }}
                    </p>

                    <div class="d-flex">
                      <div class="">
                        <p class="mb-0 body-2" style="color: #666666">
                          {{
                            fullsingleres[0]
                              ? fullsingleres[0].experience
                                ? fullsingleres[0].experience
                                : ""
                              : ""
                          }}
                          yrs
                          <span class="body-2" style="color: #666666"
                            >experience</span
                          >
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-col cols="6" class="">
    <div class="ml-3">
    <span style="text-transform: uppercase;color:#666666" class="caption mb-0">Rebalance Frequency</span>
    <v-text-field v-model="textfieltext" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field>
  </div>
  </v-col> -->
            <v-col cols="6" class="">
              <div class="ml-2">
                <span
                  style="text-transform: uppercase; color: #666666"
                  class="caption mb-0"
                  >Experience</span
                >
                <!-- <v-text-field v-model="textfieltext11" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field> -->
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textfieltext11 }}
                </p>
                <v-divider></v-divider>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="3">
        <div class="mr-14" style="position: fixed">
          <p
            style="text-transform: capitalize"
            class="subtitle-1 font-weight-bold text-"
          >
            {{
              fullsingleres[0]
                ? fullsingleres[0].basket_title
                  ? fullsingleres[0].basket_title
                  : ""
                : ""
            }}
          </p>
          <p class="body-2" style="color: #666">
            Get access to constituents and rebalance updates for
            {{
              fullsingleres[0]
                ? fullsingleres[0].basket_title
                  ? fullsingleres[0].basket_title
                  : ""
                : ""
            }}
            by
            <span class="body-1 font-weight-bold" style="color: #000"
              >Zebu Trade</span
            >
          </p>
          <p class="body-2" style="color: #666">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="4"
              viewBox="0 0 12 4"
              fill="none"
            >
              <path
                d="M2 2H10"
                stroke="#999999"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Seamlessly place orders in one click
          </p>
          <p class="body-2" style="color: #666">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="4"
              viewBox="0 0 12 4"
              fill="none"
            >
              <path
                d="M2 2H10"
                stroke="#999999"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Get regular rebalance updates
          </p>
          <p class="body-2" style="color: #666">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="4"
              viewBox="0 0 12 4"
              fill="none"
            >
              <path
                d="M2 2H10"
                stroke="#999999"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Easily start SIPs for disciplined investing
          </p>
          <p class="body-2" style="color: #666">
            On acceptance of the mandate, the bid amount will get blocked in
            your bank account.
          </p>
          <v-divider></v-divider>
          <div
            class="text-center mt-4"
            v-if="
              fullsingleres[0] && fullsingleres[0].access == 'subscribe'
                ? false
                : localsess === '' || localsess === null
                ? true
                : false
            "
          >
            <v-btn
              @click="deploybas()"
              elevation="0"
              rounded
              class="text-none"
              color="black"
              dark
              ><span style="color: #fff"> Login </span></v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="confirmation" persistent max-width="380">
      <v-card class="rounded-lg px-2 px-md-2">
        <v-card-title class="pr-2"
          >Order Confirmation <v-spacer></v-spacer>
          <v-btn icon @click="confirmation = false">
            <v-icon>mdi-close</v-icon>
          </v-btn></v-card-title
        >
        <v-card-text>
          <b>{{
            fullsingleres[0]
              ? fullsingleres[0].basket_title
                ? fullsingleres[0].basket_title
                : ""
              : ""
          }}</b>
          <p class="my-2 body-1 font-weight-medium">
            Invest Amount :{{fullsingleres[0] && fullsingleres[0].price? fullsingleres[0].price :''}}
          </p>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn
            elevation="0"
            color="black white--text"
            rounded
            block
            @click="deploybasket()"
            :loading="basload"
          >
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
// import { getBestMF } from '@/components/mixins/getAPIdata'

export default {
  data() {
    return {
      inputchange: "",
      weightselected: "Custom-Weighted",
      weightedChange: ["Equial-Weighted", "Custom-Weighted"],
      bestmfdata: "",
      fullsingleres: [],
      dumpdata: [],
      stockcountdump: 0,
      urlPrefix: apiurl.collectionurl,
      modifiedUrl: "",
      modifiedUrl1: "",
      textfieltext: "",
      snackbar: false,
      countvalue: 0,
      mesg: "",
      snackcolor: "#000",
      singleload: true,
      activePanels: [],
      weightcheck: 0,
      autoload:false,
      minweights:1.00,
      maxvalueperc: "",
      activePanel: -1,
      textfieltext11: "",
      textdate: "",
      localsess: "",
      confirmation: false,
      ltpminpricedump: "",
      basload: false,
      cleid: localStorage.getItem('userid'),
      apitoken:
        localStorage.getItem('sess'),
      orderscitt: [],
      searchaa: null,
      searchdataaa: [],
    };
  },
  //     computed: {
  //     etfsWeights() {
  //       return this.fullsingleres.length > 0 ? this.fullsingleres[0].etfs_weights : {};
  //     }
  //   },
  methods: {
    refrshltp() {
      let data = JSON.stringify({
        basketid: this.fullsingleres[0].id,
        etfs_weights: "",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiurl.collectionurl}/getltp`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      var axiosThis = this;
      axios
        .request(config)
        .then((response) => {
          axiosThis.fullsingleres[0].price = response.data.minprice;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deploybas() {
      if (this.localsess === "" || this.localsess === null) {
        eventBus.$emit("login-event");
      } else {
        this.confirmation = true;
        this.refrshltp();
      }
    },
    deploybasket() {
      this.basload = true;
      let data = JSON.stringify({
        basketid: this.fullsingleres[0].id,
        etfs_weights: this.fullsingleres[0].etfs_weights,
        session: localStorage.getItem("sess"),
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiurl.collectionurl}/orderExecute`,
        headers: {
          Authorization: this.localsess,
          clientid: localStorage.getItem("userid"),
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
            axiosThis.mesg = response.data.msg.toUpperCase();
            axiosThis.snackcolor = "success";
            axiosThis.snackbar = true;
          } else {
            axiosThis.confirmation = false;
            axiosThis.snackbar = true;
            axiosThis.mesg = response.data.msg;
            axiosThis.snackcolor = "error";
          }
        })
        .catch((error) => {
          console.log(error);
          axiosThis.basload = false;
          axiosThis.confirmation = false;
          axiosThis.mesg = "Network Error";
          axiosThis.snackcolor = "error";
          axiosThis.snackbar = true;
        });
    },

    calculateTotalWeight(item) {
      let totalWeight = 0;
      item.forEach((item) => {
        totalWeight += parseFloat(item.weights);
      });
      return totalWeight.toFixed(2);
    },
    singlepagedata() {
      this.singleload = true;
      this.fullsingleres = [];
      let data = JSON.stringify({
        basketid: this.bestmfdata,
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
            axiosThis.getModifiedImageUrl();
            axiosThis.getModifiedImageUrl11();
            axiosThis.dumpdata = JSON.parse(
              JSON.stringify(axiosThis.fullsingleres[0].etfs_weights)
            );
            if (
              axiosThis.fullsingleres[0] &&
              axiosThis.fullsingleres[0].etfs_weights
            ) {
              let count = parseInt(axiosThis.fullsingleres[0].stockcount) - 1;
              axiosThis.maxvalueperc = 100 - count;
            }
          }
        })
        .catch((error) => {
          console.log(error);
          axiosThis.singleload = false;
          axiosThis.snackbar = true;
          axiosThis.snackcolor = "error";
          axiosThis.mesg = error;
        });
        
    },
    getModifiedImageUrl() {
      const parts = this.fullsingleres[0].basket_img.split("Baskets/");
      this.modifiedUrl = this.urlPrefix + "/" + parts[1];

      return this.modifiedUrl;
    },
    getModifiedImageUrl11() {
      const parts = this.fullsingleres[0].master_img_path.split("Baskets/");
      this.modifiedUrl1 = this.urlPrefix + "/" + parts[1];
      return this.modifiedUrl1;
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
    changetoEqualWeight() {
      this.countvalue=0
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
              this.mesg = "Invaild input value";
            } else if (value == this.maxvalueperc) {
              this.fullsingleres[0].etfs_weights[key][i].weights = parseFloat(
                this.maxvalueperc
              ).toFixed(2);
              this.snackcolor = "red";
              this.snackbar = true;
              this.mesg = "Invaild input value";
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
        var data = `jData={"uid":"${this.cleid}","stext":"${script}"}&jKey=${this.apitoken}`;
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://go.mynt.in/NorenWClientTP/SearchScrip",
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
  },
  watch: {
    searchaa(val) {
      val && val !== this.orderscitt && this.searchscrpt(val);
    },
  },
  mounted() {
    this.singleload = true;
    let params = this.$route.params;

    if (params.best) {
      this.bestmfdata = params.best;
      this.singlepagedata();
      this.singleload = true;
      this.localsess = localStorage.getItem("usession");
    } else {
      this.snackbar = true;
      this.snackcolor = "error";
      this.mesg = "Error occurred";
      if (this.$router) {
        setTimeout(() => {
          this.$router.push("/collection");
        }, 200);
      } else {
        console.error("Vue Router instance is not available.");
      }
    }
  },
};
</script>
<style scoped>
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 50px;
}
.v-toolbar__content .v-btn.v-btn--icon.v-size--default,
.v-toolbar__extension .v-btn.v-btn--icon.v-size--default {
  height: 0px;
  width: 0px;
}
</style>
