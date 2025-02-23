export class CartService {
    constructor() {
        this.carts = [];
    }

    async getAllCarts() {
        return this.carts;
    }

    async getCartById(id) {
        return this.carts.find((cart) => cart.id === id);
    }

    async createCart({ userId, products }) {
        const cart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            userId,
            products,
        };
        this.carts.push(cart);
        return cart;
    }

    async addProductsToCart(cartId, products) {
        const cart = this.carts.find((cart) => cart.id === cartId);
        if (cart === -1) {
            throw new Error('Cart not found');
        }
        this.carts[cart].products.push(...products);
        return cart;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = this.carts.find((cart) => cart.id === cartId);
        if (cart === -1) {
            throw new Error('Cart not found');
        }
        cart.products = cart.products.filter((product) => product.id !== productId);
        return cart;
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = this.carts.find((cart) => cart.id === cartId);
        if (cart === -1) {
            throw new Error('Cart not found');
        }
        const product = cart.products.find((product) => product.id === productId);
        if (product === -1) {
            throw new Error('Product not found');
        }
        product.quantity = quantity;
        return cart;
    }

    async clearCart(cartId) {
        const cart = this.carts.find((cart) => cart.id === cartId);
        if (cart === -1) {
            throw new Error('Cart not found');
        }
        cart.products = [];
        return cart;
    }

}