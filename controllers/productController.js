const upload = require('../utils/fileUpload');
const Product = require('../models/productModel');
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
};

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
        });

        if (!product) {
            return res.status(404).json({ err: "No error found!" });
        }
    }
    catch (e) {
        return res.status(500).json({ err: err.message });
    }
};