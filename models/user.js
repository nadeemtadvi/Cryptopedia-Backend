import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
    },
    email: {
      type: String,
    },
    profile: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("Users", userSchema);
 export default UserModel