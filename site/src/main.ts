import { createApp } from 'vue'
import { createPinia } from 'pinia'

//@ts-ignore
import App from './App.vue'
import router from './router'
import './index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    transition: "Vue-Toastification__fade",
    maxToasts: 1,
    newestOnTop: true,
  };


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options);

app.mount('#app')
