const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretKey";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });

      if(existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const user = await User.create({
        username,
        email,
        password,
      })

      const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      })
      
      res.status(201).json({ user,token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if(!user) {
        return res.status(401).json({ error: "Invalid user" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      })
      
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  },
  logOutUser: async (req, res) => {
    try {
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async(req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({users})      
    } catch (error) {
      res.status(500).json({error: error.massage})
    }
  },

  getUser: async(req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if(!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;
