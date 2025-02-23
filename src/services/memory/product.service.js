export class ProductService {
  constructor() {
    this.products = [];
  }

  async getAll(){
    return this.products;
  }

  async getById(id){
    return this.products.find((product) => product.id === id);
  }
  async create({title, description, code, price, stock, category, thumbnails}){
    const product = {
      id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };
    this.products.push(product);
    return product;
  }
}