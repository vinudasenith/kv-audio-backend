import express from "express";
import { addProduct, getProduct, updateProduct, deleteProduct, getProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", addProduct)
productRouter.get("/", getProducts)
productRouter.put("/:key", updateProduct)
productRouter.delete("/:key", deleteProduct)
productRouter.get("/:key", getProduct)

export default productRouter;