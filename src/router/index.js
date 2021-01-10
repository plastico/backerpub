import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
/*ここから新規追加*/
import Signup from "../components/signup.vue";
import Signin from "../components/signin.vue";
import Signout from "../components/signout.vue";
import Mypage from "../components/mypage.vue";
import firebase from "../firebase.js";
/*ここまで*/

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  /*ここから新規追加*/
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin
  },
  {
    path: "/signout",
    name: "signout",
    component: Signout
  },
  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
    meta: { requiresAuth: true }
  }
  /*ここまで*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next({ path: "/signin", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;