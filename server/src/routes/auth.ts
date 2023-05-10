import express, { Request, Response } from "express"
import User from "../model/user.model";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()

router.post('/signup', async(req: Request,res: Response) => {
    const {email , password} = req.body
    try{
        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json("Email already in use!")
        }

        const hashedPassowrd = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password: hashedPassowrd
        })

        const token = await JWT.sign(
        {email: newUser.email},
        process.env.JWT_SECRET as string,
        {
            expiresIn: 360000
        }
        )
        return res.status(201).json({
            data: {
                token,
                user: {
                    id: newUser._id,
                    email
                },
            }
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Internal server error"})
    }
})

router.post("/login", async(req: Request,res: Response) => {
    const {email , password} = req.body
    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json("Invalid Credentials!")
        }

        const isValidUser = await bcrypt.compare(password, user.password);
        if(!isValidUser) {
            return res.status(400).json("User not found")
        }

        const token = await JWT.sign(
            {email: user.email},
            process.env.JWT_SECRET as string,
            {
                expiresIn: 360000
            }
        )
        return res.status(201).json({msg: "Signed In Successfully",
            data: {
                token,
                user: {
                id: user._id,
                email
                },
            }
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({msg: "Internal server error"})
    } 
})

export default router