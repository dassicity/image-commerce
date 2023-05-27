const upload = require('../utils/fileUpload');
const Product = require('../models/productModel');

const { stripeKey } = require('../config/credentials');
const Order = require('../models/orderModel');
const stripe = require('stripe')(stripeKey);

const { WebhookClient } = require('discord.js');

const webHook = new WebhookClient({
    url: "https://discord.com/api/webhooks/1112029550445084774/p9fEwLPPSMH-fRhrnwXw3KK0wvoUIQiBzQ1oddAzkIFi34hUOU-wleYvF_xzWS6c4gBr"
});

exports.postCreate = async (req, res, next) => {
    upload(req, res, async (err) => {

        if (err) {
            console.log("Coming in err", err);
            return res.status(500).send(err);
        }

        const { name, price, file } = req.body;

        if (!name | !price | !file) {
            return res
                .status(400)
                .json({ err: "All fields should be selected - name, price, file" });

        }

        if (Number.isNaN(req.body.price)) {
            return res.status(400).json({ err: "Price must be a number" });
        }

        let productDetails = {
            name,
            file,
            content: file.path
        };

        const product = await Product.create(productDetails);
        console.log("Created Product", createdProduct);

        return res.status(201).json({ message: "Product created" });

    })
}

exports.getAll = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json({ Products: products });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ err: err.message });
    }
}

exports.postBuyer = async (req, res, next) => {
    try {
        const product = await Product.finfOne({
            where: { id: req.params.productID }
        })?.dataValues;

        if (!product) {
            return res.status(404).json({ err: "No product found!" });
        }

        const orderDetails = {
            productID,
            buyerID: req.user.id
        }

        let paymentMethod = await stripe.paymentMethods.create({
            type: "card",
            card: {
                number: "4242424242424242",
                exp_month: 9,
                exp_year: 2023,
                cvc: "314",
            },
        });

        let paymentIntent = await stripe.paymentIntents.create({
            amount: product.price,
            currency: "inr",
            payment_method_types: ["card"],
            payment_method: paymentMethod.id,
            confirm: true,
        });

        if (paymentIntent) {
            const createOrder = await Order.create(orderDetails);

            webHook.send({
                content: `The order has been placed. Order details - ${createOrder}`,
                username: "image-commerce-bot"
            })

            return res.status(200).json({ createOrder });
        }
        else {
            return res.status(400).json({ err: "payment failed!" })
        }


    }
    catch (e) {
        return res.status(500).json({ err: err.message });
    }
}