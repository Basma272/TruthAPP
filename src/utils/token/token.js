import jwt from "jsonwebtoken"


export const generatetoken=({payload={},signature=process.env.TOKEN_SIGNATURE,options={}}={})=>{
    const token=jwt.sign(payload,signature,options)

    return token
}

  
export const verifyToken=({token="",signature=process.env.EMAIL_TOKEN_SIGNATURE}={})=>{
  const decodedd= jwt.verify(token,signature)
  return decodedd
}


