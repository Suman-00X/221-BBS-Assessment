import productModel from '../Models/ProductModel.js';
import orderModel from '../Models/OrderModel.js';

// Get all products
const getAllHoodies = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Get one hoodie
const getOneHoodie = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Place order
const orderHoodie = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user._id;

    const order = await orderModel.create({ user: userId, products });

    for (const item of products) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }
      if (item.quantity > product.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
      }
      product.quantity -= item.quantity;
      await product.save();
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { getAllHoodies, getOneHoodie, orderHoodie };