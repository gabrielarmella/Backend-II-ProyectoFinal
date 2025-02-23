export class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(product => ({
            product: product.product,
            quantity: product.quantity
        }));
    }
}