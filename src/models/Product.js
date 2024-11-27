const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    unitsInStock: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;