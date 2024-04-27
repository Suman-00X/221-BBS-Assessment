import productModel from '../Models/ProductModel.js';
import orderModel from '../Models/OrderModel.js';

// Get all products
const getAllHoodies = async (req, res) => {
  try {
    console.log("I am getAllHoodie-conttroller")
    const products = await productModel.find();
    console.log(products)
    res.json(products);
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message);
  }
};


// Get one hoodie
const getOneHoodie = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("I am getOneHoodie-conttroller")

    const product = await productModel.findById(productId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message);
  }
};


// Place order
const orderHoodie = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user._id;

    console.log("I am orderHoodie-conttroller")

    const order = await orderModel.create({ user: userId, products });
    console.log(order)

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


    console.log(order)

    res.status(201).json(order);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};

export { getAllHoodies, getOneHoodie, orderHoodie };