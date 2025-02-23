import { productService } from "../services/index.service.js";

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts(req.query);
      res.render("products", {
        title: "Productos",
        products: products.docs,
      });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }
  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json({ status: "success", payload: product });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }
  async createProduct(req, res) {
    if (req.files) {
      req.body.thumbnails = [];
      req.files.forEach((file) => {
        req.body.thumbnails.push(`/imagenes/${file.filename}`);
      });
    }

    try {
      const result = await productService.createProduct(req.body);
      res.send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }
  async updateProduct(req, res) {
    if (req.files) {
      req.body.thumbnails = [];
      req.files.forEach((file) => {
        req.body.thumbnails.push(`/imagenes/${file.filename}`);
      });
    }
    try {
        const result = await productService.updateProduct(req.params.id, req.body);
        res.send({
          status: "success",
          payload: result,
        });
      } catch (error) {
        res.status(400).send({
          status: "error",
          message: error.message,
        });
      }
    }
    async deleteProduct(req, res) {
        try {
          const result = await productService.deleteProduct(req.params.id);
          res.send({
            status: "success",
            payload: result,
          });
        } catch (error) {
          res.status(400).send({
            status: "error",
            message: error.message,
          });
        }
      }
}

export const productController = new ProductController();