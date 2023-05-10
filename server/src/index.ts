import express from "express"
import authRoutes from "./routes/auth"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app = express() 

app.use(express.json())

app.use(cors())

app.use('/auth', authRoutes)

mongoose.connect(
    process.env.MONGO_URI as string
    ).then(()=> {
        console.log('DB Connected successfully')
    }
    ).catch((error)=> {
        console.log(error)
        throw new Error()
    }
)

app.listen(8080, ()=> {
    console.log(`Server running on port 8080`)
})