//vuex 一般用于状态管理
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    /* 数据源 */
	state : {
		historyList : []
    },
	/* 对外提供修改数据的方法 */
    mutations : {
        SET_HISTORY_LIST(state,history){
			state.historyList = history;
		}
    },
    actions: {}
});
//导出,需要在main.js挂载
export default store;
