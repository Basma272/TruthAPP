import Joi from "joi";
import { genderType } from "../../DB/model/user.model.js";
import {validateobjectId} from "../../middleware/validation/validation.middlewhere.js"

//General Validation
export const generalfields = {
   username: Joi.string().min(2).max(20).required().messages({
    "string.empty": "User-name is required",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 2 characters long",
    "string.max": "Username must not exceed 22 characters",
    }),

    email: Joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 3,
    tlds: { allow: ["com", "edu"] },
    }),

    password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([a-zA-Z0-9]+)$/))
    .messages({
    "string.empty": "Password is required", // إذا كانت كلمة المرور فارغة
    "string.min": "Password must be at least 8 characters long", // إذا كانت كلمة المرور أقصر من 8
    "string.max": "Password must be less than or equal to 20 characters", // إذا كانت كلمة المرور أطول من 20
    "string.pattern.base":
    "Password must contain at least one lowercase letter, one uppercase letter, and one number", // إذا كانت كلمة المرور لا تحتوي على الحروف الكبيرة والصغيرة والأرقام
    }),

    confirmpassword: Joi.string(),
    phone: Joi.string().pattern(new RegExp(/^(002|1+2)?01[0125][0-9]{8}$/)),
    gender: Joi.string().valid(genderType.male, genderType.female),
    acceptLanguage: Joi.string().valid("en", "ar").default("en"),
    id:Joi.string().custom(validateobjectId),
  
};