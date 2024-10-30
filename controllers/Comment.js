import PostModel from "../models/blog.js";
import CommentModel from "../models/comments.js";

const Addcomment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;

    const newComment = new CommentModel({
      postId,
      userId,
      comment,
    });

    await newComment.save();
    const existpost = await PostModel.findById(postId);
    if (!existpost) {
      return res.status(500).json({
        success: false,
        message: "post is not exist",
      });
    }
    existpost.comments.push(newComment._id);
    await existpost.save();
    res.status(200).json({
        success: true,
        message: "comment added successfully",
        comment: newComment
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { Addcomment };
