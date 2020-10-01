'use strict';
//获取云数据库的引用
const db = uniCloud.database();
//聚合的操作符
const $aggregate = db.command.aggregate;
exports.main = async (event, context) => {
	//从参数 event 接收参数
	const user_id = event.user_id;
	const name = event.name;
	const page = event.page;
	const pageSize = event.pageSize;
	let matchObj = {};
	if(name !== '全部'){
		matchObj = {classify : name}
	}
	const userInfo = await db.collection('user').doc(user_id).get();
	const article_likes_ids = userInfo.data[0].article_likes_ids;
	//聚合[类似于数据库的聚合函数]:是更精细化的去处理数据,对返回的数据求和、分组、指定返回哪些字段
	const list = await db.collection('article')//article是指定云数据库的表名
	.aggregate()
	.addFields({
		is_like : $aggregate.in(['$_id',article_likes_ids]) //表示当前的某个数组里包含了某个字段,其中的$_id表示的是表的,第二个参数是在要哪一个数组里
	})//追加返回字段
	.match(matchObj)
	.project({
		content : false
	})
	//读取区间
	.skip(pageSize * (page - 1))
	.limit(pageSize)//限制条数
	.end();
	
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