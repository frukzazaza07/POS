var txtUsername = document.querySelector("#txtUsername");
var txtPassword = document.querySelector("#txtPassword");
var alertUsername = document.querySelector("#alertUsername");
var alertPassword = document.querySelector("#alertPassword");
var loadLogin = document.querySelector(".load-login");
var valid = false;

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}

function login() {
    strUsername = txtUsername.value;
    strPassword = txtPassword.value;
    statuslogin = true;
    checkEmpty();
    if (valid == true) {
        $.ajax({
            url: "php/login.php",
            type: "POST",
            data: {
                txtUsername: strUsername,
                txtPassword: strPassword
            },
            cache: false,
            beforeSend: function(data) {
                loadLogin.style.display = "initial";

            },
            success: function(dataResult) {
                setTimeout(function() {
                    loadLogin.style.display = "none";
                    var data = JSON.parse(dataResult); // เหมือน function แปลงค่าเป็นตัวเลขมั้ง เพื่อนนำมาใช้เปรียบเทียบที่ if else

                    if (data.statusCode == 200 && data.loginstatus == false) {
                        alertPassword.style.color = "red";
                        alertPassword.innerHTML = data.loginalert;
                        /* var getInput = data.billId;
                         localStorage.setItem("billId", getInput);
                         window.open("bill.html");
                         location.reload();*/
                        console.log(data.loginstatus);

                    } else if (data.statusCode == 200 && data.loginstatus == true) {
                        sessionStorage.clear();
                        if (data.usertype == "admin") {
                            sessionStorage.setItem("sessionFn", data.sessionFn);
                            sessionStorage.setItem("sessionLn", data.sessionLn);
                            sessionStorage.setItem("sessionP", data.sessionP);
                            sessionStorage.setItem("sessionU", data.sessionU);
                            sessionStorage.setItem("sessionT", data.usertype);
                            sessionStorage.setItem("sessionLogin", data.sessionLogin);
                            //console.log(data.usertype)
                            template = "<div class='header-grid-logo'>\
                                                    <span>LOGO</span>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-1' id='toggleRoportMain'>รายงาน</span>\
                                                    <div class='toggle-report-group' id='toggleReportGroup'>\
                                                    <div class='report-item' id='reportItem'><a href='#'>รายงานยอดขาย</a></div>\
                                                    <div class='report-item' id='reportItem'><a href='#'>รายงานโปรโมชั่น</a></div>\
                                                    <div class='report-item' id='reportItem'><a href='#'>รายงานการยกเลิกบิลใบเสร็จ</a></div>\
                                                    <div class='report-item' id='reportItem'><a href='#'>รายงานสินค้า</a></div>\
                                                    </div>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-2'>หน้าขาย</span>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-3'>หน้าเจ้าของร้าน</span>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-4'>ประวัติการขาย</span>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-6'>ช่วยเหลือ</span>\
                                                </div>\
                                                <div class='header-grid-item-1'>\
                                                    <span>ผู้ใช้: </span><span id='head-fullname'></span> <span class=''>ตำแหน่ง: </span><span id='head-position'></span>\
                                                    <p><span>เวลา: </span><span>10.50:20 </span><span id='head-logout' >ออกจากระบบ</span></p></div>";

                            localStorage.setItem("sendTemplate", template);
                            // localStorage.setItem("checkLogin", true);
                            location.href = "app.html";
                        } else if (data.usertype == "user") {
                            sessionStorage.setItem("sessionFn", data.sessionFn);
                            sessionStorage.setItem("sessionLn", data.sessionLn);
                            sessionStorage.setItem("sessionP", data.sessionP);
                            sessionStorage.setItem("sessionU", data.sessionU);
                            sessionStorage.setItem("sessionT", data.usertype);
                            sessionStorage.setItem("sessionLogin", data.sessionLogin);

                            template = "<div class='header-grid-logo'>\
                                                    <span>LOGO</span>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-2'>หน้าขาย</span>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-4'>ประวัติการขาย</span>\
                                                </div>\
                                                <div class='header-grid-item'>\
                                                    <span class='span-6'>ช่วยเหลือ</span>\
                                                </div>\
                                                <div class='header-grid-item-1'>\
                                                    <span>ผู้ใช้: </span><span id='head-fullname'></span> <span class=''>ตำแหน่ง: </span><span id='head-position'></span>\
                                                    <p><span>เวลา: </span><span>10.50:20 </span><span id='head-logout' >ออกจากระบบ</span></p></div>";
                            //localStorage.setItem("checkLogin", true);
                            localStorage.setItem("sendTemplate", template);
                            location.href = "app.html";
                            console.log(data.usertype);
                            console.log(data.sessionFn);
                            console.log(data.sessionLn);
                            console.log(data.sessionP);
                        }

                    } else {
                        alert(data.error);
                    }
                }, 1000);
            }
        });
        console.log("ถูก");
    }
}


function checkEmpty() {

    strUsername = txtUsername.value;
    strPassword = txtPassword.value;
    if (strUsername.trim() == "") {
        alertUsername.style.color = "red";
        alertUsername.innerHTML = "ระบุชื่อผู้ใช้"
        return valid = false;
    }
    if (strPassword.trim() == "") {
        alertPassword.style.color = "red";
        alertPassword.innerHTML = "ระบุรหัสผ่าน"
        return valid = false;
    }
    if (strUsername.trim() != "") {
        alertUsername.innerHTML = ""
        return valid = true
    }
    if (strPassword.trim() != "") {
        alertPassword.innerHTML = ""
        return valid = true
    }
}