const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth (req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Acces denied. No token given');

    try{
        req.user = jwt.verify(token, config.get('TOKEN_PASSWORD'));
        next()
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}