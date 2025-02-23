import {ProductService as ProductServiceMemory} from "./memory/product.service.js";
import {UserService as UserServiceMemory} from "./memory/user.service.js";
import {CartService as CartServiceMemory} from "./memory/cart.service.js";

import {ProductService as ProductServiceMongo} from "./mongodb/productdb.service.js";
import {UserService as UserServiceMongo} from "./mongodb/userdb.service.js";
import {CartService as CartServiceMongo} from "./mongodb/cartdb.service.js";

import {CONFIG} from "../config/config.js";
import {SERVICES} from "../common/enums/services.js";

function getService(service = ""){
    switch(service){
        case SERVICES.MEMORY:
            return {
                productService: new ProductServiceMemory(),
                userService: new UserServiceMemory(),
                CartService: new CartServiceMemory(),
            };
        case SERVICES.MONGODB:
            return {
                productService: new ProductServiceMongo(),
                userService: new UserServiceMongo(),
                cartService: new CartServiceMongo(),
            };
        default:
            return {
                productService: new ProductServiceMemory(),
                userService: new UserServiceMemory(),
                cartService: new CartServiceMemory(),
            };
    }
}

export const {productService, userService, cartService} = getService(CONFIG.PERSISTANCE);