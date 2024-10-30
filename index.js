import express from "express";
import dotenv from "dotenv";
import DBcon from "./utils/db.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import BlogsRoutes from "./routes/Blog.js";
import DashboardRoute from "./routes/Dashboard.js";
import CommentRoute from "./routes/Comment.js";
import PublicRoutes from "./routes/Public.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
DBcon();

// const corsOption = {
//   origin : 'http://localhost:5173',
//   credentials : true
// }

app.use(express.json());
app.use(express.static('public'));

const corsOptoins={
  origin:true,
  credentials:true
}
app.use(cors(corsOptoins))

app.get("/", (req, res) => {
  res.send("Backend ");
});

app.use(cookieParser());

app.use("/auth", AuthRoutes);
app.use("/blog", BlogsRoutes);
app.use("/dashboard", DashboardRoute);
app.use("/comment", CommentRoute);
app.use("/public", PublicRoutes);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
