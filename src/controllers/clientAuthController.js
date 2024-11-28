const jwt = require('jsonwebtoken');



const clientAuthController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        if (email === 'user@mail.com' && password === '123') {
            const token = jwt.sign({ email }, 'clientJwtSecret');

            res.cookie('clienttoken', token, {
                httpOnly: true,
            });

            return res.json({ id: 1, email: "user@mail.com" });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    },
    check: async (req, res) => {
        return res.json({ email: "user@mail.com", id: 1 });
    },
    logout: async (req, res) => {
        res.clearCookie('clienttoken');
        return res.json({ message: 'Logged out' });
    }
}

module.exports = clientAuthController;