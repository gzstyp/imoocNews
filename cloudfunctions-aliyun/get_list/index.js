'use strict';
//获取云数据库的引用
const db = uniCloud.database();
exports.main = async (event, context) => {
	//从参数 event 接收参数
	const name = event.name;
	//聚合[类似于数据库的聚合函数]:是更精细化的去处理数据,对返回的数据求和、分组、指定返回哪些字段
	const list = await db.collection('article')
	.aggregate()
	.match({
		classify : name
	}).project({
		content : false
	}).end();
	
	//查询全部数据
	/* const list = await db.collection('article')//await是同步
	.field( // 指定返回的字段
		{
			content : false //即过滤到content字段，也就是不返回 content 字段的数据,如果是true的话,仅返回 content 的字段
		}
	).get(); */
	return {
		code : 200,
		"msg" : '操作成功',
		"data" : list.data
	};
};