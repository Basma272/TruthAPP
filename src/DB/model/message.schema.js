import mongoose, {Schema,Types,model} from "mongoose"
import { generalfields } from "../../utils/General.validation/General.validation.js"

const messageSchema =new Schema({
    message:{type:String,required:true,time:true,minlength:2,maxlength:50000},
    recipientId:{type:Types.ObjectId,ref:"user"}

},{timestamps:true })

export const messagemodel=mongoose.models.message|| model("message",messageSchema)