// 不推荐在使用本js的方式,因为需要在调用方维护url云函数!!!
import $http from './http.js';

/* 声明一个函数名 queryList,name_url是云函数的名称,此处使用的是原生方式,调用方式:
其中的这个 $api 是在main.js里定义的 --> Vue.prototype.$api = api;
this.$api.queryList('get_label',{
}).then(data =>{
	this.tabList = data.data;
}).catch(err =>{
	console.info(err);
});
*/
export const queryList = (name_url,params) =>{
	return new Promise((reslove,reject) =>{
		uniCloud.callFunction({
			name : name_url,
			data : params
		}).then(res =>{
			//执行的是 .then(data)
			if(res.result.code === 200){
				reslove(res.result);
			}else{
				// .catch(err)
				reject(res.result);
			}
		}).catch((err) =>{
			reject(err);
		});
	});
}
//声明一个函数名 getLabel,name_url是云函数的名称,调用方式:
/*
this.$api.getLabel('get_label',{
}).then(data =>{
	this.tabList = data.data;
}).catch(err =>{
	console.info(err);
});
*/
export const getLabel = (name_url,params) =>{
	// 其中的这个 $http({}) 是在 resources/api/list.js 里定义的 --> export default function $http(options){};
	return $http(
		{
			url : name_url,
			params : params //此行可以简写为 params,因为ES6语法
		}
	);
}

//声明一个函数名 getList,name是云函数的名称
export const getList = (name,params) =>{
	return new Promise((reslove,reject) =>{
		uniCloud.callFunction({
			name : name,
			data : params
		}).then(res =>{
			//执行的是 .then(data)
			if(res.result.code === 200){
				reslove(res.result);
			}else{
				// .catch(err)
				reject(res.result);
			}
		}).catch((err) =>{
			reject(err);
		});
	});
}
//声明一个函数名 login
export const login = () =>{
	return new Promise((reslove,reject) =>{
		reslove(
			{
				code : 200,
				msg : 'export方法并调用成功'
			}
		);
	});
}