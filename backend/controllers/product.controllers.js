import mongoose from 'mongoose'
import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.error('Error in fetching products:', error.message)
    res.status(500).json({ succes: false, message: 'Server error' })
  }
}

export const createProducts = async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' })
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    console.error('Error in Create product:', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' })
  }

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Product deleted' })
  } catch (error) {
    console.error('Error in fetching products:', error.message)
    res.status(500).json({ status: false, message: 'Server error' })
  }
}