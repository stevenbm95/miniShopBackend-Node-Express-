const { Product } = require("../models");
const connectRedis  = require("../redis/configRerdis");
require("dotenv").config();

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      // const redis = await connect();
      const redis = await connectRedis();
      const key = "products";
      const productsRedis = await redis.get(key);

      if (productsRedis) {
        console.log("Productos obtenidos desde Redis");
        return res.status(200).json(JSON.parse(productsRedis));
      }
      const products = await Product.findAll();

      await redis.set(key, JSON.stringify(products), { ex: 3600 });
      console.log("Productos sincronizados en Redis");
      return res.status(200).json(products);
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

      // Eliminar cache para forzar actualización
      const redis = await connectRedis();
      await redis.del("products");

      return res
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
      // Eliminar cache para forzar actualización
      const redis = await connectRedis();
      await redis.del("products");

      return res
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

      // Eliminar cache para forzar actualización
      const redis = await connectRedis();
      await redis.del("products");

      res.status(200).json({ message: "Product deleted successfully", id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = ProductController;
