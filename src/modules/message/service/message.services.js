import { asyncHandling } from "../../../utils/errorHandling.js";
import usermodel from "../../../DB/model/user.model.js"
import { messagemodel } from "../../../DB/model/message.schema.js";
import {sucssesResponse} from "../../../utils/response/success.response.js"

export const sendmessage=asyncHandling(
async(req,res,next)=>{
const {message,recipientId}=req.body
const user=await usermodel.findOne({_id:recipientId})
if(!user){
return next(new Error("user not found",{cause:404}))
}
const newMessage= await messagemodel.create({message,recipientId})
return sucssesResponse({res,message:"done",status:201,data:{newMessage}})

}

)