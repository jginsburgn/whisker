const User = require('./models/user');

module.exports = async function(req, res, next) {
    if (req.session.user) {
        var user = await User.getUser(req.session.user);
        req.user = user;
    }
    next();
}