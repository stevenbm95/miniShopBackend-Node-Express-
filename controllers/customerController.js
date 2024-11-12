"use strict"

// const { where } = require('sequelize');""
const {Customer} = require('../models');
require("dotenv").config.apply();

const CustomerController = {
  create: async (req, res) => {
    try {
        const {email, name} = req.body;
        console.log(email, name);
        const customerExists = await Customer.findOne({where: {email}});
        if(customerExists){
          return res.status(400).json({ message: 'Email already exists' });
        }

        const customerSave = await Customer.create({ email, name});

        return res.status(201).json({message: "Customer created successfully", data: customerSave});
    

    } catch (error) {
      return res.status(500).json({message: "Error creating customer", error});
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const {name, email} = req.body.data;
      const {id} = req.params;
      const customer = await Customer.findByPk({where: {id}});
      if(!customer){
        return res.status(404).json({message: "Customer not found"});
      }

      customer.name = name || customer.name;
      customer.email = email || customer.email;
      
      await customer.save();
      // const customerUpdate = await Customer.update({name, email}, {where: {id}});
      return res.status(200).json({message: "Customer updated successfully", cunstumer: customer}); 
    } catch (error) {
      return res.status(500).json({message: "Error updating customer", error});
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const {id} = req.params;
      const customer = await Customer.findByPk({where: {id}});
      if(!customer){
        return res.status(404).json({message: "Customer not found"});
      }
      
      await customer.destroy();
      return res.status(200).json({message: "Customer deleted successfully", id}); 
    } catch (error) {
      return res.status(500).json({message: "Error deleting customer", error});
    }
  },

  getAllCustomers: async(req, res) => {
    try {
      const costumers = await Customer.findAll();
      return res.status(200).json({message: "Costumers retrieved successfully", costumers});
    } catch (error) {
      return res.status(500).json({message: "Error retrieving costumers", error});
    }
  }
};

module.exports = CustomerController