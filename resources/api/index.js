/*单个导出文件
import {queryList,getLabel,getList,login} from './list.js';//这个方式,原生的写法,但需要在调用方维护url
import {getListLabel} from './apis.js' //推荐这种方式
//导出
export default {
	queryList,
	getLabel,
	getList,
	login,
	getListLabel
}*/
//批量导出文件,第1个参数是目录的相对路径;第2个是否查询子目录;第3个是查询文件的后悔名
const requireApi = require.context('.',false,/.js$/);
//定义一个空对象
let module = {};
requireApi.keys().forEach((key,index) =>{
	if(key === './index.js' || key === './http.js')return;//排除
	console.info(key);
	Object.assign(module,requireApi(key))//复制,把参数2的数据复制到参数1里去
});
console.info(module);//输出的是所有方法名queryList,getLabel,getList,login,getListLabel
export default module;