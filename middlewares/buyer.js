exports.isSeller = async (req, res, next) => {
    if (!req.user.dataValues.isSeller) {
        next();
    }
    else {
        return res.status(401).json({
            err: "You are not authorized to be a seller"
        })
    }
}