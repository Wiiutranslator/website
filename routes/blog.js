/*

blog.js -
file for handling routes regarding blog posts.

*/

// imports
const router = require('express').Router();
const common = require('../helpers/common');
const blogPostModel = require('../models/blog-post').blogPostModel;

// display blog post
router.get('/news/:date/:title', (req, res) => {
	// date format DD-MM-YYY
	if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(req.params.date) && /([a-z]|[0-9]|-)+/.test(req.params.title.toLowerCase())) {
		// params are correct format
		blogPostModel.getPost(new Date(req.params.date), req.params.title.toLowerCase(), (err, post) => {
			// error exists or no post exists with the date and name
			if (err || !post) {
				console.log('error: ' + err + ' and post: ' + post);
				return common.sendDefault404(res);
			}
			
			// render blogpost
			res.render('post', {
				post: post.getBlogPostTemplateReady()
			});
		});
	} else {
		// params are incorrect
		common.sendDefault404(res);
	}
});

// export router
module.exports = router;
