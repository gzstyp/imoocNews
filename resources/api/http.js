// 两个参数,调用方法:
/*
return $http(
	{
		url : name_url,
		params : params //此行可以简写为 params,因为ES6语法
	}
);
*/
export default function $http(options){
	const {url,params} = options;
	const dataObj = {
		user_id : "5f6f3bfc37d16d000179521d",//每次请求默认都会添加这个user_id
		...params //解构一下,你需要在每个请求的参数里重复添加上面的user_id，即在原来的数据基础上添加新的数据
	}
	return new Promise((reslove,reject) =>{
		uniCloud.callFunction({
			name : url,
			data : dataObj
		}).then(res =>{
			/* if(res.result.code === 200){
				reslove(res.result);
			}else{
				// .catch(err);
				reject(res.result);
			} */
			//执行的是 .then(data);
			reslove(res.result);//主要是正常返回的都走reslove();
		}).catch((err) =>{
			// .catch(err);
			reject(err);
		});
	});
}