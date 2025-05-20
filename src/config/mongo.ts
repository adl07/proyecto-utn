import mongoose from "mongoose";

process.loadEnvFile()

const URL_DB = process.env.URL_DB || ""

const connectMongodb = async()=>{
    try {
        await mongoose.connect(URL_DB)
        console.log("conexion a la base exitosa ✅")
    } catch (error) {
        console.log("conexion a la base rechazada ❌")
    }
}


export {connectMongodb}