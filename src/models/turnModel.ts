import { Schema, model } from "mongoose";
import { Specialitys } from "../utils/specialitys";


const turnSchema = new Schema({
    document: { type: String, require: true, unique: true},
    medical: {type: String, require: true},
    duration: {type: Number, require: true },
    specialty:{type: String, enum: Specialitys}
},{
    versionKey: false
}
)


const Turn = model("Turn", turnSchema)

export {Turn}