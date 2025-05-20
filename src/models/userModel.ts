import { Schema, model } from "mongoose";

const userShcema = new Schema({
    username:{type: String, required: true, unique: true},
    password:{type: String, required: true}
},{
    versionKey: false
})

const User = model("User", userShcema)

export{ User }