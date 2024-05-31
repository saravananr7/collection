<template>
  <div>
    <v-snackbar class="snakbar-sty rounded-pill mt-sm-16" transition="slide-x-reverse-transition" v-model="snackbar"
      timeout="6000" :value="true" :color="snackcolor" top right outlined fixed text-color="white">
      <v-icon class="mr-2" :color="snackcolor">mdi-alert-outline</v-icon>
      {{ mesg }}
      <v-icon @click="snackbar = false" class="float-right" :color="snackcolor">mdi-close-circle</v-icon>
    </v-snackbar>
    <!-- <v-progress-circular :size="50" color="primary" indeterminate 
      class="text-centre"></v-progress-circular> -->
    <v-progress-circular :size="50" color="primary" indeterminate v-if="singleload"
      class="text-centre"></v-progress-circular>
    <p style="word-spacing: 5px" class="mb-0 pt-16 caption">
      <span style="color: #0037B7; cursor: pointer; " @click="$router.push('/')">Collection</span>
      <span style="color: #000; "> > </span>
      <span style="color: #000; ">SinglePage</span>
    </p>
    <v-row no-glutters class="pt-2">
      <v-col cols="12" md="9">
        <v-card style="border-radius: 4px; border: 1px solid #ddd"
          class="elevation-0 rounded-lg pb-5 d-none d-md-block">
          <v-card style="background-color: #fafbff" class="py-3 px-4 mb-4" elevation="0">
            <v-toolbar style="background-color: #fafbff" class="tool-sty elevation-0 mb-1 px-0" color="#fff" dense>
              <v-list-item class="pl-0 pr-1">
                <v-list-item-avatar class="mr-2">
                  <img :src="modifiedUrl" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold title" style="text-transform: capitalize">
                    {{
                      fullsingleres[0]
                        ? fullsingleres[0].basket_title
                          ? fullsingleres[0].basket_title
                          : ""
                        : ""
                    }}
                  </v-list-item-title>
                  <div v-if="
                    fullsingleres[0] &&
                    fullsingleres[0].etfs_weights &&
                    Object.keys(fullsingleres[0].etfs_weights).length > 0
                  ">
                    <v-chip color="#FAFBFF" text-color="#666666" label class="text--secondary mr-1 text-capitalize px-1"
                      x-small v-for="(j, l) in fullsingleres[0].tags" :key="l">{{ j
                      }}</v-chip>
                  </div>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <div>
                  <span class="caption" style="color: #666666;">Min. Invest</span>
                  <p class="fs-12 txt-000 font-weight-bold mb-0 body-2">
                    ₹ {{
                      fullsingleres[0] && fullsingleres[0].price
                        ? fullsingleres[0].price
                        : "0.00"
                    }}
                    <v-btn class="ml-3" @click="refrshltp()" text icon><v-icon size="18">mdi-refresh</v-icon>
                    </v-btn>
                  </p>
                </div>
                <!-- <div class="ml-7">
                  <span class="caption" style="color: #666666;">No.of Stocks</span>
                  <p class="fs-12 txt-000 font-weight-bold mb-0 body-2">
                    {{
                      fullsingleres[0] && fullsingleres[0].stockcount
                        ? fullsingleres[0].stockcount
                        : ""
                    }}
                    stocks
                  </p>
                </div> -->
              </v-list-item>
            </v-toolbar>
          </v-card>
          <div class="px-4">
            <span class="body-2" style="color: #666666">
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
              }}</span>
          </div>

          <v-row class="pt-4 px-1">
            <v-col cols="6">
              <div class="ml-3">
                <span style="color: #666666" class="caption mb-0">Rebalance Frequency</span>
                <!-- <v-text-field v-model="textfieltext" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field> -->
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textfieltext }}
                </p>
                <v-divider></v-divider>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="mr-8">
                <span style="color: #666666" class="caption mb-0">Launched Date</span>
                <!-- <v-text-field v-model="textdate" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field> -->
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textdate }}
                </p>
                <v-divider></v-divider>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-card hide-actions style="border-radius: 4px; border: 1px solid #ddd"
          class="elevation-0 rounded-lg mt-5 d-none d-md-block">
          <div class="pt-4">
            <div class="px-4">
              <p class="font-weight-bold headline">Collection Weights</p>
              <p class="subtitle-1 font-weight-bold mb-0">
                Constituents Weights and Segment Composition
              </p>
              <p class="body-2" style="color: #666666">Each fund is uniquely allocated to suit and match
                customer
                expectations based on the profile and return expectations.</p>

              <p class="mb-0 font-weight-bold subtitle-1" style="color: #666666">Constituents</p>
              <p class="body-2" style="color: #666666">See detailed composition of smallcase
                portfolio</p>
              <v-divider class="my-3"></v-divider>

            </div>
            <div>
              <div v-if="
                fullsingleres[0] && fullsingleres[0].access != 'subscribe'
              " :style="{
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
              }">

                <div>
                  <v-toolbar class="elevation-0 mb-3" color="#fff" dense>
                    <p class="title font-weight-bold mb-2">Invest Collection</p>
                    <v-spacer></v-spacer>

                    <v-select rounded style="
max-width: 220px;" background-color="#FAFBFF" v-model="weightselected" :items="weightedChange" @change="
  weightselected == 'Equial-Weighted'
    ? changetoEqualWeight()
    : ''
  " required dense filled hide-details append-icon="mdi-chevron-down"
                      class="body-2 font-weight-bold mb-0 pt-0 mt-0"></v-select>

                    <div class="px-4">
                      <v-tooltip color="black" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="elevation-0 caption pa-0 font-weight-bold" style="color: black"
                            @click="resetsigleres()" outlined v-bind="attrs" v-on="on"
                            icon><v-icon>mdi-refresh</v-icon></v-btn>
                        </template>
                        <span>Reset Values</span>
                      </v-tooltip>
                    </div>
                  </v-toolbar>

                  <v-card color="#FAFBFF" class="rounded-0 elevation-0 px-4">
                    <v-row class="text--secondary subtitle-2 font-weight-medium my-0" style="padding: 10px 0;"
                      no-gutters>
                      <v-col cols="3" class="py-0">Stocks</v-col>
                      <v-col cols="2" class="text-right">Price</v-col>
                      <v-col cols="1"></v-col>
                      <v-col cols="3">Weightage (%)</v-col>
                      <v-col cols="1"> Share </v-col>
                      <v-col cols="2" class="text-right">Avg Weight </v-col>
                    </v-row>
                  </v-card>
                  <v-divider></v-divider>
                  <div v-if="
                    fullsingleres &&
                    fullsingleres[0] &&
                    fullsingleres[0].etfs_weights
                  " class="px-4">
                    <div v-for="(item, index, k) in fullsingleres[0].etfs_weights" :key="k">
                      <template >

                        <div v-for="(m, j) in item" :key="j">
                          <v-row no-gutters class="py-2">
                            <v-col cols="3" class="py-0 d-flex align-center">
                              <p class="mb-0 text-capitalize fs-14 font-weight-medium">
                                {{ m.tsym ? m.tsym : "" }} <v-chip  text-color="white" :color="m.exists == 'no' ? 'green': 'white'" label class="mr-1 text-capitalize px-1"
                      x-small >{{
                                    m.exists ? m.exists == 'no' ? "new" : '' : '' }}
                      </v-chip>
                              </p>
                            </v-col>
                            <v-col cols="2" class="py-0 d-flex align-center justify-end">
                              <p class="mb-0 text-capitalize body-2 font-weight-medium">
                                ₹{{ m.price ? Number(m.price).toFixed(2) : "" }}
                              </p>
                            </v-col>
                            <v-col cols="1"></v-col>
                            <v-col cols="3" class="py-0 d-flex align-center">
                              <v-text-field block  v-model="m.weights" class="weg elevation-0 caption text-center"
                                hide-details  outlined type="number" hide-spin-buttons style="max-width: 120px;"
                                :min="minweights" :readonly="weightselected == 'Equial-Weighted'
                                  " :max="maxvalueperc" dense @keyup="
                                      m.weights < maxvalueperc
                                        ? (m.weights = Number(m.weights) + 1)
                                        : null,
                                      getAddbtn(
                                        fullsingleres[0].etfs_weights[
                                          index
                                        ][j].token,
                                        m.weights
                                      )" @keydown="
                                      m.weights > 1
                                        ? (m.weights = Number(m.weights) - 1)
                                        : null,
                                      getAddbtn(
                                        fullsingleres[0].etfs_weights[
                                          index
                                        ][j].token,
                                        m.weights
                                      )" >
                                <template #append>
                                  <v-btn :disabled="weightselected == 'Equial-Weighted'
                                    " @click="
                                      m.weights < maxvalueperc
                                        ? (m.weights = Number(m.weights) + 1)
                                        : null,
                                      getAddbtn(
                                        fullsingleres[0].etfs_weights[
                                          index
                                        ][j].token,
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
                                  <v-btn :disabled="weightselected == 'Equial-Weighted'
                                    " @click="
                                      m.weights > 1
                                        ? (m.weights = Number(m.weights) - 1)
                                        : null,
                                      getAddbtn(
                                        fullsingleres[0].etfs_weights[
                                          index
                                        ][j].token,
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
                            </v-col>
                            <v-col cols="1" class="d-flex align-center">
                              <div class="text-capitalize body-2 font-weight-medium">
                                <span>{{ m.quantity }}</span>
                              </div>
                            </v-col>
                            <v-col cols="2" class="py-0  d-flex align-center justify-end">
                              <div class="text-capitalize body-2 font-weight-medium">
                                <span>{{ m.avg_weight_percent }}%</span>
                              </div>
                            </v-col>
                          </v-row>
                          <v-divider v-if="j != item.length - 1"></v-divider>
                        </div>
                      </template>

                      <v-divider v-if="
                        fullsingleres[0] &&
                        k !=
                        Object.entries(fullsingleres[0].etfs_weights)
                          .length -
                        1
                      "></v-divider>
                    </div>
                  </div>
                  <div v-if="
                    fullsingleres &&
                    fullsingleres[0] &&
                    fullsingleres[0].deleted_etf
                  " class="px-4">
                  <v-divider></v-divider>
                    <div v-for="(item, index) in fullsingleres[0].deleted_etf" :key="index">
                          <v-row no-gutters class="py-2">
                            <v-col cols="3" class="py-0 d-flex align-center">
                              <p class="mb-0 text-capitalize fs-14 font-weight-medium text--secondary">
                                {{ item.tsym ? item.tsym : "" }} <v-chip  text-color="white" disabled label class="red darken-1 mr-1 text-capitalize px-1"
                      x-small > deleted
                      </v-chip><!-- <span v-if="item.exists" class=" font-weight-bold text--secondary"
                                  >(delete
                                  {{ item.newquant ? item.newquant > 0 ? item.newquant : '' : '' }})</span> -->
                              </p>
                            </v-col>
                            <v-col cols="2" class="py-0 d-flex align-center justify-end">
                              <p class="mb-0 text-capitalize body-2 font-weight-medium text--secondary">
                                ₹{{ item.price ? Number(item.price).toFixed(2) : "" }}
                              </p>
                            </v-col>
                            <v-col cols="1"></v-col>
                            <v-col cols="3" class="py-0 d-flex align-center">
                              <v-text-field block value="0.00"  class="weg elevation-0 caption text-center "
                                hide-details  outlined type="number" hide-spin-buttons style="max-width: 120px;"
                                :min="minweights" readonly
                                   :max="maxvalueperc" dense>
                                <template #append>
                                  <v-btn disabled  icon class="elevation-0" small>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                      fill="none">
                                      <circle cx="12" cy="12" r="12" fill="white" />
                                      <path d="M12 8V16" stroke="#666666" stroke-width="2" stroke-linecap="round" />
                                      <path d="M16 12L8 12" stroke="#666666" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                  </v-btn>
                                </template>
                                <template #prepend-inner>
                                  <v-btn disabled icon class="elevation-0" small>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                      fill="none">
                                      <circle cx="12" cy="12" r="12" fill="white" />
                                      <path d="M16 12L8 12" stroke="#666666" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                  </v-btn>
                                </template>
                              </v-text-field>
                            </v-col>
                            <v-col cols="1" class="d-flex align-center">
                              <div class="text-capitalize body-2 font-weight-medium text--secondary">
                                <span>{{ item.quantity }}</span>
                              </div>
                            </v-col>
                            <v-col cols="2" class="py-0  d-flex align-center justify-end">
                              <div class="text-capitalize body-2 font-weight-medium text--secondary">
                                <span>0%</span>
                              </div>
                            </v-col>
                          </v-row>
                          <v-divider v-if="index != fullsingleres[0].deleted_etf.length - 1"></v-divider>
                      <v-divider v-if="
                        fullsingleres[0] &&
                        k !=
                        Object.entries(fullsingleres[0].etfs_weights)
                          .length -
                        1
                      "></v-divider>
                    </div>
                  </div>
                  <v-divider></v-divider>
                </div>
                <v-row class="my-1 px-3">
                  <v-col cols="10" class="my-auto ps-4">
                    <span class="font-weight-bold">Invest amount :
                      ₹ {{
                        fullsingleres[0] && fullsingleres[0].price
                          ? fullsingleres[0].price
                          : ""
                      }}
                    </span>
                  </v-col>
                  <!-- <v-col cols="3">
                    <v-btn rounded outlined block class="text-none elevation-0 black--text body-2" @click="
                      $router.push({
                        name: 'customize collection',
                        params: { itemid: fullsingleres[0].id },
                      })
                      "><span class="font-weight-bold">Customize collection</span></v-btn>
                  </v-col> -->
                  <v-col cols="2" class="pl-0">
                    <v-btn class="elevation-0 white--text text-none float-end" rounded color="black" block
                      @click="checkloginstatus()">{{
                        fullsingleres[0].rebalance ? 'Rebalance' : 'Invest' }}</v-btn>
                  </v-col>
                </v-row>
              </div>
              <div v-else class="text-center mt-2 mb-6">
                <v-btn class="elevation-0 white--text text-none px-6" rounded color="black" height="40px"
                  @click="subscribedialog = true, getLedgerPrice()">Subscribe</v-btn>
              </div>
            </div>
          </div>
        </v-card>
        <v-card outlined elevation="0" class="mt-7 px-4 py-3" rounded-lg style="border: 1px solid #dddddd">
          <p class="mb-2 font-weight-bold title ml-0 mt-1">
            About the
            {{
              fullsingleres[0]
                ? fullsingleres[0].master_name
                  ? fullsingleres[0].master_name
                  : ""
                : ""
            }}
          </p>

          <v-row no-gutters>
            <v-col cols="7">
              <p class="body-1 fs-24 ml-0 font-weight-bold mb-0">
                Collection Objective
              </p>
              <p class="mb-2 body-2" style="color: #666666">
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
              <p class="mb-0 body-1 fs-24 font-weight-bold mb-1">
                Collection Managers
              </p>
              <v-card elevation="0" style="
                  border-radius: 8px;
                  border: 1.5px solid #ccc;
                  background: #fff;" class="px-3 pt-3 pr-3 mt-3">
                <v-row>
                  <v-col cols="2">
                    <div>
                      <img class="rounded-xl" :src="modifiedUrl1" width="45px" height="45px" />
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

                    <p class="mb-0 body-2" style="color: #666666">
                      {{
                        fullsingleres[0]
                          ? fullsingleres[0].experience
                            ? fullsingleres[0].experience
                            : ""
                          : ""
                      }}
                      yrs
                      <span class="body-2" style="color: #666666">experience</span>
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col cols="6" >
    <div class="ml-3">
    <span style="text-transform: uppercase;color:#666666" class="caption mb-0">Rebalance Frequency</span>
    <v-text-field v-model="textfieltext" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field>
  </div>
  </v-col>
            <v-col cols="6">
              <div class="ml-0">
                <span style="color: #666666" class="caption mb-0">Experience</span>
                <v-text-field v-model="textfieltext11" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field>
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textfieltext11 }}
                </p>
                <v-divider></v-divider>
              </div>
            </v-col>
          </v-row> -->
        </v-card>
      </v-col>
      <v-col cols="3">
        <div class="mr-14" style="position: fixed">
          <p style="text-transform: capitalize" class="subtitle-1 font-weight-bold text-">
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
            <span class="body-1 font-weight-bold" style="color: #000">Zebu Trade</span>
          </p>
          <p class="body-2" style="color: #666">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
              <path d="M2 2H10" stroke="#999999" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Seamlessly place orders in one click
          </p>
          <p class="body-2" style="color: #666">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
              <path d="M2 2H10" stroke="#999999" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Get regular rebalance updates
          </p>
          <p class="body-2" style="color: #666">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
              <path d="M2 2H10" stroke="#999999" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Easily start SIPs for disciplined investing
          </p>
          <p class="body-2" style="color: #666">
            On acceptance of the mandate, the bid amount will get blocked in
            your bank account.
          </p>
          <v-divider></v-divider>
          <div class="text-center mt-4" v-if="
            fullsingleres[0] && fullsingleres[0].access == 'subscribe'
              ? false
              : localsess === '' || localsess === null
                ? true
                : false
          ">
            <v-btn @click="deploybas()" elevation="0" rounded class="text-none" color="black" dark><span
                style="color: #fff">
                Login </span></v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog persistent max-width="480" v-model="confirmation">
      <v-card class="rounded-lg px-2 py-1">
        <v-card-title class="px-4 pb-0">Order Basket Details<v-spacer></v-spacer>
          <v-btn icon @click="confirmation = false">
            <v-icon>mdi-close</v-icon>
          </v-btn></v-card-title>
        <div class="pa-5">
          <p class="font-weight-semibold">Basket Name : <span class="font-weight-bold">{{ fullsingleres[0] &&
            fullsingleres[0].basket_title ? (fullsingleres[0].basket_title).toUpperCase() : ''
              }}</span>
          </p>
          <!-- <p class="font-weight-semibold">Basket Id : <span class="font-weight-bold">{{ opendiag.id }}</span></p> -->
          <!-- {{fullcovertres}} -->
          <div v-if="fullsingleres[0] && fullsingleres[0].etfs_weights && fullsingleres[0].etfs_weights.equity">
            <v-data-table :headers="headersrebalnce" :items="fullsingleres[0].etfs_weights.equity" :items-per-page="100"
              hide-default-footer class="elevation-0 mb-3 ma-0 pa-0" outlined fixed-header disable-sort dense
              style="border:1px solid grey">
              <template v-slot:[`item.weights`]="{ item }">
         <span> {{ item.weights }}%</span>
        </template><template v-slot:[`item.price`]="{ item }">
         <span> {{ Number(item.price).toFixed(2) }}</span>
        </template>
            </v-data-table>
          </div>
          <p class="font-weight-semibold">Invest amount : <span class="font-weight-bold"> {{
            fullsingleres[0] && fullsingleres[0].price
              ? fullsingleres[0].price
              : ''
              }}</span></p>
          <v-btn color="black" height="48px" :loading="basload" class="text-none white--text" block
            @click="deploybasket()" rounded>Proceed</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="subscribedialog" min-width="390" max-width="500">
      <v-card class="rounded-lg px-2 py-1">
        <v-form ref="ddpiform">
          <v-card-title class="black--text font-weight-medium" style="font-size:20px">Debit alert
            <v-spacer></v-spacer>
            <v-btn class="mt2" icon @click="subscribedialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pb-1">
            <div class="mx-auto pt-4" align="center">
              <p class="text-center mb-0 subtitle-1 font-weight-bold"> Subscribe Charge </p>

              <v-row align="center" justify="center">
                <v-col cols="12" sm="6">
                  <v-alert width="100" class="px-4 mt-2 black--text" dense color="black" border="left" text
                    icon="mdi-currency-inr mr-0 ">
                    <strong>{{ basketprice }}</strong>
                  </v-alert>
                </v-col>
              </v-row>
              <p class="mb-1 subtitle-1 font-weight-medium">
                Available ledger
              </p>
              <p>
                ₹ {{ leadgerBal }}
              </p>
              <v-checkbox hide-details :on-icon="'mdi-checkbox-marked-circle'"
                :off-icon="'mdi-checkbox-blank-circle-outline'"
                label="I acknowledge to debit amount from my ledger"></v-checkbox>
            </div>

            <v-alert class="mb-0 mt-2 py-2" v-if="leadgerBal >= basketprice ? false : true" dense outlined type="info"
              color="black" elevation="0">
              <p style="font-size:14px;" class="text-center mb-0">Insufficient balance, Add fund
                <a :href="`https://fund.mynt.in/?uid=${actid}&token=${susertoken}`"><b>Click here</b></a>
              </p>
            </v-alert>
          </v-card-text>
          <v-card-actions class="pb-4 px-4">
            <v-btn color="black" height="48px" :loading="basload" class="text-none white--text" block
              :disabled="leadgerBal >= basketprice ? false : true" @click="subscribeSubmit" rounded>Submit</v-btn>
          </v-card-actions>
        </v-form>
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
      autoload: false,
      minweights: 1.0,
      maxvalueperc: "",
      activePanel: -1,
      textfieltext11: "",
      textdate: "",
      localsess: "",
      confirmation: false,
      ltpminpricedump: "",
      basload: false,
      cleid: localStorage.getItem("userid"),
      apitoken: localStorage.getItem("sess"),
      orderscitt: [],
      searchaa: null,
      searchdataaa: [],
      subscribedialog: false,
      leadgerBal: 0,
      basketprice: 0,

      headersrebalnce: [
        { text: "Symbol", value: "tsym" },
        { text: "Price", value: "price",align:'right' },
        { text: "Quantity", value: "quantity",align:'center' },
        // { text: "ISIN", value: "ISIN" },
        { text: "Weight", value: "weights" }]
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
          axiosThis.ltpminpricedump = response.data.minprice;
          
          axiosThis.fullsingleres[0].etfs_weights = response.data.msg;
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    subscribeSubmit() { },
    deploybas() {
      if (this.localsess === "" || this.localsess === null) {
        eventBus.$emit("login-event");
      } else {
        this.confirmation = true;
        this.refrshltp();
      }
    },
    checkloginstatus() {
      if (
        localStorage.getItem("sess") === "" ||
        localStorage.getItem("sess") === null
      ) {
        eventBus.$emit("login-event");
      } else {
        this.confirmation = true
      }
    },
    deploybasket() {
      this.basload = true;
      var data = ''
      
      if(this.fullsingleres[0].rebalance){
        data = JSON.stringify({
        basketid: this.fullsingleres[0].id,
        etfs_weights: this.fullsingleres[0].etfs_weights,
        session: localStorage.getItem("sess"),
        rebalance_status:"yes",
        deleted_etf:this.fullsingleres[0].deleted_etf
      })
      }else{
        data = JSON.stringify({
        basketid: this.fullsingleres[0].id,
        etfs_weights: this.fullsingleres[0].etfs_weights,
        session: localStorage.getItem("sess"),
        rebalance_status:''

      });}

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
            axiosThis.mesg = response.data.msg;
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
        client_id: localStorage.getItem('userid'),
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
            axiosThis.basketprice = axiosThis.fullsingleres[0].basketprice
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
    getLedgerPrice() {
      var axiosThis = this
      let data = JSON.stringify({
        "clientid": this.cleid
      });

      let config = {
        method: 'post',
        url: `${apiurl.legetbalance_api}/all_ledger_balance`,
        headers: {
          "Authorization": this.localsess,
          "Clientid": this.cleid,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          var res = response.data
          axiosThis.leadgerBal = res.total
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    searchaa(val) {
      val && val !== this.orderscitt && this.searchscrpt(val);
    },
  },
  mounted() {
    this.singleload = true;
    let params = localStorage.getItem("id");

    if (params) {
      this.bestmfdata = params;
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
.v-expansion-panel--active>.v-expansion-panel-header {
  min-height: 50px;
}

.v-toolbar__content .v-btn.v-btn--icon.v-size--default,
.v-toolbar__extension .v-btn.v-btn--icon.v-size--default {
  height: 0px;
  width: 0px;
}
</style>

<style>
.weg .v-input__slot {
  min-height: 36px !important;
  padding: 4px !important;
}

.weg .v-input__prepend-inner,
.weg .v-input__append-inner {
  margin-top: 0px !important;
}

.weg .v-text-field__slot {
  height: 28px !important;
}
</style>
