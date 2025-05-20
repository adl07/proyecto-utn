import express from 'express'
import { connectMongodb } from './config/mongo';
import { turnsRouter } from './routes/turnRouter';
import { authRouter } from './routes/authRouter';
import { authMiddleware } from './middlewares/authMiddleware';

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/turns", authMiddleware, turnsRouter )


app.listen(PORT, ()=>{
    console.log(`Escuchando desde el puerto http://localhost:${PORT} 👌`)
    connectMongodb()
})