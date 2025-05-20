import { Response, Request, json } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";


class AuthController{
    static async Register(req: Request, res: Response): Promise<any>{
        try {
            const body = req.body
        const {username, password} = body

        if(!username || !password) res.status(400).json({success: false, message: "bad request"})

        
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({username, password: hash})
        await newUser.save()
        res.status(201).json({success: true, data: {_id: newUser._id, username: newUser.username}})
        } catch (error) {
            const err = error as Error
        res.json({
            success: false,
            message: err.message
        })
        }
    }

    static async Login(req: Request, res: Response):Promise<any>{
        try {
            const body = req.body
            const {username, password} = body
            if(!username || !password) return res.status(400).json({success: false, message:"bad request"}) 


            const foundUser = await User.findOne({username})
            if(!foundUser) return res.status(401).json({success: false, message:"Unauthorized"}) 

            const validPassword = await bcrypt.compare(password, foundUser.password)
            if(!validPassword) return res.status(401).json({success: false, message: "Unauthorized"})

            const JWT_SECRET = process.env.JWT_SECRET || "test"

            const token = Jwt.sign({_id: foundUser._id, username: foundUser.username}, JWT_SECRET, {expiresIn: "1h"})

            res.json({success: true, data: {token}})
        }
        catch (error) {
            const err = error as Error
            return res.status(500).json({
            success: false,
            message: err.message
        })
        }
    }
}


export default AuthController