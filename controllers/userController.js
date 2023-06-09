const { validateName, validateEmail, validatePassword } = require('../utils/validators');
const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - isSeller
 *       properties:
 *         id:
 *           type: INTEGER
 *           description: The auto-generated id of the user
 *         name:
 *           type: STRING
 *           description: The name of the user
 *         email:
 *           type: STRING
 *           description: The email of the user
 *         password:
 *           type: STRING
 *           description: The password of the user
 *         isSeller:
 *           type: BOOLEAN
 *           description: The role of the user
 *       example:
 *         name: Harsh
 *         email: hk@gmail.com
 *         password: Harsh@58
 *         isSeller: false
 */

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       403:
 *         description: There was already an existing user with the same email
 *       400:
 *         description: Validation failed for the name, email or password
 *       500:
 *         description: Some server error
 */

exports.postSignUp = async (req, res, next) => {
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

        const hashedPassword = await bcrypt.hash(password, 5);

        const user = {
            email,
            name,
            password: hashedPassword,
            isSeller
        };

        const createdUser = await User.create(user);
        // console.log(createdUser);

        return res.status(201).json({ message: `Welcome ${createdUser.name}!` });
    }
    catch (e) {
        return res.status(500).send(e);
    }

};

exports.postSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email.length === 0) {
            return res.status(400).json({ err: "Please provide email!" });
        }

        if (password.length === 0) {
            return res.status(400).json({ err: "Please provide password!" });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (!existingUser) {
            return res.status(404).json({ err: "User doesn't exist" });
        }

        const passwordMatched = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatched) {
            return res.status(400).json({ err: "Email or password doesn't match" });
        }

        const payload = { user: { id: existingUser.id } };  // Object with existing user id is created
        const bearerToken = jwt.sign(payload, "IMAGE SELLER TOKEN", {
            expiresIn: 3600000
        });
        // What bearerToken does is convert the payload object to a hashed string using the secret message and it can only be verified using that secret message

        res.cookie('tokenSign', bearerToken, { expire: new Date() + 360000 });

        res.status(200).json({
            bearerToken
        })
    }
    catch (e) {
        // console.log("Error >>>>>", e);
        return res.status(500).send(e);
    }
};

exports.getSignOut = async (req, res, next) => {
    try {
        res.clearCookie('tokenSign');
        return res.status(200).json({ message: "Cookie deleted!" })
    }
    catch (e) {
        return res.status(400).send(e);
    }
}