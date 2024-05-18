<template>
  <div>
    <v-app-bar
      width="100%"
      permanent
      class="px-sm-2 elevation-0"
      color="#FFFFFF"
      fixed
      app
      style="border-bottom: 1px solid #bebebe; background-color: white"
    >
      <img src="@/assets/logo.svg" width="80px" alt="zebulogo" class="mr-8" />
      <v-spacer></v-spacer>
      <v-menu
        v-if="userdata && userdata.CLIENT_NAME"
        close-on-click
        offset-y
        class="table-menu"
      >
        <!--  -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            fab
            color="#f5f5f5"
            small
            class="mx-1 elevation-0"
          >
            <span class="title font-weight-bold">
              {{
                userdata.CLIENT_NAME ? userdata.CLIENT_NAME.slice(0, 1) : "-"
              }}
            </span>
          </v-btn>
        </template>
        <v-card class="table-menu-list">
          <v-list>
            <v-list-item class="mb-2">
              <v-list-item-avatar color="#f5f5f5">
                <span class="title font-weight-bold">
                  {{
                    userdata.CLIENT_NAME
                      ? userdata.CLIENT_NAME.slice(0, 1)
                      : "-"
                  }}
                </span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="fs-14 font-weight-bold mb-1">{{
                  userdata.CLIENT_NAME ? userdata.CLIENT_NAME : "-"
                }}</v-list-item-title>
                <v-list-item-subtitle class="caption txt-666"
                  >User ID
                  {{
                    userdata.CLIENT_ID ? userdata.CLIENT_ID : ""
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list-item @click="logOut()">
            <v-list-item-icon class="mr-3 text-center">
              <img
                :src="require(`@/assets/usermenu/8.svg`)"
                alt="usermenu"
                width="22px"
                class="pl-1"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="txt-454 font-weight-medium fs-14"
                >Logout</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-menu>
      <v-tooltip bottom color="black" v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="goLogin()"
            v-bind="attrs"
            v-on="on"
            fab
            small
            color="#f5f5f5"
            class="mx-1 elevation-0"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 7.5C19 9.70914 17.2091 11.5 15 11.5V13.5C18.3137 13.5 21 10.8137 21 7.5H19ZM15 11.5C12.7909 11.5 11 9.70914 11 7.5H9C9 10.8137 11.6863 13.5 15 13.5V11.5ZM11 7.5C11 5.29086 12.7909 3.5 15 3.5V1.5C11.6863 1.5 9 4.18629 9 7.5H11ZM15 3.5C17.2091 3.5 19 5.29086 19 7.5H21C21 4.18629 18.3137 1.5 15 1.5V3.5ZM11.25 17.25H18.75V15.25H11.25V17.25ZM18.75 25.25H11.25V27.25H18.75V25.25ZM11.25 25.25C9.04086 25.25 7.25 23.4591 7.25 21.25H5.25C5.25 24.5637 7.93629 27.25 11.25 27.25V25.25ZM22.75 21.25C22.75 23.4591 20.9591 25.25 18.75 25.25V27.25C22.0637 27.25 24.75 24.5637 24.75 21.25H22.75ZM18.75 17.25C20.9591 17.25 22.75 19.0409 22.75 21.25H24.75C24.75 17.9363 22.0637 15.25 18.75 15.25V17.25ZM11.25 15.25C7.93629 15.25 5.25 17.9363 5.25 21.25H7.25C7.25 19.0409 9.04086 17.25 11.25 17.25V15.25Z"
                fill="#0037B7"
              ></path>
            </svg>
          </v-btn>
        </template>
        <span>Login in with ZEBU</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import axios from "axios";
import CryptoJS from "crypto-js";
export default {
  data: () => ({
    uid: "",
    token: "",
    userdata: [],
  }),
  methods: {
    logOut() {
      let data = JSON.stringify({
        clientid: this.actid,
        token: this.susertoken,
      });

      let config = {
        method: "post",
        url: "https://rekycbe.mynt.in/autho/logout",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data) {
            localStorage.clear();
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goLogin() {
      window.location.assign(
        `https://desk.mynt.in/mynt/?url=${window.location.href}`
      );
    },
    redirectpages() {
      this.actid = localStorage.getItem("userid");
      this.susertoken = localStorage.getItem("usession");
      var dall = JSON.stringify({
        client_id: this.actid,
      });
      let date1 = this.encryptionFunction(dall);
      let data = JSON.stringify({
        string: date1,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://rekycbe.mynt.in/profile",
        headers: {
          clientid: this.actid,
          Authorization: this.susertoken,
          "Content-Type": "application/json",
        },
        data: data,
      };
      let axiosthis = this;
      axios
        .request(config)
        .then((response) => {
          let conval = this.decryptionFunction(response.data.str);
          let con1 = JSON.parse(conval).client_data;
          if (con1 && con1.CLIENT_ID) {
            // res.CLIENT_ID = '10099';
            axiosthis.userdata = con1;
          } else {
            axiosthis.userdata = [];
          }
          axiosthis.load = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    encryptionFunction(payld) {
      const payload = payld;
      var derived_key = CryptoJS.enc.Base64.parse(btoa("N#j2L^8pq9Fb$d@1")); //YXNkZmdoamtsenhjdmJubQ==
      var iv = CryptoJS.enc.Utf8.parse("3790514682037125");
      var test = CryptoJS.AES.encrypt(payload, derived_key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
      }).toString();
      return test;
    },
    decryptionFunction(payld) {
      const payload = payld;
      const derived_key = CryptoJS.enc.Base64.parse(btoa("N#j2L^8pq9Fb$d@1")); //YXNkZmdoamtsenhjdmJubQ==
      const iv = CryptoJS.enc.Utf8.parse("3790514682037125");
      const encryptedData = payload;

      // Decrypt the data using AES
      const decrypted = CryptoJS.AES.decrypt(encryptedData, derived_key, {
        iv,
        mode: CryptoJS.mode.CBC,
      });
      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

      // // console.log('Decrypted Data:', decryptedData);
      return decryptedData;
    },
  },
  mounted(){
    eventBus.$on('login-event',()=>{
      this.goLogin()
    })
  },
  created() {
    var url = new URL(window.location.href);
    var sacc = url.searchParams.get("sAccountId");
    var ucode = url.searchParams.get("ucode");
    var stok = url.searchParams.get("sToken");
    // var apphide = url.searchParams.get("scr");
    // if (apphide == "app") {
    //   localStorage.setItem("apphide", true);

    //   this.appbarhide = true;
    //   // console.log("appappapp")
    // }
    if (ucode) {
      this.load = true;
    } else if (typeof sacc == "string" && typeof stok == "string") {
      let datao = JSON.stringify({
        token: stok,
        LoginId: sacc,
      });
      let configo = {
        method: "post",
        url: "https://rekycbe.mynt.in/autho/kambala_auth",
        headers: {
          "Content-Type": "application/json",
        },
        data: datao,
      };

      let axiosThis = this;
      axios
        .request(configo)
        .then((response) => {
          if (response.data.clientid && response.data.token) {
            localStorage.setItem("usession", response.data.token);
            localStorage.setItem("userid", response.data.clientid);
            axiosThis.token = response.data.token;
            axiosThis.uid = response.data.clientid;
            axiosThis.redirectpages();
          } else {
            localStorage.clear();
            axiosThis.goLogin();
          }
          window.location.assign(window.location.href.split("?")[0]);

          // setTimeout(() => {
          // window.location.assign(window.location.href.split('?')[0])
          // }, 3000);
        })
        .catch((error) => {
          console.log(error);
          axiosThis.goLogin();
        });
    }

    else {
      let decoded = decodeURIComponent(window.location.search);
      if (decoded) {
        var actid = decoded.split("&")[0].split("=")[1];
      var token = decoded.split("&")[2].split("=")[1];
      var kombalatoken = decoded.split("&")[1].split("=")[1];
      }
      
      this.token = localStorage.getItem("usession");
      this.client_code = localStorage.getItem("userid");
      this.sess = localStorage.getItem("sess");
      // this.token = 'ad5aaf26fd75b2769ebc2e5e4df57a14a125b0804d79eaf602d4151f248bef6c';
      // this.client_code = 'BL241';
      if (typeof actid == "string" && typeof token == "string") {
        localStorage.setItem("usession", token);
        localStorage.setItem("userid", actid);
        localStorage.setItem("sess", kombalatoken);
        this.token = localStorage.getItem("usession");
        this.client_code = localStorage.getItem("userid");
        window.location.assign(window.location.href.split("?")[0]);
      }

      let data = JSON.stringify({
        clientid: this.client_code,
        token: this.token,
      });

      let config = {
        method: "post",
        url: "https://rekycbe.mynt.in/autho/validate_session",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      let axiosThis = this;
      axios
        .request(config)
        .then((response) => {
          if (response.data.msg == "valid token") {
            //
            axiosThis.redirectpages();
          } else if (response.data.msg == "invalid token") {
            axiosThis.goLogin();
          }else if (response.data.emsg === 'token expired'){
            localStorage.clear();
          }
          
          else {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          axiosThis.goLogin();
        });
    }
  },
};
</script>