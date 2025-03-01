import BaseRouter from "../base.router.js";
import CartManager from "../../managers/cart.manager.js";
import { ADMIN, USER } from "../../constants/roles.constant.js";

export default class CartRouter extends BaseRouter {
    #cartManager;

    constructor() {
        super();
        this.#cartManager = new CartManager();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [USER], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [USER], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [ ADMIN ], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [], (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#delete(req, res));
        this.addPutRoute("/:cid/ingredients/:pid", [USER], (req, res) => this.#addOneProduct(req, res));
        this.addDeleteRoute("/:cid/ingredients/:pid", [USER], (req, res) => this.#removeOneProduct(req, res));
        this.addDeleteRoute("/:cid/ingredients", [USER], (req, res) => this.#removeAllProducts(req, res));

        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
    async #getAll(req, res) {
        try {
            const cartsFound = await this.#cartManager.getAll(req.query);
            res.sendSuccess200(cartsFound);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #getById(req, res) {
        try {
            const cartFound = await this.#cartManager.getOneById(req.params.id);
            res.sendSuccess200(cartFound);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #create(req, res) {
        try {
            const cartCreated = await this.#cartManager.insertOne(req.body);
            res.sendSuccess201(cartCreated);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #update(req, res) {
        try {
            const cartUpdated = await this.#cartManager.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cartUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #delete(req, res) {
        try {
            const cartDeleted = await this.#cartManager.deleteOneById(req.params.id);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #addOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cartUpdated = await this.#cartManager.addOneProduct(cid, pid, quantity ?? 1);
            res.sendSuccess200(cartUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #removeOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cartDeleted = await this.#cartManager.removeOneProduct(cid, pid, 1);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #removeAllProducts(req, res) {
        try {
            const cartDeleted = await this.#cartManager.removeAllProducts(req.params.cid);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}