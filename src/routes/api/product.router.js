import BaseRouter from "../base.router.js";
import ProductController from "../../controllers/product.controller.js";
import { ADMIN, ADMIN } from "../../constants/roles.constant.js";
import uploader from "../../utils/uploader.js";

export default class ProductRouter extends BaseRouter {
    #productController;

    constructor() {
        super();
        this.#productController = new ProductController();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [ADMIN], (req, res) => this.#productController.getAll(req, res));
        this.addGetRoute("/:id", [ADMIN], (req, res) => this.#productController.getById(req, res));
        this.addPostRoute("/", [ADMIN], uploader.single("file"), (req, res) => this.#productController.create(req, res));
        this.addPutRoute("/:id", [ADMIN], uploader.single("file"), (req, res) => this.#productController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#productController.delete(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}