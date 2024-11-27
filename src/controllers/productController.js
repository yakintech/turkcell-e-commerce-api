const Product = require("../models/Product");


const productController = {
    getAll: async (req, res) => {
        let result = await Product.find();
        return res.json(result);
    },
    remove: async (req, res) => {
        const { id } = req.params;
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.findByIdAndDelete(id);
        return res.json({ message: "Product removed" });
    },
    add: async (req, res) => {
        const { name, unitPrice, unitsInStock } = req.body;
        if (!name || !unitPrice) {
            return res.status(400).json({ message: "Name and price are required" });
        }
        
        const newProduct = new Product({
            name,
            unitPrice,
            unitsInStock,
        });

        await newProduct.save();

        return res.json(newProduct);
    }
}

module.exports = productController;