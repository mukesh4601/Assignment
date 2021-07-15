const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers)
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, keys.token.key, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next()
        });
    } else {
        res.sendStatus(401);
    }
}