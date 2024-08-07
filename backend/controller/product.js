const Product = require("../model/product");

const createProduct = async (req, res) => {
   console.log("req product",req.body);
   
   
  try {
    const { name, price, quantity  } = req.body;
    const user = req.user?.id;
     

    if (!name || !price || !quantity || !user) {
      return res.status(400).json({message: "All fields are required: name, price, quantity, user"});
    }

    if (!req.files || req.files.length < 1 || req.files.length > 6) {
      return res
        .status(400)
        .json({ message: "You must upload between 1 and 6 pictures." });
    }

    const pictures = req.files.map((file) => file.path);

    const product = new Product({
      name,
      price,
      quantity,
      pictures,
      user,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    console.error("Error saving product to database:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = createProduct;
