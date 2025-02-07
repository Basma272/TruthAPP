import usermodel from "../DB/model/user.model.js";
import {asyncHandling} from "../utils/errorHandling.js"
import {verifyToken} from "../utils/token/token.js"

export const roleType={
  user:"User",
  admin:"Admin",
  Hr:"Hr"
  }

export const authentication =  asyncHandling(
  async (req, res, next) => {
   const { authorization } = req.headers;
    // تقسيم الـ Bearer Token
    const [bearer, token] = authorization?.split(" ")||[];

    // تحقق من صحة الصيغة
    if (!bearer || !token) {
      return next(new Error("Password does not match",{cause:400}))

    }

    // اختيار التوقيع بناءً على الـ Bearer
    let TOKEN_SIGNATURE = undefined;
    switch (bearer) {
      case "admin":
        TOKEN_SIGNATURE= process.env.TOKEN_SIGNATURE_ADMIN; // تأكد أن الاسم صحيح في ملف .env
        break;
      case "user":
        TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE; // تأكد أن الاسم صحيح في ملف .env
        break;
      default:
    }

    // التحقق من التوكن
    if (!TOKEN_SIGNATURE) {
      return next(new Error("Server configuration error" ,{cause:500}))

    }

   // const decoded = jwt.verify(, signature);
    const decoded =verifyToken({token,signature:TOKEN_SIGNATURE})

    // التحقق من صحة البيانات المستخرجة
    if (!decoded?._id) {
      return next(new Error("Invalid token ID"  ,{cause:400}))

    }
  

    // البحث عن المستخدم
    const user = await usermodel.findById(decoded._id);

    if (!user) {
      return next(new Error( "Not a registered account" ,{cause:400}))

    }
    if(parseInt(user.changepasswordTime?.getTime()/1000) >= decoded.iat){
      
      return next(new error("expired credential",{cause:400}))
    }

//consol.log(parseInt(user.changepasswordTime?.getTime()/1000) >= decoded.iat)
    req.user = user;
    return next();
}
);
 

export const authorization =(accessroles=[])=>{
  return asyncHandling( async (req, res, next) => {
    if(!accessroles.includes(req.user.role)){
        return next(new Error( "Not auth account" ,{cause:403}))
 }

    return next();
} 

)

}
