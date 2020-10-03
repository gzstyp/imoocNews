'use strict';
//获取云数据库的引用
const db = uniCloud.database();
//聚合的操作符
const $aggregate = db.command.aggregate;
exports.main = async (event, context) => {
	//从参数 event 接收参数
	const user_id = event.user_id;
	const value = event.value;
	const userInfo = await db.collection('user').doc(user_id).get();
	const article_likes_ids = userInfo.data[0].article_likes_ids;
	//聚合[类似于数据库的聚合函数]:是更精细化的去处理数据,对返回的数据求和、分组、指定返回哪些字段
	const list = await db.collection('article')//article是指定云数据库的表名
	.aggregate()
	.addFields({
		is_like : $aggregate.in(['$_id',article_likes_ids]) //表示当前的某个数组里包含了某个字段,其中的$_id表示的是表的,第二个参数是在要哪一个数组里
	})
	.project({
		content : false
	})
	//通过title筛选
	.match({title : new RegExp(value)})
	.end();
	return {
		code : 200,
		"msg" : '操作成功',
		"data" : list.data
	};
};