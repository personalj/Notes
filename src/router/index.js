import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/note/:id",
    name: "Note",
    component: () => import("../views/Note.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue"),
  },
  {
    path: "/create-note",
    name: "CreatetNote",
    component: () => import("../views/CreateNote.vue"),
  },
  {
    path: "/edit-note/:id",
    name: "EditNote",
    component: () => import("../views/EditNote.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
