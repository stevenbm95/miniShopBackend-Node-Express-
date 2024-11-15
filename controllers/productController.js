const { Product } = require("../models");
const { connect } = require("../redis/configRerdis");
require("dotenv").config();

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      // const redis = await connect();
      const redis = await connect();
      const key = "products";
      const productsRedis = await redis.get(key);

      if (productsRedis) return JSON.parse(productsRedis);

      const products = await Product.findAll();
      await redis.set(key, JSON.stringify(products));

      return products;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { nameProduct, description, image, isActive, price, stock } =
        req.body;

      const product = await Product.create({
        nameProduct,
        description,
        image,
        isActive,
        price,
        stock,
      });

      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { nameProduct, description, image, isActive, price, stock } =
        req.body;
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      product.nameProduct = nameProduct || product.nameProduct;
      product.description = description || product.description;
      product.image = image || product.image;
      product.isActive = isActive || product.isActive;
      product.price = price || product.price;
      product.stock = stock || product.stock;

      await product.save();

      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      await product.destroy();

      res.status(200).json({ message: "Product deleted successfully", id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = ProductController;
