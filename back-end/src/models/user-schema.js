import mongoose, {Schema} from "mongoose";
const userSchema = new Schema({
    'email' : {type:String, required:true, unique:true},
    'password' : {type:String, required:true},
    'name' : {type:String}
})
export const UserModel = mongoose.model('users',userSchema);