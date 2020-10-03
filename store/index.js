//vuex 一般用于状态管理
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    /* 数据源 */
	state : {
		historyLists : []
    },
	/* 对外提供修改数据源[state]的方法 */
    mutations : {
		//调用方式:this.$store.commit('SET_HISTORY_LISTS',history);
        SET_HISTORY_LISTS(state,history){
			state.historyLists = history;
		}
    },
	//提供对外异步修改数据源的方法，它只能调用操作上面的[mutations]的方法，不能直接操作数据源,所以页面只能调用本方法???
    actions: {
		//submit可以调用mutations的方法,指定[mutations]下的方法名,history是调用方法传递来的参数
		set_history({commit,state},history){//history因为是从调用发传递来的参数且数据格式是 对象格式{}
			const listData = state.historyLists;
			listData.unshift(history);
			commit('SET_HISTORY_LISTS',listData);//关键字commit是可以调用mutations里的方法;其流程是:页面调用set_history方法，而set_history调用[mutations]下的方法SET_HISTORY_LISTS()更改数据
		}
	}
});
//导出,需要在main.js挂载
export default store;