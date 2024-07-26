import LayoutSrc from "@/components/Layout/LayoutSrc.vue";
// import CustomizeCollection from "@/views/Dashboard/CustomizeCollection.vue";
import DashBoard from "@/views/Dashboard/DashBoard.vue";
import OrderBook from "@/views/Dashboard/OrderBook.vue";
// import CollectionPage from "@/views/Dashboard/pages/CollectionPage.vue";
import SingleCollection from "@/views/Dashboard/SingleCollection.vue";
import SIPpage from "@/views/Dashboard/SIPpage.vue";
import HoldingsPage from "@/views/Dashboard/HoldingsPage.vue";


import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/collection",
    name: "appbar",
    component: LayoutSrc,
    children: [
      {
        path: "/collection",
        //
        name: "dashboard",
        component: DashBoard,
      },
      {
        path: "/collection/singlepage/:name",
        name: "singlePage stock",
        component: SingleCollection,
      },
      {
        path: "/orderbook",
        name: "collection order book",
        component: OrderBook,
      },
      {
        path: "/sip",
        name: "sip",
        component: SIPpage,
      },
      {
        path: "/holding",
        name: "holding",
        component: HoldingsPage,
      },
      // {
      //   path: "/collection/singlepage/customizecollection",
      //   name: "customize collection",
      //   component: CustomizeCollection,
      // },
      // {
      //   path: "/stock",
      //   name: "single page stock",
      // },
      // { path: "*", redirect: "/collection" },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
