import Vue from 'vue';
import App from './App';
import api from './resources/api/index.js';
import store from './store/index.js';
Vue.config.productionTip = false;
Vue.prototype.$api = api;
App.mpType = 'app';

const app = new Vue({
	store,//注册到vue，此时可以用 this.store.Xxxx
    ...App
});
app.$mount();