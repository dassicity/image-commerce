const { validateName, validateEmail, validatePassword } = require('../utils/validators');
const User = require('../models/userModel');

const bcrypt = require('bcrypt');

exports.postSignup = async (req, res, next) => {
    try {

        const { name, email, password, isSeller } = req.body;

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(403).json({ err: "User already exists" });
        }

        if (!validateName(name)) {
            return res.status(400).json({ err: "Name is invalid!" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ err: "Email is invalid!" });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ err: "Password is invalid!" });
        }

        const hashedPassword = await bcrypt.hash(password, { saltOrRounds: 4 });

        const user = {
            email,
            name,
            password: hashedPassword,
            isSeller
        };

        const createdUser = await User.create(user);

        return res.status(201).json({ message: `Welcome ${createdUser}!` });
    }
    catch (e) {
        return res.status(500).send(e);
    }
}