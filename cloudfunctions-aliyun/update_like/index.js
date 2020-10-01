'use strict';
//获取云数据库的引用
const db = uniCloud.database();
const dbCom = db.command;//云数据库操作符
//完成的功能是，点击收藏;再点击就是取消收藏
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {user_id,article_id} = event;
	const userInfo = await db.collection('user')//user指定云数据库的表名
	.doc(user_id) //表示我们要获取的id里的某一个值的id
	.get();//获取到用户信息
	
	const article_id_ids = userInfo.data[0].article_likes_ids;
	
	let dbComFuns = null;
	//判断是否存在该id,存在就删除否则就添加
	if(article_id_ids.includes(article_id)){
		dbComFuns = dbCom.pull(article_id) //删除
	}else{
		dbComFuns = dbCom.addToSet(article_id)//添加
	}
	
	//更新数据
	await db.collection('user').doc(user_id).update(
		{
			article_likes_ids : dbComFuns
		}
	);
	//返回数据给客户端
	return {
		code : 200,
		msg : '操作成功',
		data : userInfo.data[0]
	};
};