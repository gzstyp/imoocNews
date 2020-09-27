'use strict';
//获取云数据库的引用
const db = uniCloud.database();
exports.main = async (event, context) => {
	//第1个参数是表名;
	let labels = await db.collection('label').get()
	console.info(labels)
	//返回数据给客户端
	//return labels;// affectedDocs是总条数;data是返回的数据
	return {
		code : 200,
		msg : '操作成功',
		data : labels.data,
		total : labels.affectedDocs
	}
};