import { Schema ,model} from "mongoose";

export const genderType={male:'male',female:'female'}
const userscema = new Schema({

    username: {
        type: String,
        required: [true,'Username is required'],
        minlength:2,
        maxlength:50,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        unique: true,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

phone:String,

gender:{
  type:String,
  enum:Object.values(genderType),
  default:genderType.male
},
image:String,

DOB:Date,

confirmEmail:{
  type:Boolean,
  default:false } ,
  OTP:String,

role:{
  type:String,
  enum:['User','Admin'] ,
  default:'User'
}, 
changepasswordTime: Date,

deleted:{type:Boolean,default:false},
},{timestamps:true})

const usermodel = model("users",userscema)
export default usermodel  