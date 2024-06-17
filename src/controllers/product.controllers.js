import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
const productService = new ProductService();
import { createResponse } from "../utils.js";

export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    }
    async getProducts(req, res, next) {
        try {
            const { page = 1, limit = 10, sort, query, status } = req.query;

            const queryParams = {
                page,
                limit,
                sort,
                query,
                status
            };

            const response = await productService.getProducts(queryParams);
            const prevLink = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
            const nextLink = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
            res.status(200).json({
                status: 'success',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink,
                nextLink,
            });
        } catch (error) {
            next(error.message);
        }
    };

    async getByIdDTO(req, res, next) {
        try {
            const { id } = req.params;
            const prod = await productService.getByIdDTO(id);
            if (!prod)
                createResponse(res, 404, { method: "create", error: "getById failed" });
            else createResponse(res, 200, prod);
        } catch (error) {
            next(error.message);
        }
    };

    async createProdDTO(req, res, next) {
        try {
            const newItem = await productService.createProdDTO(req.body);
            if (!newItem)
                createResponse(res, 404, {
                    method: "create",
                    error: "Validation error!",
                });
            else createResponse(res, 200, newItem);
        } catch (error) {
            next(error.message);
        }
    };
}



