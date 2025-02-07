import {Router} from "express"
import *as messageservices from ".././message/service/message.services.js"
import {sendMessage} from "../../modules/auth/schema.valid/auth.validation.js"
import {validation} from "../../middleware/validation/validation.middlewhere.js"
const router=Router()

router.post("/",validation(sendMessage),messageservices.sendmessage)

export default router