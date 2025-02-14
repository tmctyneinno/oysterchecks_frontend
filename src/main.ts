


import './assets/custom.css'

//bootstrap@5.3.3
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// @ts-ignore
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//vue-select@beta
// @ts-ignore
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

// @ts-ignore
import JsonExcel from "vue-json-excel3";

//@ts-ignore
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress';
import '@marcoschulte/vue3-progress/dist/index.css';

import GoogleSignInPlugin from "vue3-google-signin"

// https://www.npmjs.com/package/country-state-city
// npm i country-state-city

//https://michalsnik.github.io/aos/
import "aos/dist/aos.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('EasyDataTable', Vue3EasyDataTable);
app.component('VueDatePicker', VueDatePicker);
app.component('vSelect', vSelect);
app.component("downloadExcel", JsonExcel);

app.use(GoogleSignInPlugin, {
    // clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientId: 'clientId',
});

app.use(createPinia())
app.use(Vue3ProgressPlugin);
app.use(router)

app.mount('#app')
