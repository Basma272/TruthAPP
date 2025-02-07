import { Router } from "express"
import usermodel from "../../DB/model/user.model.js"
import {emailevent}from "../../utils/events/event_Send_Email.js"
import {asyncHandling}from "../../utils/errorHandling.js"
import {sucssesResponse} from "../../utils/response/success.response.js"
import {generatetoken ,verifyToken } from "../../utils/token/token.js";
import { validation} from "../../middleware/validation/validation.middlewhere.js"
import {schemaLogin, schemaSignup} from "./schema.valid/auth.validation.js"
import * as generalhash from "../../utils/hashing/hashing.js"

const router = Router();

router.post("/signup", validation(schemaSignup), asyncHandling(async (req, res, next) => {
    const { username, email, password, confirmpassword, phone, gender } = req.body;

    // التحقق من تطابق كلمة المرور وكلمة المرور المؤكدة
    if (password !== confirmpassword) {
        return next(new Error("Password does not match", { cause: 404 }));
    }

    // التحقق من وجود البريد الإلكتروني مسبقًا
    const checkemail = await usermodel.findOne({ email });
    if (checkemail) {
        return next(new Error("Email already exists", { cause: 409 }));
    }

    // تشفير كلمة المرور وتشفير رقم الهاتف
    const hashpass = generalhash.generatbcrypt({ password: password, saltRounds: parseInt(process.env.SALT_ROUND) });
    const encryptedPhone = generalhash.generatencryption({
        data: phone,
        secretKey: process.env.ENCRYPTION_SIGNATURE
    });

    // توليد OTP عشوائي
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    // إنشاء المستخدم الجديد
    const User = await usermodel.create({
        username,
        email,
        password: hashpass,
        phone: encryptedPhone,
        OTP, // تخزين OTP في قاعدة البيانات
    });

    // إنشاء التوكن للبريد الإلكتروني
    const token = generatetoken({
        payload: { email },
        signature: process.env.EMAIL_TOKEN_SIGNATURE
    });

    // إرسال OTP عبر البريد الإلكتروني
emailevent.emit("sendOTP",  {email}, {OTP});

    // إرجاع المعرف والتوكن فقط، بدون البيانات الحساسة
    return sucssesResponse({
        message: "Account created successfully",
        status: 201,
        data: { userId: User._id, token },
        res: res
    });
}));


router.post("/confirmemail", asyncHandling(async (req, res, next) => {
    const token = req.headers.authorization;
    const { OTP } = req.body;


    // التحقق من وجود التوكن
    if (!token) {
        return next(new Error("token is undefined", { cause: 404 }));
    }

    // فك تشفير التوكن
    const decoded = verifyToken({ token: token, signature: process.env.EMAIL_TOKEN_SIGNATURE });

    if (!decoded) {
        return next(new Error("decoded is undefined", { cause: 404 }));
    }

    // التحقق من وجود OTP في الـ request
    if (!OTP) {
        return next(new Error("OTP is undefined", { cause: 404 }));
    }

    // استرجاع المستخدم من قاعدة البيانات باستخدام البريد الإلكتروني المستخرج من التوكن
    const user = await usermodel.findOne({ email: decoded.email });

    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }

    // تحقق من أن الـ OTP موجود داخل الـ user
    if (!user.OTP) {
        return next(new Error("OTP is not found in user", { cause: 404 }));
    }

    // التحقق إذا كان الـ OTP المرسل يطابق الـ OTP المخزن في قاعدة البيانات
    if (OTP === user.OTP) {
        // إذا كان الـ OTP صحيحًا، تحديث حالة تأكيد البريد الإلكتروني
        const updatedUser = await usermodel.findOneAndUpdate(
            { email: decoded.email },
            { confirmEmail: true },
            { new: true }
        );

        // إرجاع الاستجابة بعد التأكيد
        return sucssesResponse({
            message: "Email confirmed successfully",
            status: 200,
            data: { user: updatedUser },
            res
        });
    } else {
        return next(new Error("OTP does not match", { cause: 400 }));
    }
}));



router.post("/login", validation(schemaLogin), asyncHandling(async (req, res, next) => {
    const { email, password } = req.body;

    // التحقق من وجود المستخدم
    const user = await usermodel.findOne({ email });
    if (!user) {
        return next(new Error("Account not found", { cause: 401 }));
    }

    // التحقق من حالة تأكيد البريد الإلكتروني
    if (!user.confirmEmail) {
        return next(new Error("Please confirm email", { cause: 404 }));
    }

    // مقارنة كلمة المرور المدخلة بكلمة المرور المخزنة
    const matchpassword =generalhash.comparehash({plainText:password,hashValue:user.password})
    if (!matchpassword) {
        console.log('Password comparison failed');
        return next(new Error("Incorrect password", { cause: 401 }));
    }
   
    const token = generatetoken({
        payload: { _id: user._id, islogged: true },
        signature: user.role == 'Admin' ? process.env.TOKEN_SIGNATURE_ADMIN : process.env.TOKEN_SIGNATURE
    });

    // إرسال الرد
    return sucssesResponse({
        message: "Login successful",
        status: 200,
        data: { token },
        res: res
    });
}));


export default router;
