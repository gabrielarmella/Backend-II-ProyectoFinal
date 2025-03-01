import CartRepository from "../repositories/cart.repository.js";
import ProductService from "./product.service.js";
import TicketService from "./ticket.service.js";

export default class CartService {
    #cartRepository;
    #productService;
    #ticketService;

    constructor() {
        this.#cartRepository = new CartRepository();
        this.#productService = new ProductService();
        this.#ticketService = new TicketService();
    }

    async findAll(params) {
        return await this.#cartRepository.findAll(params);
    }

    async findOneById(id) {
        return await this.#cartRepository.findOneById(id);
    }

    async insertOne(data) {
        return await this.#cartRepository.save(data);
    }

    async updateOneById(id, data) {
        const cart = await this.findOneById(id);
        const newValues = { ...cart, ...data };
        return await this.#cartRepository.save(newValues);
    }

    async deleteOneById(id) {
        return await this.#cartRepository.deleteOneById(id);
    }

    async addOneProduct(id, productId, quantity = 0) {
        const cartFound = await this.findOneById(id);

        const productIndex = cartFound.products.findIndex((item) => item.product.toString() === productId);

        if (productIndex >= 0) {
            cartFound.products[productIndex].quantity += quantity;
        } else {
            cartFound.products.push({ product: productId, quantity });
        }

        return await this.#cartRepository.save(cartFound);
    }


    async removeOneProduct(id, productId, quantity = 0) {
        const cartFound = await this.findOneById(id);

        const productIndex = cartFound.products.findIndex((item) => item.product.toString() === productId);
        if (productIndex < 0) {
            throw new Error(ERROR_NOT_FOUND_INDEX);
        }

        if (cartFound.products[productIndex].quantity > quantity) {
            cartFound.products[productIndex].quantity -= quantity;
        } else {
            cartFound.products.splice(productIndex, 1);
        }

        return await this.#cartRepository.save(cartFound);
    }

    async removeAllProducts(id) {
        const cartFound = await this.findOneById(id);
        cartFound.products = [];

        return await this.#cartRepository.save(cartFound);
    }

    async processPurchase(id, purchaser) {
        const cart = await this.findOneById(id);
        let amount = 0;
        const unprocessedProducts = [];

        for (const item of cart.products) {
            const product = await this.#productService.findOneById(item.product);

            if (product.stock >= item.quantity) {

                product.stock -= item.quantity;
                await this.#productService.updateOneById(product.id, product);


                amount += product.price * item.quantity;

                await this.removeOneProduct(id, product.id, item.quantity);
            } else {
                unprocessedProducts.push(item);
            }
        }

        if (amount > 0) {
            this.#ticketService.insertOne({ amount, purchaser });
        }

        return unprocessedProducts;
    }
}