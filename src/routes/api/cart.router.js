import BaseRouter from "../base.router.js";
import CartController from "../../controllers/cart.controller.js";
import { ADMIN, USER } from "../../constants/roles.constant.js";

export default class CartRouter extends BaseRouter {
    #cartController;

    constructor() {
        super();
        this.#cartController = new CartController();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [USER], (req, res) => this.#cartController.getAll(req, res));
        this.addGetRoute("/:id", [USER], (req, res) => this.#cartController.getById(req, res));
        this.addPostRoute("/", [USER], (req, res) => this.#cartController.create(req, res));
        this.addPutRoute("/:id", [USER], (req, res) => this.#cartController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#cartController.delete(req, res));
        this.addPutRoute("/:cid/products/:pid", [USER], (req, res) => this.#cartController.addOneProduct(req, res));
        this.addDeleteRoute("/:cid/products/:pid", [USER], (req, res) => this.#cartController.removeOneProduct(req, res));
        this.addDeleteRoute("/:cid/products", [USER], (req, res) => this.#cartController.removeAllProducts(req, res));
        this.addPostRoute("/:cid/purchase", [USER], (req, res) => this.#cartController.processPurchase(req, res));

        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}