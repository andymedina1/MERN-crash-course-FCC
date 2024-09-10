import express from 'express'
import { getProducts, createProducts, updateProduct, deleteProduct } from '../controllers/product.controllers.js'

export const router = express.Router()

router.get('/', getProducts)
router.post('/', createProducts)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
