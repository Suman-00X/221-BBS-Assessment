import productModel from '../Models/ProductModel.js';

// Add
const addProduct = async (req, res) => {
  try {
    const { name, description, price, color, size, image, quantity } = req.body;

    console.log("I am addProduct-controller")
    console.log(name, description, price, color, size, image, quantity )

    const newProduct = await productModel.create({
      name,
      description,
      price,
      color,
      size,
      image,
      quantity,
    });

    console.log(newProduct)

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};

// Update
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log("I am updateProduct-controller")

    const { name, description, price, color, size, image, quantity } = req.body;

    console.log(name, description, price, color, size, image, quantity )

    const updatedProduct = await productModel.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      color,
      size,
      image,
      quantity,
    }, { new: true });

    console.log(updateProduct)

    res.json(updatedProduct);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};

// Delete
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log("I am deleteProduct-controller")

    await productModel.findByIdAndDelete(productId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};

export { addProduct, updateProduct, deleteProduct };
