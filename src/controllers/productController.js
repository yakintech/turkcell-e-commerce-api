const products = require("../data/productsData");


const productController = {
    getAll: async (req, res) => {
        return res.json(products);
    },
    remove: async (req, res) => {
        const { id } = req.params;
        const product = products.find((product) => product.id == id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        products.splice(products.indexOf(product), 1);
        return res.json({ message: "Product removed" });
    }
}

module.exports = productController;