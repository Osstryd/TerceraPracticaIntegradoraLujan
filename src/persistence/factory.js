import ProductDaoMongo from "./daos/mongodb/product.dao.js";
import UserDaoMongo from "./daos/mongodb/user.dao.js";
import CartDaoMongo from "./daos/mongodb/cart.dao.js"
import ProductDaoFS from "./daos/filesystem/product.dao.js";
import CartDaosFS from "./daos/filesystem/cart.dao.js";
import { connectToDatabase } from "../config/connection.js"

let prodDao;
let userDao;
let cartDao;
let persistence = process.argv[2]


switch (persistence) {
    case 'file':
        prodDao = new ProductDaoFS()
        cartDao = new CartDaosFS()
        console.log(persistence);
        break
    case 'mongo':
        await connectToDatabase()
        prodDao = new ProductDaoMongo()
        userDao = new UserDaoMongo()
        cartDao = new CartDaoMongo()
        console.log(persistence);
        break
    default:
        await connectToDatabase()
        prodDao = new ProductDaoMongo()
        userDao = new UserDaoMongo()
        cartDao = new CartDaoMongo()
        persistence = 'mongo'
        console.log(persistence);
        break
}

export default { prodDao, userDao, cartDao }