import express from "express"
import AuthController from "../controller/auth-controller.js";


const AuthRoute = express.Router();


AuthRoute.post("/register", AuthController.AuthRegister);
AuthRoute.post("/login", AuthController.AuthLogin);





export default AuthRoute