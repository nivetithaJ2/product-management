const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET: Display all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products"
        });
    }
});

// POST: Add a new product
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({
            message: "Product added successfully",
            product: product
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding product"
        });
    }
});

// PUT: Update a product
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully",
            product: product
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating product"
        });
    }
});

// DELETE: Remove a product
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting product"
        });
    }
});

module.exports = router;