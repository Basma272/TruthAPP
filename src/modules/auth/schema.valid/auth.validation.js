import Joi from 'joi';
import {generalfields} from "../../../utils/General.validation/General.validation.js"

// Validation schema for signup using general validation functions
export const schemaSignup =Joi.object({
    username:generalfields.username.required(),
            email:generalfields.email.required(),
            password:generalfields.password.required(),
            confirmpassword:generalfields.confirmpassword.valid(Joi.ref('password')).required()
            .messages({'any.only':'Password must be amatch'}),
            gender:generalfields.gender.required(),
            phone:generalfields.phone.required() ,
            'accept-language':generalfields.acceptLanguage
    });
    

//  Validation schema for login using general validation functions
export const schemaLogin=Joi.object({
    email:generalfields.email.required(),
    password:generalfields.password.required(),
    });

//  Validation schema for user update using general validation functions
    export const valid_user_update=Joi.object().keys({
        username:generalfields.username,
            email:generalfields.email,
            confirmpassword:generalfields.confirmpassword.valid(Joi.ref('password'))
            .messages({'any.only':'Password must be amatch'}),
            gender:generalfields.gender,
            phone:generalfields.phone ,
            DOB:Joi.date().less('now'),
            'accept-language':generalfields.acceptLanguage
            
    }).required()


 //  Validation schema for pasword update using general validation functions
    export const valid_password_update=Joi.object().keys({
    password_old:generalfields.password,
    password:generalfields.password.not(Joi.ref('old_password')),
    confirmpassword:generalfields.confirmpassword.valid(Joi.ref('password'))
    .messages({'any.only':'Password must be amatch'}),
    }).required()


    export const validshareprofile=Joi.object().keys({
        userId:generalfields.id.required()
    
        })

    export const sendMessage=Joi.object().keys({
            message:Joi.string().pattern(new RegExp(/^[a-zA-Z\u0621-\u064Aء\s]{2,50000}$/)),
            recipientId:generalfields.id.required()
    
        })
    
    