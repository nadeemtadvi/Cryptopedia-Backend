import PostModel from "../models/blog.js";
import UserModel from "../models/user.js";
import CommentModel from "../models/comments.js";
import fs from 'fs'
import path from 'path'

const getalldata = async (req, res) => {
  try {
    const Users = await UserModel.find();
    const Posts = await PostModel.find();
    const Comments = await CommentModel.find();
    //comment data
    if (!Users && !Posts) {
      return res.status(404).json({
        success: false,
        message: "Data not Found",
      });
    }
    res.status(200).json({
      success: true,
      Users,
      Posts,
      Comments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const Users = await UserModel.find();
    //comment data
    if (!Users) {
      return res.status(404).json({
        success: false,
        message: "UserData not Found",
      });
    }
    res.status(200).json({
      success: true,
      Users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const UserDelete = async (req, res) => {
    try {
        const userId = req.params.id
        const Existuser = await UserModel.findById(userId);
        if (!Existuser) {
            return res.status(404).json({
              success: false,
              message: "User not Found",
            });
          }
          
        if (Existuser.role === 'admin') {
            return res.status(403).json({
              success: false,
              message: "you can not delete your account admin",
            });
          }
          if(Existuser.profile){
            const profilepath = path.join('public/images',Existuser.profile)
            fs.promises.unlink(profilepath)
            .then(()=>console.log('Post image deleted '))
            .catch(error => console.log('error deleting post image ', error))
        }
          const Deleteuser = await UserModel.findByIdAndDelete(userId)
          return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user:Deleteuser
          });
          
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        }); 
    }
}

export { getalldata, getUser, UserDelete };
