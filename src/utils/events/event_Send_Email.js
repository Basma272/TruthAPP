import { EventEmitter } from "node:events";
export const emailevent=new EventEmitter()
import { sendMail } from "../email.js";

emailevent.on("sendOTP",async({email},{OTP})=>{
  
  const subject="your verifiction code"
  const text =`your OTO is:${OTP}`
  const html=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 40px;
            text-align: center;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .verification-code {
            font-size: 50px;
            font-weight: bold;
            color:rgb(221, 96, 0);
            letter-spacing: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="verification-code">
        <h4>verification-code<h4/>
           ${OTP}
        </div>
    </div>
</body>
</html>`
  await sendMail({to:email,subject:subject,text:text,html:html})
})

