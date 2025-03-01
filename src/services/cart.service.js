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

    // Obtener carritos aplicando filtros
    async findAll(params) {
        return await this.#cartRepository.findAll(params);
    }

    // Obtener un carrito por su ID
    async findOneById(id) {
        return await this.#cartRepository.findOneById(id);
    }

    // Crear un carrito
    async insertOne(data) {
        return await this.#cartRepository.save(data);
    }

    // Actualizar un carrito existente
    async updateOneById(id, data) {
        const cart = await this.findOneById(id);
        const newValues = { ...cart, ...data };
        return await this.#cartRepository.save(newValues);
    }

    // Eliminar un carrito por su ID
    async deleteOneById(id) {
        return await this.#cartRepository.deleteOneById(id);
    }

    // Agrega un producto a un carrito o incrementar la cantidad de un producto existente
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

    // Elimina un producto de un carrito o decrementa la cantidad de un producto existente
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

    // Elimina todos los productos de un carrito por su ID
    async removeAllProducts(id) {
        const cartFound = await this.findOneById(id);
        cartFound.products = [];

        return await this.#cartRepository.save(cartFound);
    }

    // Procesa la compra de un carrito específico
    async processPurchase(id, purchaser) {
        const cart = await this.findOneById(id);
        let amount = 0;
        const unprocessedProducts = [];

        for (const item of cart.products) {
            const product = await this.#productService.findOneById(item.product);

            if (product.stock >= item.quantity) {
                // Actualiza el stock del producto
                product.stock -= item.quantity;
                await this.#productService.updateOneById(product.id, product);

                // Acumula el resultado de multiplicar el precio por la cantidad
                amount += product.price * item.quantity;

                // Quita el producto del carrito
                await this.removeOneProduct(id, product.id, item.quantity);
            } else {
                unprocessedProducts.push(item);
            }
        }

        // Crea el ticket. Esta validación impide que se inserten ticket
        // en donde no se procesaron productos por fal de stock.
        if (amount > 0) {
            this.#ticketService.insertOne({ amount, purchaser });
        }

        return unprocessedProducts;
    }
}