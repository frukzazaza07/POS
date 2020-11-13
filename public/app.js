const express = require("express");
const app = express();
const authRoute = require("./routes/auth"); //โหลดโมดูลจากไฟล์ auth ฟั่งชั่นที่ทำไว้ exports ไว้
const bodyParser = require("body-parser");
const homeController = require("./controllers/home-controller"); // ที่ไม่ใส่ .js เพราะ nodejs จะมอง default เป็นไฟล์ .js
const pageNotFoundController = require("./controllers/page-not-found-controller");
app.set("view engine", "ejs"); //ตั้งค่า webserver เป็น template ที่ใช้งานคือ ejs
app.set("views", "views"); //กำหนดให้ folder views เก็บไฟล์ที่ใช้แสดงผล
app.use(authRoute); //กำหนดให้ middleware สำหรับเว็บ server ในที่เลือกใช้ authRoute ซึ่งทำหน้าที่เป็นเราเตอร์ที่ใช้ตรวจสอบการเปลี่ยนแปลง URL ใช้เพื่อให้รู้ว่าต้องเรียกไปหน้าไหน
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", homeController); // "/" หมายความว่าถ้า user กรอก server ตามด้วย port 3000 จะเด้งเข้า home
app.get("*", pageNotFoundController) // * ถ้าuser กรอก server ตามด้วย port 3000 แล้วพยายาม หาหน้าตต่อไป / แล้วผิดจะเข้า pagenotfound
const mongoose = require("mongoose");
const port = process.env.port || 3000; //กำหนด port ที่จะเชื่อมต่อไปยัง server
mongoose.connect(
        //"mongodb+srv://root:025091863@Fluk.mongodb.net/POS?retryWrites=true", { useNewUrlParser: true, useCreateIndex: true }
        //"mongodb+srv://root:025091863@cluster0-p5xsf.mongodb.net/POS?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true }
        "mongodb+srv://root:025091863@cluster0-p5xsf.mongodb.net/POS?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true }

    )
    .then(() => {
        console.log("Database Connect!");
    })
    .catch(err => {
        console.log(err);
    });

app.listen(port, function() {
    console.log("Listening on port", port);
});