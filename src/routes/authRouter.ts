import { Router } from "express";
import AuthController from "../controllers/authControllers";

//http://localhost:1234/api/auth

const authRouter = Router()

authRouter.post("/login", AuthController.Login)
authRouter.post("/register", AuthController.Register)

export {authRouter}

