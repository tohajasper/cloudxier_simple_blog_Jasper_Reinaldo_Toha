const { Post } = require("../models");

class Controller {
	static addPost(req, res, next) {
		let input = {
			title: req.body.title || null,
			content: req.body.content || null,
			author: req.body.author || null,
			image_url: req.body.image_url || null,
		};
		Post.create(input)
			.then((result) => {
				res.status(201).json(result);
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	}

	static viewPosts(req, res, next) {
		Post.findAll({
			order: [["createdAt", "DESC"]],
		})
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
                console.log(err)
				next(err);
			});
	}

	static postDetail(req, res, next) {
		Post.findOne({
			where: {
				id: req.params.postId
			},
		})
			.then((result) => {
				if(!result) next({ name: "Post Not Found" });
				res.status(200).json(result);
			})
			.catch((err) => {
                console.log(err)
				next(err);
			});
	}

	static editPost(req, res, next) {
		let input = {
			title: req.body.title || null,
			content: req.body.content || null,
			author: req.body.author || null,
			image_url: req.body.image_url || null,
		};

		Post.update(input, {
			where: {
				id: +req.params.postId,
			},
		})
			.then((result) => {
				if (result[0]) res.status(200).json({
					message : 'Post succesfully edited'
				});
				else next({ name: "Post Not Found" });
			})
			.catch((err) => {
                console.log(err)
				next(err);
			});
	}

	static destroy(req, res, next){
		Post.destroy({
			where: {
				id: +req.params.postId,
			},
		})
			.then((result) => {
				res.status(200).json({ message: "Post Successfully Deleted" });
			})
			.catch((err) => {
                console.log(err)
				next(err);
			});
	}
}

module.exports = Controller;