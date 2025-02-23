import { UserService as UserServiceMongo } from "./mongodb/userdb.service.js";
import { CartService as CartServiceMongo } from "./mongodb/cartdb.service.js";
import { ProductService as ProductServiceMongo } from "./mongodb/productdb.service.js";

import { CONFIG } from "../config/config.js";

function getService(service = "") {
  switch (service) {
    case "mongodb":
      return {
        productService: new ProductServiceMongo(),
        userService: new UserServiceMongo(),
        cartService: new CartServiceMongo(),
      };
    default:
      return {
        productService: new ProductServiceMongo(),
        userService: new UserServiceMongo(),
        cartService: new CartServiceMongo(),
      };
  }
}

export const { productService, userService, cartService } = getService(CONFIG.PERSISTENCE);