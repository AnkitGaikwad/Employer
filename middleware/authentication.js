const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.send('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.Email, password: payload.Password};
        next();
    } catch (err) {
        throw res.send('Authentication is invalid');
    }
};

module.exports = auth;