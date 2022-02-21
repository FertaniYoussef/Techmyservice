const jwt = require('jsonwebtoken')

module.exports =function(req, res, next) {
    const tokenhead = req.header('auth-token');
    if (!tokenhead) return res.status(401).send('DENIED ACCESS')
    else {
        try {
            const verified = jwt.verify(tokenhead, process.env.TOKEN_SECRET)
            req.user = verified
            next()
        } catch (err) {
            res.status(400).send('Invalid Token')
        }
    }
}