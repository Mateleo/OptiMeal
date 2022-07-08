import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Account from "../components/Account.vue";
import Eat from "../components/Eat.vue";
import { useStore } from "@/stores/store";
import axios from "axios";
import { useToast } from "vue-toastification";
// import Planner from "../components/Planner.vue";
// import Create from "../components/Create.vue";
import Contact from "../components/Contact.vue";
import Recette from "../components/Recette.vue";
// import { useStore } from "@/stores/store";
// import { useToast } from "vue-toastification";
// import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/mypanel",
    name: "Account",
    component: Account,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useStore();
      if (!store.getUsername) {
        return "/";
      } else {
        // store.fetchProfile().then(store.fetchUserPlanners(store.getUsername));
      }
      return true;
    },
  },
  {
    path: "/recette/:recettelink",
    name: "Recette",
    component: Recette,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useStore();
      if (!store.getUsername) {
        return "/";
      } else {
        // store.fetchProfile().then(store.fetchUserPlanners(store.getUsername));
      }
      return true;
    },
  },
  {
    path: "/eat",
    name: "Eat",
    component: Eat,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useStore();
      if (!store.getUsername) {
        return "/";
      } else {
      }
      if(store.weekMenu.length==0){
        store.fetchWeekMenu()
      }
      return true;
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const title = "OptiMeal";
router.beforeEach((to, from) => {
  document.title = "OptiMeal - " + String(to.name) || title;
});

router.beforeEach(async (to, from) => {
  console.log(from.name);
  if (
    (from.name == undefined && to.name != "Home" && to.name != "Login") ||
    (from.name == "Home" && to.name !== "Home" && to.name!=="Login")
  ) {
    let store = useStore();
    let toast = useToast();
    await axios
      .get(import.meta.env.VITE_API_URL + "/auth", {
        withCredentials: true,
      })
      .then((data) => {
        store.setUserData(data.data);
        // store.fetchCards()
        document.title = "OptiMeal - " + String(to.name) || title;
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "You must login! (Remove Adblock/Brave + add cookies) (Remove Adblock/Brave + add cookies)",
          {
            // @ts-ignore
            position: "top-center",
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          }
        );
      });
  }
});

export default router;
