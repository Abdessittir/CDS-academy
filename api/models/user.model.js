import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: [true, "Please enter a user name!!"],
        maxlength:[40, "name can not exceed 40 charcters!!"],
        minlength:[4, "name must have at leat 4 characters!!"],
    },
    email:{
        type: String,
        required: [true, "Please enter a user email!!"],
        validate:[validator.isEmail, "Please enter a valid email!!"],
        unique: true
    },
    phoneNo:{
        type:String,
        required:[true, "Please enter a your city!"],
    },
    city:String,
    password:{
        type:String,
        required:[true, "Please enter a password"],
        minlength: [8, "name must have at leat 8 characters!!"],
        select: false,
    },
    avatar:{
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"avatars",
        },
        url:{
            type: String,
        }
    },
    role:{
        type:String,
        default:"student"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


userSchema.pre("save", function(){
    
    if(!this.isModified("password")){
        return;
    }

    this.password = bcrypt.hashSync(this.password, 10);
});


userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: parseFloat(process.env.JWT_EXPIRE)
    });
}

userSchema.methods.compatePasswords = function(clientPassword){
    return bcrypt.compareSync(clientPassword, this.password);
}

export default mongoose.model("User", userSchema);