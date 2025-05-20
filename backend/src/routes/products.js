/* Este archivo sitve para definir que metodos del crud va tener mi ruta(/api/products)*/

import express from "express";
import productsController from "../controllers/productsControllers.js";

const router = express.Router();

router.route("/").get(productsController.getProducts)
.post(productsController.insertProducts)

router.route("/:id")
.put(productsController.updateProducts)
.delete(productsController.deleteProducts)

export default router;

