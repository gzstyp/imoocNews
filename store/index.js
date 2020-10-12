//vuex 一般用于状态管理
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    /* 数据源 */
	state : {
		historyLists : uni.getStorageSync("history") || [] //从本地获取,若没有则默认的空数组 []
    },
	/* 对外提供修改数据源[state]的方法,它可以改变 state 数据源的数据 */
    mutations : {
		//调用方式:this.$store.commit('SET_HISTORY_LISTS',history);
        SET_HISTORY_LISTS(state,history){
			state.historyLists = history;
		},
		CLEAR_HISTORY(state){
			state.historyLists = [];
		}
    },
	//提供对外任意的异步修改数据源的操作方法，但它只能调用操作上面的[mutations]的方法修改数据源的数据，不能直接操作数据源,所以页面只能调用本方法???
    actions: {
		//submit可以调用mutations的方法,指定[mutations]下的方法名,history是调用方法传递来的参数,调用方式:this.$store.dispatch('set_history',{name : this.value});
		set_history({commit,state},history){//history因为是从调用发传递来的参数且数据格式是 对象格式{}
			let list = state.historyLists;
			list.unshift(history);
			uni.setStorageSync('history',list);//存入本地
			commit('SET_HISTORY_LISTS',list);//关键字commit是可以调用mutations里任意的方法;其流程是:页面调用set_history方法，而set_history调用[mutations]下的方法SET_HISTORY_LISTS()更改数据
		},
		updateHistory({commit,state},history){
			const listData = state.historyLists;
			listData.unshift(history);
			commit('SET_HISTORY_LISTS',listData);
		},
		//调用方式:this.$store.dispatch('clearHistory');
		clearHistory({commit}){
			uni.removeStorageSync('history')//清空本地
			commit('CLEAR_HISTORY');//关键字commit是可以调用mutations里任意的方法;其流程是:页面调用set_history方法，而set_history调用[mutations]下的方法SET_HISTORY_LISTS()更改数据
		},
	}
});
//导出,需要在main.js挂载
export default store;