import { Router } from "express";
import ProductController from '../controllers/product.controllers.js'
import { productValidator } from "../middlewares/productValidator.js";

const controller = new ProductController()

const router = Router()

// rutas

router
    .get('/', controller.getProducts)
    .get('/no-dto/:id', controller.getById)
    .get('/dto/:id', controller.getByIdDTO)
    .post('/', productValidator, controller.create)
    .post('/dto', controller.createProdDTO)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router