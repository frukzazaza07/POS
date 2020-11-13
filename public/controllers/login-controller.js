const login = (req, res, next) => {
    res.render("login", {
        data: {
            pageName: "login",
            message: "กรุณาล็อกอินเข้าสู่ระบบ",
            class: "alert alert-primary",
            loginStatus: false
        }
    });
};
module.exports.login = login;