import { UserService as UserServiceMongo } from "./mongodb/user.service.js";
import { CartService as CartServiceMongo } from "./mongodb/cart.service.js";
import { ProductService as ProductServiceMongo } from "./mongodb/product.service.js";

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