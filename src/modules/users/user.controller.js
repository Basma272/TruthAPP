import { Router } from "express";
import {authentication, authorization} from "../../middleware/auth.middleware.js"
import *as Userservises from "./sevices/user.servises.js"
import {andpoint} from "./user.endpoint.js"
import *as generalValidation from "../auth/schema.valid/auth.validation.js"
import {validation} from "../../middleware/validation/validation.middlewhere.js"
const router =Router()

router.post('/profile',authentication,authorization(andpoint.profile),Userservises.userprofile)
router.patch('/profile',validation(generalValidation.valid_user_update),authentication,authorization(andpoint.profile),Userservises.updateProfile)
router.patch('/profile/password',validation(generalValidation.valid_password_update),authentication,authorization(andpoint.profile),Userservises.updatePassword)
router.delete('/profile',authentication,authorization(andpoint.profile),Userservises.deleteProfile)
router.get('/:userId/profile',validation(generalValidation.validshareprofile),Userservises.shareProfile)


export default router