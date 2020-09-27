import $http from './http.js';
// 获取数据,其中 name_url 是云函数名,params是参数
function getListData(name_url,params){
	return $http(
		{
			url : name_url,
			params : params //此行可以简写为 params,因为ES6语法
		}
	);
}
//用法 this.$api.getListLabel({}).then(data =>{}).catch(err =>{});推荐使用这个方式,因为这里负责维护url,其他尽管调用即可!!!
export const getListLabel = (params) =>{
	return getListData('get_label',params);
}