import { messagemodel } from "../../../DB/model/message.schema.js";
import usermodel from "../../../DB/model/user.model.js";
import { asyncHandling } from "../../../utils/errorHandling.js";
import *as hashing from "../../../utils/hashing/hashing.js";
import {sucssesResponse} from "../../../utils/response/success.response.js"
import *as bcrypt from "bcrypt"

export const shareProfile=asyncHandling(
    async(req,res,next)=>{
const user =await usermodel.findById(req.params.userId).select("username image gender DOB")
if(!user){
    return next(new Error("invalid account",{cause :404}))
}
      return sucssesResponse({
            message: "done",status:200,data:{user:user},res})
    }
    
)



export const userprofile=asyncHandling(
    async(req,res,next)=>{
const message=await messagemodel.find({recipientId:req.user._id})
        sucssesResponse({
            message: "done",status:200,data:{user:req.user,message},res})
    }
    
) 



export const updateProfile=asyncHandling(
     async(req,res,naxt)=>{
  //   const{username,phone,gender}=req.body
  //   console.log(username,phone,gender);
    if(req.body.phone){
    req.body.phone=hashing.generatencryption({data:req.body.phone})
    }
    const user=await usermodel.findByIdAndUpdate(
        req.user._id,
        req.body,{
        new:true,
        runValidators:true})
    sucssesResponse({
     message: "done",status:200,data:{user},res})
    })


export const updatePassword = asyncHandling(async (req, res, next) => {
const { password_old , password } = req.body;

    // جلب المستخدم من قاعدة البيانات
    const user = await usermodel.findById(req.user._id);
    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }

    const matchpassword = await bcrypt.compare(password_old, user.password);
    if (!matchpassword) {
        return next(new Error("Incorrect password", { cause: 401 }));
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const updatedUser = await usermodel.findByIdAndUpdate(
        req.user._id,
        { password: hashpassword ,changepasswordTime:Date.now()},
        { new: true }
    );

   sucssesResponse({
     message: "done",status:200,data:{user},res})
    
});



export const deleteProfile=asyncHandling(
    async(req,res,naxt)=>{
   const user=await usermodel.findByIdAndDelete(
       req.user._id)  
   sucssesResponse({
    message: "done",status:200,res})
   })

