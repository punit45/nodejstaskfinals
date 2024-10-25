import express from "express";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET /products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.status(200).json(products); // Send products as response
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: "Error fetching products" }); // Send error response
  }
});

// GET /products/:id
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// POST /cart
router.post("/cart", async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ error: "Product ID and quantity are required" });
  }

  const cartItem = new Cart({ productId, quantity });
  try {
    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
});

// PUT /cart/:id
router.put("/cart/:id", async (req, res) => {
  const { quantity } = req.body;
  try {
    const updatedItem = await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart item" });
  }
});

// DELETE /cart/:id
router.delete("/cart/:id", async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Error removing cart item" });
  }
});

export default router;
