import express from "express";
import {
  registerUser,
  loginUser,
  userCredits,
} from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/credits", userAuth, userCredits);

export default userRouter;

//http://localhost:4000/api/user/register when this path is hit , registerUser function will be called
// http://localhost:4000/api/user/login  same for loginUser function
