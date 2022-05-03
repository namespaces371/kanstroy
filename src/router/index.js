import { createRouter, createWebHistory } from "@ionic/vue-router";
import mainWrapper from "@/views/mainWrapper.vue";
import signinPage from '@/views/auth/signinPage'
import store from '@/store/index'

const routes = [
  {
    path: "/",
    redirect: "/welcome",
  },
  {
    meta: { requiredAuth: false },
    path: "/welcome",
    name: "Welcome",
    component: () => import("@/views/WelcomePage.vue"),
  },

  {
    path: "/mainTabs/",
    meta: { requiredAuth: true },
    component: mainWrapper,
    children: [
      {
        path: "",
        redirect: "/mainTabs/mainPage",
      },
      {
        path: "mainPage",
        component: () => import("@/views/mainTabs/mainPage.vue"),
      },
      {
        path: "inWorksPage",

        component: () => import("@/views/mainTabs/inWorksPage.vue"),
      },
      {
        path: "catalogPage",
        component: () => import("@/views/mainTabs/catalogPage.vue"),
      },
      {
        path: "profilePage",

        component: () => import("@/views/mainTabs/profilePage.vue"),
      },
    ],
  },
  {
    path: "/auth/",
    meta: { requiredAuth: false },
    component: signinPage,
    children: [
      {
        path: "",
        redirect: "/auth/signin",
      },
      {
        path: "signin",
        component: () => import("@/views/auth/signinPage.vue"),
      },
      {
        path: "signup",
        component: () => import("@/views/auth/signupPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function guard(to, from, next, authData) {
  if (to.meta && to.meta.requiredAuth) {
    
    if (authData && authData.userInfo.id > 0) {
      return next();
    }
    return next({ path: "/auth/signin" });
  } else {
    if (authData && authData.userInfo.id > 0) {
      return next({ path: "/mainTabs" });
    }
    return next();
  }
}
router.beforeEach((to, from, next) => {
  
  let authData = store.getters["as/getAuthData"];
  if (Object.keys(authData.userInfo).length === 0) {
    store.dispatch("as/loadStorageTokens").then(
      () => {
        authData = store.getters["as/getAuthData"];
        return guard(to, from, next, authData);
      },
      (error) => {
        console.log(error);
        return guard(to, from, next, authData);
      }
    );
  } else {
    return guard(to, from, next, authData);
  }
});

export default router;
