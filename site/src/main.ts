import { createApp } from 'vue'
import { createPinia } from 'pinia'

//@ts-ignore
import App from './App.vue'
import router from './router'
import './index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
//@ts-ignore
import VueProgressBar from "@aacassandra/vue3-progressbar";

const options = {
    transition: "Vue-Toastification__fade",
    maxToasts: 1,
    newestOnTop: true,
  };

  const options2 = {
    color: "#bffaf3",
    failedColor: "#874b4b",
    thickness: "5px",
    transition: {
      speed: "0.2s",
      opacity: "0.6s",
      termination: 300,
    },
    autoRevert: true,
    location: "left",
    inverse: false,
  };


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options);
app.use(VueProgressBar, options2)

app.mount('#app')
