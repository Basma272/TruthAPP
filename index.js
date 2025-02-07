import path from 'path'
import *as dotenv from "dotenv";
dotenv.config({path:path.resolve('./config/.env.dev')});
import express from 'express';      //create express app
import bootstrap from './src/app.controller.js';  // استيراد بوتستراب
const app = express();  // إنشاء تطبيق جديد باستخدام express
const port =process.env.port || 5000

bootstrap(app, express);  //تفعيل بوتستراب مع التطبيق

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
