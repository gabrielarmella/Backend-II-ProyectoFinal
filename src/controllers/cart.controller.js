import CartService from "../services/cart.service.js";

export default class CartController {
    #cartService;

    constructor() {
        this.#cartService = new CartService();
    }
    async getAll(req, res) {
        try {
            const carts = await this.#cartService.findAll(req.query);
            res.sendSuccess200(carts);
        } catch (error) {
            res.sendError(error);
        }
    }

    async getById(req, res) {
        try {
            const cart = await this.#cartService.findOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res) {
        try {
            const cart = await this.#cartService.insertOne(req.body);
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }


    async update(req, res) {
        try {
            const cart = await this.#cartService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res) {
        try {
            const cart = await this.#cartService.deleteOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }


    async addOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await this.#cartService.addOneProduct(cid, pid, quantity ?? 1);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }


    async removeOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await this.#cartService.removeOneProduct(cid, pid, 1);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }


    async removeAllProducts(req, res) {
        try {
            const cart = await this.#cartService.removeAllProducts(req.params.cid);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }


    async processPurchase(req, res) {
        try {
            const cart = await this.#cartService.processPurchase(req.params.cid, req.email);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }
}