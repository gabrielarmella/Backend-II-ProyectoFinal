import BaseRouter from "../base.router.js";
import CartController from "../../controllers/cart.controller.js";
import { ADMIN, ADMIN } from "../../constants/roles.constant.js";

export default class CartRouter extends BaseRouter {
    #cartController;

    constructor() {
        super();
        this.#cartController = new CartController();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [ADMIN], (req, res) => this.#cartController.getAll(req, res));
        this.addGetRoute("/:id", [ADMIN], (req, res) => this.#cartController.getById(req, res));
        this.addPostRoute("/", [ADMIN], (req, res) => this.#cartController.create(req, res));
        this.addPutRoute("/:id", [ADMIN], (req, res) => this.#cartController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#cartController.delete(req, res));
        this.addPutRoute("/:cid/products/:pid", [ADMIN], (req, res) => this.#cartController.addOneProduct(req, res));
        this.addDeleteRoute("/:cid/products/:pid", [ADMIN], (req, res) => this.#cartController.removeOneProduct(req, res));
        this.addDeleteRoute("/:cid/products", [ADMIN], (req, res) => this.#cartController.removeAllProducts(req, res));
        this.addPostRoute("/:cid/purchase", [ADMIN], (req, res) => this.#cartController.processPurchase(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}