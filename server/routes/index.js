const router = require("express").Router();
const ControllerPost = require("../controllers/posts.js");

router.get("/posts", ControllerPost.viewPosts);
router.get("/posts/:postId", ControllerPost.postDetail);
router.post("/posts", ControllerPost.addPost);
router.put("/posts/:postId", ControllerPost.editPost);
router.delete("/posts/:postId", ControllerPost.destroy);

module.exports = router;