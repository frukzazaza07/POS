const home = (req, res, next) => {
    res.render("home", {
        data: {
            pageName: "Home",
            message: "Home Page",
            class: "alert alert-primary",
            loginStatus: false
        }
    });
};
module.exports = home;