const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "list of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    post.remove();

    await Comment.deleteMany({ post: req.params.id });

    return res.json(200, {
      message: "post and associated comments are deleted",
    });
  } catch (error) {
    return res.json(500, {
      message: "internal server error",
    });
  }
};
