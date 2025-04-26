// app/routes/auth.routes.js
import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import { verifySignUp } from "../middlewares/index.js";
 
const router = express.Router();
 
// Signup Route
router.post(
    "/users",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    signup,
);
 
// Signin Route
router.post("/login", signin);
 
export default router;