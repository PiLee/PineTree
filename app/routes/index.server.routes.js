var PostController = require('../controllers/post.server.controller');

module.exports=function(app){
	//index
	app.route('/')
		.get(function(req, res, next){
			res.json('PineTree')
		});
	// 获取文章列表
	app.route('/api/article-list')
		.get(PostController.list);

	// 获取文章详情
	app.route('/api/article/:articleId')
		.get(PostController.get);

	// 发布文章
	app.route('/api/post')
		.post(PostController.create);

	// 编辑文章
	app.route('/api/ariticle-update/:articleId')
		.post(PostController.update);
};

