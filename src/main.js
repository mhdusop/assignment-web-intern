import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"

// import boottrap 
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.config.globalProperties.$http = axios.create({
   baseURL: 'http://localhost:8000/api/v1'
});

app.use(router);
app.mount('#app')
