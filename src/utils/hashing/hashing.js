import *as bcrypt from "bcrypt"
import CryptoJS from "crypto-js";

  //Generate a bcrypt hash of the password with a specified number of salt rounds
export const generatbcrypt = ({ password = "", saltRounds=process.env.SALT_ROUND}={}) => {
    return bcrypt.hashSync(password, saltRounds);
};

// Compare plain text with hash value 
export const comparehash =({plainText="",hashValue=""})=>{
  const match= bcrypt.compareSync(plainText,hashValue)
  return match
}


   // Encrypt the data using AES algorithm and a secret key (signature) 
export const generatencryption= ({data="", secretKey=process.env.ENCRYPTION_SIGNATURE}={})=>{
const encryption=CryptoJS.AES.encrypt(data,secretKey).toString()
return encryption
}

   //Decrypt the encrypted data using the AES algorithm and the secret key
export const generatdecryption= ({encryptedData = "", secretKey=process.env.ENCRYPTION_SIGNATURE}={})=>{
const decryptedMessage =CryptoJS.AES.decrypt(encryptedData,secretKey).toString()
return decryptedMessage}

