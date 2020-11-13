const notFound = (req, res, next) => {
    res.render("page-not-found", { // ตรงนี้คือชื่อไฟล์ที่จะให้ run
        data: {
            pageName: "Error404",
            message: "Page Not Found",
            class: "alert alert-primary",
            loginStatus: false
        }
    });
};
module.exports = notFound;