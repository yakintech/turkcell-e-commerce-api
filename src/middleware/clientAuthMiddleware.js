const jwt = require('jsonwebtoken');

const clientAuthMiddleware = async (req, res, next) => {
    const token = req.cookies.clienttoken;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = jwt.verify(token, 'clientJwtSecret');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = clientAuthMiddleware;