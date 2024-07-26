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

    <p style="word-spacing: 5px" class="mb-0 pt-16 caption">
      <span style="color: #0037B7; cursor: pointer; " @click="$router.push('/')">Collection</span>
      <span style="color: #000; "> > </span>
      <span style="color: #000; "> {{
        fullsingleres[0]
          ? fullsingleres[0].basket_title
            ? fullsingleres[0].basket_title
            : ""
          : ""
      }}</span>
    </p>

    <v-row no-glutters class="pt-0 pt-md-0">
      <v-col cols="12" lg="9" md="12" sm="12" class="colclass">
        <v-progress-linear style="max-height: 3px;" indeterminate v-if="singleload"></v-progress-linear>






        <v-card class=" ss-cards elevation-0 mt-2 rounded-lg  ">
          <v-card style="background-color: #fafbff" class=" d-none d-lg-block d-xl-block" elevation="0">
            <v-toolbar style="background-color: #fafbff" class="tool-sty pl-3 pr-3 mt-3   elevation-0 mb-1 px-0"
              color="#fff" dense>
              <v-list-item class="pl-0 pr-1" style="background-color: #fafbff">
                <v-list-item-avatar class="mr-2">
                  <img v-if="fullsingleres[0] && fullsingleres[0].basket_img" :src="modifiedUrl" />
                  <v-avatar v-else :color="params >= 9 ? letters[params % 10] : letters[params]" size="48">
                    <span class="subtitle-1 white--text font-weight-bold">{{ fullsingleres[0]
                      ? fullsingleres[0].basket_title
                        ? fullsingleres[0].basket_title.split(" ")[0][0]
                        : ""
                      : "" }}{{ fullsingleres[0]
                        ? fullsingleres[0].basket_title
                          ? fullsingleres[0].basket_title.split(" ")[1] ? fullsingleres[0].basket_title.split(" ")[1][0] :
                            ''
                          : ""
                        : "" }}</span>
                  </v-avatar>
                  <!-- <img :src="modifiedUrl" /> -->
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold title" style="text-transform: capitalize">
                    {{
                      fullsingleres[0]
                        ? fullsingleres[0].basket_title
                          ? fullsingleres[0].basket_title.toUpperCase()
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
                  <!-- <v-chip class=" float-right mt-2 text-capitalize" x-small :text-color="fullsingleres[0] && fullsingleres[0].access
                    ? (fullsingleres[0].access === 'free' ? '#4BAC3C' : '#093FBA')
                    : '#defaultColor'
                    " :color="fullsingleres[0] && fullsingleres[0].access
                      ? (fullsingleres[0].access === 'free' ? '#ECF8F1' : '#ccd9ff')
                      : '#defaultBackgroundColor'
                      ">
                    <span>{{
                      fullsingleres[0] && fullsingleres[0].access
                        ? fullsingleres[0].access
                        : "--"
                    }}</span>
                  </v-chip><br> -->
                  <span class="caption" style="color: #666666;">Min. Invest</span>
                  <p class="fs-12 txt-000 font-weight-bold mb-0 body-2">
  ₹ {{
    fullsingleres[0] && !isNaN(Number(fullsingleres[0].price))
      ? Number(fullsingleres[0].price).toFixed(2)
      : "0.00"
  }}
  <v-btn class="ml-3" @click="refrshltp()" text icon>
    <v-icon size="16">mdi-refresh</v-icon>
  </v-btn>
</p>

                </div>
                <div class="ml-5" v-if="fullsingleres[0] && fullsingleres[0].cagr['cagr_3year']">

                  <span class="caption" style="letter-spacing: 0em;color: #666666">3Y CAGR</span>
                  <p class="fs-12 txt-000 font-weight-bold mb-0 body-2" :class="{
                    'blur-text': logincheck === '' || logincheck === null
                  }"
                    :style="{ color: logincheck === '' || logincheck === null ? 'transparent' : parseInt(fullsingleres[0].cagr.cagr_3year) > 0 ? '#4BAC3C' : '#E42B2B', letterSpacing: '0.1em', textShadow: logincheck === '' || logincheck === null ? '#4BAC3C 0 0 5px' : '' }">
                    {{
                      fullsingleres[0].cagr ? fullsingleres[0].cagr.cagr_3year ? fullsingleres[0].cagr.cagr_3year : "" :
                        ""
                    }}%
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


          <v-card style="background-color: #fafbff" class=" d-block d-lg-none" elevation="0">
            <v-toolbar style="background-color: #fafbff" class="tool-sty pl-3 pr-3 mt-3 elevation-0 mb-1 px-0"
              color="#fff" dense>
              <v-list-item class="pl-0 pr-1" style="background-color: #fafbff">
                <v-list-item-avatar class="mr-2">
                  <img v-if="fullsingleres[0] && fullsingleres[0].basket_img" :src="modifiedUrl" />
                  <v-avatar v-else :color="params >= 9 ? letters[params % 10] : letters[params]" size="48">
                    <span class="subtitle-1 white--text font-weight-bold">{{ fullsingleres[0]
                      ? fullsingleres[0].basket_title
                        ? fullsingleres[0].basket_title.split(" ")[0][0]
                        : ""
                      : "" }}{{ fullsingleres[0]
                        ? fullsingleres[0].basket_title
                          ? fullsingleres[0].basket_title.split(" ")[1] ? fullsingleres[0].basket_title.split(" ")[1][0] :
                            ''
                          : ""
                        : "" }}</span>
                  </v-avatar>
                  <!-- <img :src="modifiedUrl" /> -->
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold title" style="text-transform: capitalize">
                    {{
                      fullsingleres[0]
                        ? fullsingleres[0].basket_title
                          ? fullsingleres[0].basket_title.toUpperCase()
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



              </v-list-item>

            </v-toolbar>
            <div class="d-flex">
              <div class="ml-5">

                <span class="caption" style="color: #666666;">Min. Invest</span>
                <p class="fs-12 txt-000 font-weight-bold mb-0 body-2">
  ₹ {{
    fullsingleres[0] && !isNaN(Number(fullsingleres[0].price))
      ? Number(fullsingleres[0].price).toFixed(2)
      : "0.00"
  }}
  <v-btn class="ml-3" @click="refrshltp()" text icon>
    <v-icon size="16">mdi-refresh</v-icon>
  </v-btn>
</p>
              </div>
              <div class="ml-5" v-if="fullsingleres[0] && fullsingleres[0].cagr['cagr_3year']">

                <span class="caption" style="letter-spacing: 0em;color: #666666">3Y CAGR</span>
                <p class="fs-12 txt-000 font-weight-bold mb-0 body-2" :class="{
                  'blur-text': logincheck === '' || logincheck === null
                }"
                  :style="{ color: logincheck === '' || logincheck === null ? 'transparent' : parseInt(fullsingleres[0].cagr.cagr_3year) > 0 ? '#4BAC3C' : '#E42B2B', letterSpacing: '0.1em', textShadow: logincheck === '' || logincheck === null ? '#4BAC3C 0 0 5px' : '' }">
                  {{
                    fullsingleres[0].cagr ? fullsingleres[0].cagr.cagr_3year ? fullsingleres[0].cagr.cagr_3year : "" :
                      ""
                  }}%
                </p>
              </div>
            </div>
          </v-card>
          <!-- <div class="ml-3" v-if="
            fullsingleres[0] &&
            fullsingleres[0].etfs_weights &&
            Object.keys(fullsingleres[0].etfs_weights).length > 0
          ">
            <v-chip color="#FAFBFF" text-color="#666666" label class="text--secondary mr-1 text-capitalize px-1" x-small
              v-for="(j, l) in fullsingleres[0].tags" :key="l">{{ j
              }}</v-chip>
          </div> -->
          <div class="mt-3 ml-3 mr-3 mb-2">
            <span class="body-2 " style="color: #666666">

              {{
                fullsingleres[0]
                  ? fullsingleres[0].mang_sht_con
                    ? fullsingleres[0].mang_sht_con
                    : ""
                  : ""
              }}</span>
          </div>

          <v-row class="pt-2 pl-4 pb-4 px-1">
            <v-col cols="12" lg="3" md="4" sm="6">
              <div class="mr-8">
                <span style="color: #666666;text-transform: uppercase" class="caption mb-0">Launched Date</span>
                <!-- <v-text-field v-model="textdate" readonly  hide-details style="color:black" class="subtitle-1 mt-0 pt-0 font-weight-bold"></v-text-field> -->
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textdate.slice(4, 17) }}
                </p>
                <v-divider></v-divider>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="4" sm="6">
              <div class="">
                <span style="color: #666666;text-transform: uppercase" class="caption mb-0">Rebalance Frequency</span>
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{ textfieltext }}
                </p>

                <v-divider></v-divider>
              </div>
            </v-col>
            <v-col cols="12" lg="3" md="4" sm="6">
              <div class="">
                <span style="color: #666666;text-transform: uppercase" class="caption mb-0">Last Rebalance</span>
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  {{
                    fullsingleres[0]
                      ? fullsingleres[0].last_rebal
                        ? fullsingleres[0].last_rebal.slice(4, 17)
                        : "---"
                      : ""
                  }}
                </p>

                <v-divider></v-divider>
              </div>
            </v-col>

            <v-col cols="12" lg="3" md="4" sm="6">
              <div class="">
                <span style="color: #666666;text-transform: uppercase" class="caption mb-0">Next Rebalance</span>
                <p class="subtitle-1 mb-0 mt-0 pt-0 font-weight-bold">
                  ---
                </p>

                <v-divider></v-divider>
              </div>
            </v-col>

          </v-row>

        </v-card>




        <v-card v-if="errrrordata != 'no data found'" outlined elevation="0" class=" seccadrsize ss-cards px-4 py-3"
          rounded-lg style="border: 1px solid #dddddd">
          <div class="d-flex">

            <div>
              <p class="title font-weight-bold mb-0">Historical NAV</p>
              <p class="mb-0   " style="color:#666666;font-size:13px">
                Past ETF performance
              </p>
            </div>
            <v-btn-toggle @change="linechartdata()" class="ml-auto mt-3" v-model="toggle_exclusive"
              style="background-color:white" color="black" dense group>
              <v-btn small dense :value="0" text>
                1M
              </v-btn>

              <v-btn small dense :value="1" text>
                1Y
              </v-btn>

              <v-btn small dense :value="3" text>
                3Y
              </v-btn>

              <v-btn small dense :value="5" text>
                5Y
              </v-btn>
            </v-btn-toggle>
          </div>
          <v-divider></v-divider>
          <v-progress-linear v-if="chartlineload" indeterminate color="indigo"></v-progress-linear>


          <v-row class="pb-4">

            <v-col cols="12">
              <div class="mt-3">

                <!-- <div id="mainnew" style="width: 100%; height:50vh"></div> -->
                <v-card height="420px" id="mainnew" class="rounded-lg  elevation-0">
                </v-card>
              </div>

            </v-col>

            <v-col cols="12">
              <div class="d-flex">
                <p class="body-1  font-weight-bold mb-0 mt-2" v-if="fullsingleres[0] && fullsingleres[0].cagr != ''">
                  Fund(CAGR) returns
                </p>

                <!-- <p class="ml-1 caption font-weight-medium mb-0 ml-auto mt-2" style="color: #666666">
                  <v-icon color="green" size="8" class="mt-0 ">mdi-circle</v-icon>
                  Benchmark
                </p> -->
              </div>
              <div class="d-none d-lg-block d-xl-block">
                <v-row class="mt-3" v-if="fullsingleres[0] && fullsingleres[0].cagr != ''">
                  <v-col cols="12" lg="3" sm="6" md="6" class="pa-0 ">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_month > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_month < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc" class="elevation-0 pa-2 mb-1  ml-4  mr-1">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_month > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_month + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        1 MONTH
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                     
                    </p> -->
                    </v-card>
                  </v-col>


                  <v-col cols="12" lg="3" sm="6" md="6" class="pa-0">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_1year > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_1year < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc" class="elevation-0 pa-2 mb-1 ml-3 mr-1 mt-lg-0 mt-sm-10">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_1year > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_1year + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        1 YEAR
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                   
                    </p> -->
                    </v-card>
                  </v-col>

                  <v-col cols="12" lg="3" sm="6" md="6" class="pa-0">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_3year > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_3year < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc" class="elevation-0 ml-3 pa-2  mt-sm-3 mt-lg-0 mb-1 mr-1">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_3year > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_3year + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        3 YEAR
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                      
                    </p> -->
                    </v-card>
                  </v-col>

                  <v-col cols="12" lg="3" sm="6" md="6" class="pa-0">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_5year > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_5year < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc"
                      class="elevation-0 ml-3  mt-sm-3  mt-lg-0  pa-2 mb-1 mr-4">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_5year > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_5year + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        5 YEAR
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                   
                    </p> -->
                    </v-card>
                  </v-col>


                </v-row>
              </div>

              <div class="d-block d-lg-none">
                <v-row class="mt-3" v-if="fullsingleres[0] && fullsingleres[0].cagr != ''">
                  <v-col cols="6" class="pa-0 ">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_month > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_month < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc" class="elevation-0 pa-2 mb-1 ml-3   mr-1">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_month > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_month + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        1 MONTH
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                     
                    </p> -->
                    </v-card>
                  </v-col>


                  <v-col cols="6" class="pa-0">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_1year > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_1year < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc" class="elevation-0 pa-2 mb-1 ml-3 mr-1 mt-lg-0 mt-sm-10">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_1year > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_1year + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        1 YEAR
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                   
                    </p> -->
                    </v-card>
                  </v-col>

                  <v-col cols="6" class="pa-0">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_3year > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_3year < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc" class="elevation-0 ml-3 pa-2 mt-3 mb-1 mr-1">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_3year > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_3year + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        3 YEAR
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                      
                    </p> -->
                    </v-card>
                  </v-col>

                  <v-col cols="6" class="pa-0">
                    <v-card :color="fullsingleres[0] && fullsingleres[0].cagr
                      ? fullsingleres[0].cagr.cagr_5year > 0
                        ? '#FBFFFA'
                        : fullsingleres[0].cagr.cagr_5year < 0
                          ? '#FFFCFB'
                          : ''
                      : ''" style="outline: 1px solid #cccccc" class="elevation-0 ml-3  mt-3 pa-2 mb-1 mr-1">
                      <p :class="{
                        'blur-text': logincheck === '' || logincheck === null
                      }" class="subtitle-1 mb-0" :style="{
                      color: fullsingleres[0] && fullsingleres[0].cagr
                        ? fullsingleres[0].cagr.cagr_5year > 0
                          ? '#43A833'
                          : '#FF1717'

                        : ''
                    }">
                        {{ fullsingleres[0] && fullsingleres[0].cagr
                          ? fullsingleres[0].cagr.cagr_5year + '%'
                          : '' }}
                      </p>

                      <p class="mb-0 subtitle-2" style="color: #666666">
                        5 YEAR
                      </p>
                      <!-- <p class="mb-0 subtitle-2" style="color: #666666">
                      CAGR
                   
                    </p> -->
                    </v-card>
                  </v-col>


                </v-row>
              </div>

            </v-col>



          </v-row>


        </v-card>




        <v-card v-if="pieschartdata.error != 'no data found'" outlined elevation="0"
          class="seccadrsize ss-cards px-4 py-3" rounded-lg style="border: 1px solid #dddddd">
          <p class="title font-weight-bold mt-2 mb-2">Collection Weights</p>

          <v-row>
            <v-col cols="12" lg="7" sm="12" md="12">
              <!-- <v-expansion-panels style="border: 1px solid #dddddd" outlined dense small
                class="mt-3 pt-0 pa-0 ma-0 expan" elevation="0">
                <v-expansion-panel dense small elevation="0" v-for="(group, sector) in groupedData" :key="sector">
                  <v-expansion-panel-header dense small
                    :style="{ 'border-left': activePanel === sector ? '6px solid black' : 'transparent' }"
                    class="pa-0 ma-0" expand-icon="" :class="{ 'active-header': activePanel === sector }"
                    style="text-transform: capitalize;" elevation="0"
                    @click="activePanel = (activePanel === sector ? -1 : sector)">
                    <div class="d-flex">
                      <p class="mb-0 body-1 font-weight-bold ml-3">{{ sector }} <v-icon>{{ activePanel === sector ?
                          'mdi-menu-up' : 'mdi-menu-down' }}</v-icon> </p>
                      <span class="body-1 ml-auto font-weight-bold  mr-4 mt-2 "
                        style="color:#666666;text-transform: capitalize;"> {{ group.totalWeights.toFixed(0) }} %</span>

                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="">
                    <div v-for="(item, index) in group.items" :key="index">
                      <div class="d-flex">
                        <span class="body-1 ml-4 mr-4 mt-2 mb-2" style="color:#666666;text-transform: capitalize;">{{
                          item.SYMBOL }}</span>
                        <span class="body-1 ml-auto ml-4 mr-4 mt-2 mb-2"
                          style="color:#666666;text-transform: capitalize;">{{ item.weights }}</span>
                      </div>
                      <v-divider class="mt-2 mb-2"></v-divider>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels> -->

              <!-- <v-expansion-panels style="border: 1px solid #dddddd" outlined dense small
                class="mt-3 pt-0 pa-0 ma-0 expan" elevation="0">
                <v-expansion-panel dense small elevation="0" v-for="(group, sector) in sortedGroupedData" :key="sector">
                  <v-expansion-panel-header dense small
                    :style="{ 'border-left': activePanel === sector ? '6px solid black' : 'transparent' }"
                    class="pa-0 ma-0" expand-icon="" :class="{ 'active-header': activePanel === sector }"
                    style="text-transform: capitalize;" elevation="0"
                    @click="activePanel = (activePanel === sector ? -1 : sector)">
                    <div class="d-flex">
                      <p class="mb-0 body-1 font-weight-bold ml-3">
                        {{ sector }}
                        <v-icon>
                          {{ activePanel === sector ? 'mdi-menu-up' : 'mdi-menu-down' }}
                        </v-icon>
                      </p>
                      <span class="body-1 ml-auto font-weight-bold mr-4 mt-2"
                        style="color: #666666; text-transform: capitalize;">{{ group.totalWeights.toFixed(1) }} %</span>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="">
                    <div v-for="(item, index) in group.items" :key="index">
                      <div class="d-flex">
                        <span class="body-1 ml-4 mr-4 mt-2" style="color: #666666; text-transform: capitalize;">{{
                          item.company_name }}</span>
                        <span class="body-1 ml-auto ml-4 mr-4 mt-2"
                          style="color: #666666; text-transform: capitalize;">{{ item.weights }} %</span>
                      </div>
                      <v-divider class="mt-2 mb-2"></v-divider>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels> -->

              <v-expansion-panels dense small class="mt-3 pt-0 pa-0 ma-0 expan" elevation="0" multiple v-model="panel">
                <v-expansion-panel dense small elevation="0" v-for="(group, sector) in visibleGroups" :key="sector">
                  <v-expansion-panel-header dense small :style="{
                    'border-left': activePanel === sector ? '6px solid black' : 'transparent',
                  }" class="pa-0 ma-0" expand-icon="" :class="{ 'active-header': activePanel === sector }"
                    style="text-transform: capitalize;" elevation="0"
                    @click="activePanel = activePanel === sector ? -1 : sector">
                    <div class="d-flex">
                      <p class="mb-0 body-2 font-weight-bold ml-3">
                        {{ sector }}
                        <v-icon>{{ activePanel === sector ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
                      </p>
                      <span class="body-2 ml-auto font-weight-bold mr-4 mt-2"
                        style="color: #666666; text-transform: capitalize;">
                        <!-- {{ group.totalWeights }} % -->
                        {{ typeof group.totalWeights === 'number' ? group.totalWeights.toFixed(0) : group.totalWeights
                        }}%
                      </span>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div v-for="(item, index) in group.items" :key="index">
                      <div class="d-flex">
                        <span class="body-2 ml-4 mr-4 mt-2" style="color: #666666; text-transform: capitalize;">{{
                          item.company_name }}</span>
                        <span class="body-2 ml-auto ml-4 mr-4 mt-2"
                          style="color: #666666; text-transform: capitalize;">{{ item.weights }} %</span>
                      </div>
                      <v-divider class="mt-2 mb-2"></v-divider>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <!-- Show More/Less Button -->
              <div v-if="Object.keys(sortedGroupedData).length > 5">
                <v-btn text small @click="toggleShowMoreGroups" style="color:#0037B7"
                  class="font-weight-bold body-2 text-none">
                  {{ showMoreGroups ? 'Show Less' : 'Show More' }}
                </v-btn>
              </div>


            </v-col>
            <v-col cols="12" lg="5" sm="12" md="12">
              <p class="mb-0 body-1 text-center font-weight-medium" style="color:#666">Weightage allocation by Sector
              </p>

              <v-card height="270px" id="sector-chart" class="rounded-lg  elevation-0">
              </v-card>

              <!-- <div id="sector-chart"></div> -->

            </v-col>

          </v-row>

        </v-card>

        <v-card outlined elevation="0" class="seccadrsize ss-cards px-4 py-3" rounded-lg
          style="border: 1px solid #dddddd">
          <p class="title font-weight-bold mt-2 mb-2">Asset allocation and Holdings</p>
          <v-row>

            <v-col cols="12" lg="4" sm="12" md="6">
              <!-- <p class="mb-0 body-2 font-weight-bold">Fund’s equity sector distribution</p>
            <p class="mb-0 body-2 mt-2 font-weight-regular" style="color:#666">Each fund is uniquely allocated to suit and match customer expectations based on the risk profile and return expectations.</p> -->


              <p class="mb-0 body-1 d-none d-lg-block d-xl-block font-weight-medium" style="color:#666">Fund asset
                allocation</p>
              <p class="mb-0 body-1 d-block d-lg-none text-center  font-weight-medium" style="color:#666">Fund asset
                allocation</p>


              <!-- <div id="sector-chart1"></div> -->
              <v-card height="270px" id="sector-chart1" class="rounded-lg  elevation-0">
              </v-card>

            </v-col>



            <v-col cols="12" lg="4" sm="12" md="6">
              <!-- <p class="mb-0 body-2 font-weight-bold">Fund’s equity sector distribution</p>
              <p class="mb-0 body-2 mt-2 font-weight-regular" style="color:#666">Each fund is uniquely allocated to suit and match customer expectations based on the risk profile and return expectations.</p> -->


              <p class="mb-0 body-1  font-weight-medium" style="color:#666">Equity allocation by Sector</p>

              <div v-for="(group, sector) in limitedSortedGroupedData" :key="sector">
                <div class="d-flex mt-4">
                  <p class="mb-0" style="
            color: #666;
            font-size: 13px;
            font-weight: 469;
            line-height: 18px;
          ">
                    {{ sector }}
                  </p>
                  <p class="mb-0 ml-auto" style="
            color: #000;
            font-size: 13px;
            font-weight: 559;
            line-height: 18px;
          ">
                    <!-- {{ group.totalWeights }}% -->
                    {{ typeof group.totalWeights === 'number' ? group.totalWeights.toFixed(0) : group.totalWeights }}%
                  </p>
                </div>
                <v-progress-linear :value="group.totalWeights" class="mt-2" height="4" color="#148564"
                  style="border-radius: 4px"></v-progress-linear>
              </div>


            </v-col>

            <v-col cols="12" lg="4" sm="12" md="6">
              <!-- <p class="mb-0 body-2 font-weight-bold">Fund’s top stock holdings</p>
              <p class="mb-0 body-2 mt-2 font-weight-regular" style="color:#666">Each fund is uniquely allocated to suit and match customer expectations based on the risk profile and return expectations.</p> -->


              <p class="mb-0 body-1  font-weight-medium" style="color:#666">Top Stock Holdings</p>
              <!-- {{sortedTopFive}} -->
              <div v-for="(group, sector) in sortedTopFivenew" :key="sector">
                <div class="d-flex mt-4">
                  <p class="mb-0" style="
            color: #666;
            font-size: 13px;
            font-weight: 469;
            line-height: 18px;
          ">
                    {{ group.company_name }}
                  </p>
                  <p class="mb-0 ml-auto" style="
            color: #000;
            font-size: 13px;
            font-weight: 559;
            line-height: 18px;
          ">
                    {{ group.weights }}%
                  </p>
                </div>
                <v-progress-linear :value="group.weights" class="mt-2" height="4" color="#148564"
                  style="border-radius: 4px"></v-progress-linear>
              </div>


            </v-col>
          </v-row>
        </v-card>

        <v-card outlined elevation="0" class="seccadrsize aboutmobil ss-cards px-4 py-3" rounded-lg
          style="border: 1px solid #dddddd">
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

          <v-row>
            <v-col cols="12" lg="6" sm="12" md="6">
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
            <v-col cols="12" lg="6" sm="12" md="6">
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
      <v-col cols="12" lg="3" md="12" sm="12">
        <div class="mr-14 mt-2 rounded-lg pa-3 pb-5" style="position: fixed; border: 1px solid #dddddd;">
          <div class="text-center">


            <div class="mt-3">
              <svg width="45vh" height="25vh" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M57.5 41.25H2.5C1.80969 41.25 1.25 40.6903 1.25 40V5C1.25 4.30969 1.80969 3.75 2.5 3.75H57.5C58.1903 3.75 58.75 4.30969 58.75 5V40C58.75 40.6903 58.1903 41.25 57.5 41.25Z"
                  fill="#4DA34D" />
                <path
                  d="M47.5 7.5H12.5C12.5 11.6421 9.14215 15 5 15V30C9.14215 30 12.5 33.3578 12.5 37.5H47.5C47.5 33.3578 50.8578 30 55 30V15C50.8578 15 47.5 11.6421 47.5 7.5Z"
                  fill="#9EDB9E" />
                <path
                  d="M30 31.25C34.8325 31.25 38.75 27.3325 38.75 22.5C38.75 17.6675 34.8325 13.75 30 13.75C25.1675 13.75 21.25 17.6675 21.25 22.5C21.25 27.3325 25.1675 31.25 30 31.25Z"
                  fill="#4DA34D" />
                <path opacity="0.1"
                  d="M31.25 41.25H53.75V38.75C53.75 38.3033 53.637 37.8883 53.4418 37.5C53.637 37.1117 53.75 36.6967 53.75 36.25V32.5C53.75 32.0533 53.637 31.6383 53.4418 31.25C53.637 30.8617 53.75 30.4467 53.75 30V26.25C53.75 25.8033 53.637 25.3883 53.4418 25C53.637 24.6117 53.75 24.1967 53.75 23.75V20C53.75 19.5533 53.637 19.1383 53.4418 18.75C53.637 18.3617 53.75 17.9467 53.75 17.5V13.75C53.75 10.4675 48.0908 8.75 42.5 8.75C36.9092 8.75 31.25 10.4675 31.25 13.75V17.5C31.25 17.9467 31.363 18.3617 31.5581 18.75C31.363 19.1383 31.25 19.5533 31.25 20V23.75C31.25 24.1967 31.363 24.6117 31.5581 25C31.363 25.3883 31.25 25.8033 31.25 26.25V30C31.25 30.4467 31.363 30.8617 31.5581 31.25C31.363 31.6383 31.25 32.0533 31.25 32.5V36.25C31.25 36.6967 31.363 37.1117 31.5581 37.5C31.363 37.8883 31.25 38.3033 31.25 38.75V41.25Z"
                  fill="black" />
                <path
                  d="M55 46.25H35C34.3097 46.25 33.75 46.8097 33.75 47.5V51.25C33.75 54.5325 39.4092 56.25 45 56.25C50.5908 56.25 56.25 54.5325 56.25 51.25V47.5C56.25 46.8097 55.6903 46.25 55 46.25Z"
                  fill="#D8BC48" />
                <path
                  d="M45 42.5C39.4092 42.5 33.75 44.2175 33.75 47.5C33.75 50.7825 39.4092 52.5 45 52.5C50.5908 52.5 56.25 50.7825 56.25 47.5C56.25 44.2175 50.5908 42.5 45 42.5Z"
                  fill="#EFD358" />
                <path
                  d="M55 40H35C34.3097 40 33.75 40.5597 33.75 41.25V45C33.75 48.2825 39.4092 50 45 50C50.5908 50 56.25 48.2825 56.25 45V41.25C56.25 40.5597 55.6903 40 55 40Z"
                  fill="#D8BC48" />
                <path
                  d="M45 36.25C39.4092 36.25 33.75 37.9675 33.75 41.25C33.75 44.5325 39.4092 46.25 45 46.25C50.5908 46.25 56.25 44.5325 56.25 41.25C56.25 37.9675 50.5908 36.25 45 36.25Z"
                  fill="#EFD358" />
                <path
                  d="M55 33.75H35C34.3097 33.75 33.75 34.3097 33.75 35V38.75C33.75 42.0325 39.4092 43.75 45 43.75C50.5908 43.75 56.25 42.0325 56.25 38.75V35C56.25 34.3097 55.6903 33.75 55 33.75Z"
                  fill="#D8BC48" />
                <path
                  d="M45 30C39.4092 30 33.75 31.7175 33.75 35C33.75 38.2825 39.4092 40 45 40C50.5908 40 56.25 38.2825 56.25 35C56.25 31.7175 50.5908 30 45 30Z"
                  fill="#EFD358" />
                <path
                  d="M55 27.5H35C34.3097 27.5 33.75 28.0597 33.75 28.75V32.5C33.75 35.7825 39.4092 37.5 45 37.5C50.5908 37.5 56.25 35.7825 56.25 32.5V28.75C56.25 28.0597 55.6903 27.5 55 27.5Z"
                  fill="#D8BC48" />
                <path
                  d="M45 23.75C39.4092 23.75 33.75 25.4675 33.75 28.75C33.75 32.0325 39.4092 33.75 45 33.75C50.5908 33.75 56.25 32.0325 56.25 28.75C56.25 25.4675 50.5908 23.75 45 23.75Z"
                  fill="#EFD358" />
                <path
                  d="M55 21.25H35C34.3097 21.25 33.75 21.8097 33.75 22.5V26.25C33.75 29.5325 39.4092 31.25 45 31.25C50.5908 31.25 56.25 29.5325 56.25 26.25V22.5C56.25 21.8097 55.6903 21.25 55 21.25Z"
                  fill="#D8BC48" />
                <path
                  d="M45 17.5C39.4092 17.5 33.75 19.2175 33.75 22.5C33.75 25.7825 39.4092 27.5 45 27.5C50.5908 27.5 56.25 25.7825 56.25 22.5C56.25 19.2175 50.5908 17.5 45 17.5Z"
                  fill="#EFD358" />
                <path
                  d="M55 15H35C34.3097 15 33.75 15.5597 33.75 16.25V20C33.75 23.2825 39.4092 25 45 25C50.5908 25 56.25 23.2825 56.25 20V16.25C56.25 15.5597 55.6903 15 55 15Z"
                  fill="#D8BC48" />
                <path
                  d="M45 11.25C39.4092 11.25 33.75 12.9675 33.75 16.25C33.75 19.5325 39.4092 21.25 45 21.25C50.5908 21.25 56.25 19.5325 56.25 16.25C56.25 12.9675 50.5908 11.25 45 11.25Z"
                  fill="#EFD358" />
              </svg>

            </div>
          </div>

          <div>
            <p style="color:#666" v-if="fullsingleres[0] && fullsingleres[0].access == 'free'"
              class="font-weight-medium body-1 mt-3 mb-0 text-center">
              Minimum Investment Amount <br> <span style="color:#43A833" class="font-weight-bold title"> ₹ {{
                fullsingleres[0] && fullsingleres[0].price
                  ? fullsingleres[0].price.toFixed(2)
                  : ''
              }}</span><br>
              <span class="text-center caption">With CAGR of {{ fullsingleres[0] && fullsingleres[0].cagr
                ? fullsingleres[0].cagr.cagr_5year + '%'
                : '' }} in 5 years</span>
            </p>


            <v-btn v-if="
              fullsingleres[0] && fullsingleres[0].access === 'free' && (localsess !== '' || localsess !== null)

            " class="elevation-0 white--text mt-3 text-none float-end" rounded color="black" block
              @click="checkloginstatus(), getLedgerPrice()">  {{fullsingleres[0] && fullsingleres[0].rebalance ? 'Rebalance' : 'Inverst'}}</v-btn>
          </div>

          <!-- {{localsess}} -->

          <!-- <div class="text-center mt-4" v-if="
            fullsingleres[0] && fullsingleres[0].access == 'subscribe'
              ? false
              : localsess === '' || localsess === null
                ? true
                : false
          ">
            <v-btn @click="deploybas()" elevation="0" rounded class="text-none" color="black" dark><span
                style="color: #fff">
                Login </span></v-btn>
          </div> -->

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
          <div class="d-flex">
            <p class="font-weight-semibold">Basket Name : <span class="font-weight-bold">{{ fullsingleres[0] &&
              fullsingleres[0].basket_title ? (fullsingleres[0].basket_title).toUpperCase() : ''
                }}</span>
            </p>
            <v-btn elevation="0" class="ml-auto" @click="enablesip_fun()" color="black" small dense>
              <span v-if="!sipenable" class="white--text">Create SIP</span>
              <span v-if="sipenable" class="white--text">Cancel SIP</span>
            </v-btn>
          </div>
          <!-- <p class="font-weight-semibold">Basket Id : <span class="font-weight-bold">{{ opendiag.id }}</span></p> -->
          <!-- {{fullcovertres}} -->


          <div v-if="fullsingleres[0] && fullsingleres[0].etfs_weights && fullsingleres[0].etfs_weights.equity">
            <v-data-table height="200px" :headers="headersrebalnce" :items="fullsingleres[0].etfs_weights.equity"
              :items-per-page="100" hide-default-footer class="elevation-0 mt-2 mb-3 ma-0 pa-0" outlined fixed-header
              disable-sort dense style="border:1px solid grey">
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

          <v-card outlined elevation="0" class="pa-3" v-if="sipenable">

            <v-row>
              <v-col cols="12" lg="6" sm="12" md="12" class="pb-0">
                <span class="body-2 ">SIP Name <span class="ml-1 red--text">*</span></span>
                <v-text-field v-model="sipname" outlined hide-details class="" dense></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" sm="12" md="12" class="pb-0">
                <span class="body-2 ">Start Date<span class="ml-1 red--text">*</span></span>
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field hide-details outlined dense v-model="date" prepend-inner-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" lg="6" sm="12" md="12" class="pt-0 mt-0">
                <span class="body-2 mt-0 pt-0 ">Frequency <span class="ml-1 red--text">*</span></span>
                <v-select v-model="sipfreq" outlined hide-details class="" dense
                  :items="['Daily', 'Monthly', 'Weekly', 'Fortnightly']"></v-select>
              </v-col>
              <v-col cols="12" lg="6" sm="12" md="12" class="pt-0 mt-0">
                <span class="body-2 mt-0 pt-0 ">No of SIPs <span class="ml-1 red--text">*</span></span>
                <v-text-field v-model="noossip" outlined type="number" hide-spin-buttons hide-details
                  dense></v-text-field>
              </v-col>
            </v-row>
          </v-card>

          <div v-if="sipenable == false">


            <v-alert class="mb-0 mt-2 py-1"
              v-if="ledgerBal >= (fullsingleres[0] && fullsingleres[0].price ? fullsingleres[0].price : '') ? false : true"
              dense outlined type="info" color="red" elevation="0">
              <p style="font-size:14px;" class="text-center mb-0">Insufficient balance, Add fund
                <a :href="`https://fund.mynt.in/?uid=${cleid}&token=${localsess}`"><b>Click here</b></a>
              </p>
            </v-alert>



            <v-btn
              v-if="leadgerBal >= (fullsingleres[0] && fullsingleres[0].price ? fullsingleres[0].price : '') ? true : false"
              color="black" height="48px" :loading="basload" class="text-none white--text" block @click="deploybasket()"
              rounded>Proceed</v-btn>
          </div>

          <div v-if="sipenable">
            <v-btn :disabled="sipname == '' || sipfreq == '' || noossip == ''" color="black" height="48px"
              :loading="sipbtload" class="text-none white--text mt-3" @click="siporderexcute()" block rounded>Proceed To
              SIP </v-btn>
          </div>
          <!-- <v-btn color="black" height="48px" :loading="basload" class="text-none white--text" block
            @click="deploybasket()" rounded>Proceed</v-btn> -->
          <!-- {{typeof leadgerBal}} -->
          <!-- {{leadgerBal}}
{{ (fullsingleres[0] && fullsingleres[0].price ? fullsingleres[0].price : '') }} -->

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

    <v-footer :padless="padless" class="d-block d-lg-none" v-bind="localAttrs" style="bottom: 48px;">
      <v-card width="100%" class="mb-2" outlined style="border: 1px solid #dddddd">
        <v-row>
          <v-col cols="12" class="text-center">
            <p style="color:#666" v-if="fullsingleres[0] && fullsingleres[0].access == 'free'"
              class="font-weight-medium body-1 mt-3 mb-0 ">
              Minimum Investment Amount <br> <span style="color:#43A833" class="font-weight-bold title"> ₹ {{
                fullsingleres[0] && fullsingleres[0].price
                  ? fullsingleres[0].price.toFixed(2)
                  : ''
              }}</span><br>
              <span class=" caption">With CAGR of {{ fullsingleres[0] && fullsingleres[0].cagr
                ? fullsingleres[0].cagr.cagr_5year + '%'
                : '' }} in 5 years</span>
            </p>
            <v-btn v-if="
              fullsingleres[0] && fullsingleres[0].access === 'free' && (localsess !== '' || localsess !== null)

            " class="elevation-0 white--text  pl-5  text-none " block rounded color="black" large
              @click="checkloginstatus(), getLedgerPrice()">  {{fullsingleres[0] && fullsingleres[0].rebalance ? 'Rebalance' : 'Inverst'}}</v-btn>
          </v-col>
          <!-- <v-col cols="12" class="pa-0 " >
          <v-btn v-if="
              fullsingleres[0] && fullsingleres[0].access === 'free' && (localsess !== '' || localsess !== null)
            " class="elevation-0 white--text ml-14 pl-5 mr-3 text-none float-end" rounded color="black" large 
              @click="checkloginstatus(), getLedgerPrice()">Inverst</v-btn>
        </v-col> -->
        </v-row>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import apiurl from "@/apiurl";
import eventBus from "@/eventBus";

import axios from "axios";
import * as echarts from "echarts";

// import { getBestMF } from '@/components/mixins/getAPIdata'

export default {
  data() {
    return {
      inputchange: "",
      weightselected: "Equial-Weighted",
      weightedChange: ["Equial-Weighted", "Custom-Weighted", "Custom-Share"],
      bestmfdata: "",
      fullsingleres: [],
      dumpdata: [],
      stockcountdump: 0,
      urlPrefix: apiurl.collectionurl,
      params: '',
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
      letters: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#FFC107"],
      headersrebalnce: [
        { text: "Symbol", value: "tsym" },
        { text: "Price", value: "price", align: 'right' },
        { text: "Quantity", value: "quantity", align: 'center' },
        // { text: "ISIN", value: "ISIN" },
        { text: "Weight", value: "weights" }],
      ledgerBal: '',
      value: 1,
      equitymapres: [],
      linchadata: [],
      linechatres: [],
      chartIdnew: "mainnew",
      chartInstancenew: null,
      toggle_exclusive: 3,
      chartlineload: false,
      pieschartdata: [],
      // activePanel: -1,
      groupedData: {},
      sipenable: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      sipname: '',
      sipfreq: 'Daily',
      noossip: '',
      sipbtload: false,
      filteredEquities: [],
      newArray: [],
      chartlabel: '',
      errrrordata: '',
      logincheck: '',
      sortedTopFive: [],
      showMoreGroups: false,
      name: 'SingleCollection',
      // equityData: [],
      processedData: [],
      panel: [0, 1],
      sortedTopFivenew: [],
      padless: true,
      variant: 'fixed',
    };
  },
  //     computed: {
  //     etfsWeights() {
  //       return this.fullsingleres.length > 0 ? this.fullsingleres[0].etfs_weights : {};
  //     }
  //   },
  // computed: {
  //   sortedGroupedData() {
  //     return Object.entries(this.groupedData)
  //       .sort(([, groupA], [, groupB]) => groupB.totalWeights - groupA.totalWeights)
  //       .reduce((acc, [sector, group]) => {
  //         acc[sector] = {
  //           ...group,
  //           items: group.items.sort((a, b) => b.weights - a.weights)
  //         };
  //         return acc;
  //       }, {});
  //   },

  // },

  computed: {
    localAttrs() {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },

    sortedGroupedData() {
      return Object.entries(this.groupedData)
        .sort(([, groupA], [, groupB]) => groupB.totalWeights - groupA.totalWeights)
        .reduce((acc, [sector, group]) => {
          acc[sector] = {
            ...group,
            items: group.items.sort((a, b) => b.weights - a.weights)
          };
          return acc;
        }, {});
    },
    limitedSortedGroupedData() {
      if (!this.groupedData) {
        return [];
      }
      const limitedData = Object.entries(this.groupedData)
        .sort(([, groupA], [, groupB]) => groupB.totalWeights - groupA.totalWeights)
        .slice(0, 5)
        .reduce((acc, [sector, group]) => {
          const sortedItems = group.items.slice().sort((a, b) => b.weights - a.weights);
          acc[sector] = {
            ...group,
            items: sortedItems
          };
          return acc;
        }, {});

      return limitedData;
    },
    visibleGroups() {
      const sortedEntries = Object.entries(this.sortedGroupedData);
      const limitedEntries = this.showMoreGroups ? sortedEntries : sortedEntries.slice(0, 5);

      return limitedEntries.reduce((acc, [sector, group]) => {
        acc[sector] = group;
        return acc;
      }, {});
    },
    itemName() {
      return this.$route.params.name;
    }

  },

  methods: {
    toggleShowMoreGroups() {
      this.showMoreGroups = !this.showMoreGroups;
    },
    decrement() {
      if (this.value > 1) {
        this.value--;
        this.weightCalculation()
      }
    },
    increment() {
      if (this.value < 100) {
        this.value++;
        this.weightCalculation()

      }
    },
    enablesip_fun() {
      this.sipenable = !this.sipenable;
      if (this.sipenable == false) {
        this.sipname = ''
        this.sipfreq = ''
        this.noossip = ''
      }
    },
    validateValue() {
      if (this.value < 1) {
        this.value = 1;
      } else if (this.value > 100) {
        this.value = ''
        this.value = 100;
      }
    },
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
          const minPrice = parseFloat(response.data.minprice);
  if (!isNaN(minPrice)) {
    this.fullsingleres[0].price = minPrice;
  } else {
    this.fullsingleres[0].price = 0.0; 
  }
          // axiosThis.fullsingleres[0].price = response.data.minprice.toFixed(2);
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

      if (this.fullsingleres[0].rebalance) {
        data = JSON.stringify({
          basketid: this.fullsingleres[0].id,
          etfs_weights: this.fullsingleres[0].etfs_weights,
          session: localStorage.getItem("sess"),
          rebalance_status: "yes",
          deleted_etf: this.fullsingleres[0].deleted_etf
        })
      } else {
        data = JSON.stringify({
          basketid: this.fullsingleres[0].id,
          etfs_weights: this.fullsingleres[0].etfs_weights,
          session: localStorage.getItem("sess"),
          rebalance_status: '',
          order_count: this.value,

        });
      }

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
      this.sortedTopFive = []
      this.singleload = true;
      this.fullsingleres = [];
      this.equitymapres = []
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
            axiosThis.ltpminpricedump = axiosThis.fullsingleres[0].price.toFixed(2);
            axiosThis.stockcountdump = axiosThis.fullsingleres[0].stockcount;
            axiosThis.basketprice = axiosThis.fullsingleres[0].basketprice;
            axiosThis.sipname = axiosThis.fullsingleres[0].basket_title
            axiosThis.getModifiedImageUrl();
            axiosThis.getModifiedImageUrl11();
            axiosThis.dumpdata = JSON.parse(JSON.stringify(axiosThis.fullsingleres[0].etfs_weights));
            axiosThis.processEquityData();
            // console.log('axiosThis.dumpdata.equity',axiosThis.dumpdata.equity);


            axiosThis.sortedTopFive = axiosThis.dumpdata.equity
              .sort((a, b) => b.avg_weight_percent - a.avg_weight_percent)
              .slice(0, 5);

            axiosThis.equitymapres = axiosThis.dumpdata.equity.map(
              (element) => {
                return `${element.exch}:${element.tsym}`;

              }
            );
            if (axiosThis.equitymapres) {
              axiosThis.linechartdata()
              axiosThis.barchartfun()

            }
            // console.log('axiosThis.equitymapres', axiosThis.equitymapres);

            if (axiosThis.fullsingleres[0] && axiosThis.fullsingleres[0].etfs_weights) {
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
    processEquityData() {
      const result = this.dumpdata.equity.reduce((acc, item) => {
        if (!acc[item.baskeqdeat]) {
          acc[item.baskeqdeat] = {
            avg_weight_percent: 0,
            baskeqdeat: item.baskeqdeat,
            merge: ''
          };
        }
        acc[item.baskeqdeat].avg_weight_percent += parseFloat(parseFloat(item.avg_weight_percent).toFixed(2));
        acc[item.baskeqdeat].merge = `${item.baskeqdeat} ${acc[item.baskeqdeat].avg_weight_percent}%`;
        return acc;
      }, {});
      this.processedData = Object.values(result);
   

      this.renderChart1();

      // const allEquity = this.dumpdata.equity.every(item => item.baskeqdeat === 'Equity');

// if (allEquity) {
//   console.log('all are equity data');
    
// } else {
//     console.log('Not all items are of type Equity');
// }

     
    },

    linechartdata() {
      this.chartlineload = true
      this.linchadata = []
      this.linechatres = []
      this.linechadate = []
      this.linchadata1 = []
      this.linechatres1 = []
      this.linechadate1 = []
      this.chartlabel = ''
      const axios = require('axios');
      let data = JSON.stringify({
        scripts: this.equitymapres,
        timeFrame: this.toggle_exclusive == 0 ? '1M' : this.toggle_exclusive + 'Y'
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://v3.mynt.in/equity/basketReturnsChartData',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      var axiosThis = this
      axios.request(config)
        .then((response) => {
          axiosThis.chartlineload = false
          axiosThis.chartlabel = response.data.benchmarkIndex
          axiosThis.errrrordata = response.data.error
          // console.log(JSON.stringify(response.data));
          axiosThis.linchadata = response.data.basketChart
          axiosThis.linchadata1 = response.data.benchmarkChart

          axiosThis.linechatres = axiosThis.linchadata.map(
            (element) => {
              return (element.returns)

            }
          );
          axiosThis.linechadate = axiosThis.linchadata.map(
            (element) => {
              return (element.date);

            }
          );

          // ----------------------------------------------------------------------
          axiosThis.linchadata1 = response.data.benchmarkChart
          axiosThis.linechatres1 = axiosThis.linchadata1.map(
            (element) => {
              return (element.returns)

            }
          );
          // axiosThis.linechadate1 = axiosThis.benchmarkChart.map(
          //   (element) => {
          //     return (element.date);

          //   }
          // );


          axiosThis.chartfun1(
            axiosThis.linechatres,
            axiosThis.linechadate,
            axiosThis.linechatres1,
            // axiosThis.linechadate1,
          );
        })
        .catch((error) => {
          console.log(error);
          axiosThis.chartlineload = false

        });

    },

    barchartfun() {
      this.pieschartdata = []
      const axios = require('axios');
      let data = JSON.stringify({
        scripts: this.equitymapres,
        timeFrame: this.toggle_exclusive == 0 ? '1M' : this.toggle_exclusive + 'Y'
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://v3.mynt.in/equity/basketStocksData',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      var axiosThis = this

      axios.request(config)
        .then((response) => {
          axiosThis.pieschartdata = response.data;
          // axiosThis.errormesspie = 
          const merged = axiosThis.pieschartdata.map(item => {
            const equityItem = axiosThis.dumpdata.equity.find(e => `${e.exch}:${e.tsym}` === item.SYMBOL);
            return equityItem ? { ...item, weights: equityItem.avg_weight_percent } : item;
          });
          axiosThis.merged = merged;
          // console.log('axiosThis.merged', axiosThis.merged);
          const groupedData = merged.reduce((acc, item) => {
            if (!acc[item.sector]) {
              acc[item.sector] = {
                items: [],
                totalWeights: 0
              };
            }
            acc[item.sector].items.push(item);
            acc[item.sector].totalWeights += parseFloat(item.weights) || 0;
            return acc;
          }, {});
          axiosThis.groupedData = groupedData;
          console.log('axiosThis.groupedData',axiosThis.groupedData);
          axiosThis.prepareChartData();
          axiosThis.renderChart();
          axiosThis.Assetallocationfun()
          // axiosThis.holdingallocation()
          // console.log('mergedmergedmerged', merged);
          // console.log('groupedData', groupedData);
        })
        .catch((error) => {
          console.log(error);
        });

    },
    // holdingallocation(){
    //   const mergedhold = this.pieschartdata.map(item => {
    //         const equityItem = this.dumpdata.equity.find(e => `${e.exch}:${e.tsym}` === item.SYMBOL);
    //         return equityItem ? { ...item, weights: equityItem.avg_weight_percent } : item;
    //       });
    //       this.mergedhold = mergedhold;
    //       const groupedDatahold = mergedhold.reduce((acc, item) => {
    //         if (!acc[item.sector]) {
    //           acc[item.sector] = {
    //             items: [],
    //             totalWeights: 0
    //           };
    //         }
    //         acc[item.sector].items.push(item);
    //         acc[item.sector].totalWeights += parseFloat(item.weights) || 0;
    //         return acc;
    //       }, {});
    //       this.groupedDatahold = groupedDatahold;
    // },


    prepareChartData() {
      const chartData = Object.keys(this.groupedData).map(sector => ({
        name: sector,
        value: parseFloat(this.groupedData[sector].totalWeights)
      }));
      this.chartData = chartData;
    },

    renderChart() {
      const chart = echarts.init(document.getElementById('sector-chart'));
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {d}%',

        },
        legend: {
          orient: 'horizontal',
          bottom: 'left',
          top: '90%',
          type: 'scroll',
          // orient: 'vertical',
          textStyle: {
            fontSize: 12,
            color: '#000'
          },
          itemWidth: 9,
          itemHeight: 9
        },
        title: {
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            labelLine: {
              show: false,
              fontSize: 0,
              fontWeight: 'bold'
            },
            label: {
              show: false
            },
            data: this.chartData,
            radius: ['40%', '70%']
          },
        ]
      };
      chart.setOption(option);
    },

    renderChart1() {

      const chart = echarts.init(document.getElementById('sector-chart1'));
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },
        legend: {
          orient: 'horizontal',
          bottom: 'left',
          type: 'scroll',
          textStyle: {
            fontSize: 12,
            color: '#000',
          },
          itemWidth: 9,
          itemHeight: 9,
          data: this.processedData.map(item => item.merge),
          // formatter: '({b}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'outside',
              formatter: '({b})'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '16',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: true, // Show label lines
            },
            data: this.processedData.map(item => ({
              value: item.avg_weight_percent,
              name: item.merge,
            })),
          }
        ],
      };
      chart.setOption(option);
    },


    chartfun1(onee, twoo, three) {
      const minval = [Math.min(...onee), Math.min(...three)];
      const minvalo = Math.min(...minval);

      this.chartInstancenew = echarts.init(document.getElementById("mainnew"));

      var option = {
        title: {
          text: "",
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: [this.fullsingleres[0].basket_title, this.chartlabel],
          // bottom: 'left',

        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: twoo,
          },
        ],
        yAxis: [
          {
            type: "value",
            min: minvalo,
          },
        ],
        series: [
          {
            name: this.fullsingleres[0].basket_title,
            type: "line",
            areaStyle: { color: "transparent" },
            smooth: false,
            showSymbol: false,
            label: {
              position: "top",
            },
            emphasis: {
              focus: "series",
            },
            data: onee,
          },
          {
            name: this.chartlabel,
            type: "line",
            areaStyle: { color: "transparent" },
            smooth: false,
            showSymbol: false,
            label: {
              position: "top",
            },
            emphasis: {
              focus: "series",
            },
            data: three,
          },
        ],
      };
      this.chartInstancenew.setOption(option);
    },



    Assetallocationfun() {

      this.sortedTopFivenew = []

      this.sortedTopFivenew = this.merged
        .sort((a, b) => b.weights - a.weights)
        .slice(0, 5);

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
      this.weightselected = this.weightedChange[0];
      this.value = 1
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
      this.fullsingleres[0].price = minprice.toFixed(2) * this.value;
    },
    quantityChange(token, value) {
      if (!value) {
        value = 1.0
      }
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          if (this.fullsingleres[0].etfs_weights[key][i].token == token) {
            if (value == 1) {
              this.fullsingleres[0].etfs_weights[key][i].quantity = 1.0;
              this.snackcolor = "red";
              this.snackbar = true;
              this.mesg = "Invaild input value";
            } else {
              this.fullsingleres[0].etfs_weights[key][i].quantity =
                value.toFixed(0);
            }
          }
        })
      );

      let minprice = 0;
      Object.keys(this.fullsingleres[0].etfs_weights).forEach((key) =>
        this.fullsingleres[0].etfs_weights[key].forEach((key2, i) => {
          this.fullsingleres[0].etfs_weights[key][i].total_value =
            key2.price * this.fullsingleres[0].etfs_weights[key][i].quantity;
          minprice += this.fullsingleres[0].etfs_weights[key][i].total_value
        }))

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
          // axiosThis.leadgerBal = res.total
          axiosThis.leadgerBal = Number(res.total)
          console.log(typeof axiosThis.leadgerBal);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    siporderexcute() {

      // this.filteredEquities = []
      // for (let i = 0; i < this.fullsingleres.length; i++) {
      //   const equityData = this.fullsingleres[0].etfs_weights.equity;
      //   const filteredData = {
      //     exch: equityData.exch,
      //     tsym: equityData.tsym,
      //     prd:'C',
      //     token:equityData.token,
      //     qty: equityData.quantity,
      //   };
      //   this.filteredEquities.push(filteredData);
      // }

      let originalArray = this.fullsingleres[0].etfs_weights.equity;
      this.newArray = [];

      for (let i = 0; i < originalArray.length; i++) {
        let item = originalArray[i];
        this.newArray.push({
          'exch': item.exch,
          'prd': 'C',
          'qty': item.quantity,
          'token': item.token,
          'tsym': item.tsym
        });
      }

      // console.log('this.filteredData',this.newArray)
      this.sipbtload = true
      const axios = require('axios');
      let data = JSON.stringify({
        "siptype": "new",
        session: localStorage.getItem("sess"),
        etfs_weights: this.newArray,
        startdate: this.date.slice(8, 10) + this.date.slice(5, 7) + this.date.slice(0, 4),
        end_period: this.noossip,
        sip_name: this.sipname,
        frequency: this.sipfreq
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.5.179:5111/siporder',
        headers: {
          Authorization: this.localsess,
          clientid: localStorage.getItem("userid"),
          'Content-Type': 'application/json'
        },
        data: data
      };
      var axiosThis = this
      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          axiosThis.sipbtload = false
          if (response.data.msg == "success") {
            axiosThis.confirmation = false;
            axiosThis.mesg = 'The order will be placed in a SIP';
            axiosThis.snackcolor = "success";
            axiosThis.snackbar = true;
          } else if (response.data.msg.emsg == 'Session Expired :  Invalid Session Key') {
            axiosThis.mesg = 'Session Expired :  Invalid Session Key';
            axiosThis.snackcolor = "orange";
            axiosThis.snackbar = true;
            setTimeout(() => {
              eventBus.$emit("login-event");

            }, 2000);
          }
          else {
            axiosThis.confirmation = false;
            axiosThis.snackbar = true;
            axiosThis.mesg = response.data.msg;
            axiosThis.snackcolor = "error";
          }
          axiosThis.sipname = ''
          axiosThis.sipfreq = ''
          axiosThis.noossip = ''

        })
        .catch((error) => {
          console.log(error);
          axiosThis.sipbtload = false
          axiosThis.confirmation = false;
          axiosThis.sipname = ''
          axiosThis.sipfreq = ''
          axiosThis.noossip = ''
          axiosThis.mesg = "Network Error";
          axiosThis.snackcolor = "error";
          axiosThis.snackbar = true;

        });

    }

  },
  watch: {
    searchaa(val) {
      val && val !== this.orderscitt && this.searchscrpt(val);
    },
  },
  mounted() {
    this.singleload = true;
    this.params = localStorage.getItem("id");
    this.logincheck = localStorage.getItem("sess")

    if (this.params) {
      console.log(' this.params ', this.params);

      this.bestmfdata = this.params;
      this.params = parseInt(localStorage.getItem("id"));
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

.v-expansion-panels {
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  width: 100%;
  z-index: 0;
}
</style>
<style>
#sector-chart {
  /* height: calc(100vh - 300px); */
  height: 50vh
}

#sector-chart1 {
  /* height: calc(100vh - 200px); */
  height: 50vh
}

.ss-cards {
  border: 1px solid #ddd !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  margin-top: 30px !important
}

@media only screen and (max-width:959px) {


  .ss-cards {
    border: none !important;
    border-radius: 0px !important;
    box-shadow: none !important;
  }


}


@media only screen and (max-width:600px) {
  .aboutmobil {
    margin-bottom: 170px !important
  }

  .seccadrsize {
    margin-top: 0px !important;
    padding: 0px;

  }
}


.v-btn--icon.v-size--default {
  height: 0px;
  width: 0px;
}
</style>
