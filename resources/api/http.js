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
	return new Promise((reslove,reject) =>{
		uniCloud.callFunction({
			name : url,
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