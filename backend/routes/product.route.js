import express from "express";
import mongoose from "mongoose";
import Product from '../models/product.model.js';
import { createProduct, deleteProduct, getProducts, updateProducts } from "../controllers/product.controller.js";


const router = express.Router();

router.get("/",getProducts);
router.post("/",createProduct);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProduct); 


export default router;