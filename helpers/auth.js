module.exports.checkAuth = function (req, res, next) {
    const userid = req.session.userid;
    if (!userid) {
        res.redirect("/login");
    }
    next();
}