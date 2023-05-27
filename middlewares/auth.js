const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = res.headers.authorization; // Bearer TOKEN

        if (!authHeader) {
            return res.status(401).json({ err: "authorization header not found!" });
        }

        const authorizationToken = authHeader.split(" ")[1];

        if (!authorizationToken) {
            return res.status(401).json({ err: "authorization token not found!" });
        }

        const decodedUser = await jwt.verify(authorizationToken, "IMAGE SELLER TOKEN");

        const user = User.findOne({
            where: { id: decodedUser.id }
        });

        if (!user) {
            return res.status(404).json({ err: "user not found!" })
        }

        req.user = user.dataValues;
        next();
    }
    catch (e) {
        return res.status(500).send(e);
    }
}

module.exports = { isAuthenticated };