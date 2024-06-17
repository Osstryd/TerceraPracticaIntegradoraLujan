import Services from "./class.services.js";

// import ProductDaoFS from "../persistence/daos/filesystem/product.dao.js";
// const prodDao = new ProductDaoFS();

// import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongo();

import persistence from '../persistence/factory.js'
const { prodDao } = persistence
import ProductRepository from "../persistence/repository/product.repository.js";
const prodRepository = new ProductRepository();

export default class ProductServices extends Services {
    constructor() {
        super(prodDao);
    }

    async getProducts(queryParams) {
        try {
            const response = await prodDao.getProducts(queryParams);
            if (!response) return false;
            else return response
        } catch (error) {
            console.log(error);
        }
    }

    async getByIdDTO(id) {
        try {
            const prod = await prodRepository.getByIdDTO(id);
            if (!prod) return false;
            else return prod;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProdDTO(obj) {
        try {
            const newItem = await prodRepository.createProdDTO(obj);
            if (!newItem) return false;
            else return newItem;
        } catch (error) {
            console.log(error);
        }
    }

}

