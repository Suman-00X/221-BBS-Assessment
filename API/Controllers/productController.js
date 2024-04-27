import productModel from '../Models/ProductModel';

// Add
const addProduct = async (req, res) => {
  try {
    const { name, description, price, brand, category, image, quantity } = req.body;
    const newProduct = await productModel.create({
      name,
      description,
      price,
      color,
      size,
      image,
      quantity,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, color, size, image, quantity } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      color,
      size,
      image,
      quantity,
    }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productModel.findByIdAndDelete(productId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { addProduct, updateProduct, deleteProduct };
