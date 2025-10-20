const Product = require("../models/Product");


exports.createProduct = async(req, res) => {
    try {
        let product;
        product = new Product(req.body);
        await product.save();
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.getProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.updateProduct = async(req, res) => {
    try {
        const { name, category, location, price } = req.body;
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        product.name = name;
        product.category = category;
        product.location = location;
        product.price = price;
        product = await Product.findByIdAndUpdate({ _id: req.params.id }, product
, { new: true });
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.getProductById = async(req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.deleteProduct = async(req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        await Product.findByIdAndDelete({ _id: req.params.id });
        res.json({ msg: 'Producto eliminado con exito' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};