import { productService } from "../services/index.service.js";

class ProductController {
  async getAllProducts(req, res) {
    const products = await productService.getAllProducts();
    req.logger.info("Productos obtenidos correctamente");
    res.send({status: "success", payload: products});
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado"
        });
      }

      res.json({ 
        status: "success", 
        payload: product 
      });
    } catch (error) {
      console.error('Error en getProductById:', error);
      res.status(500).json({
        status: "error",
        message: "Error interno del servidor"
      });
    }
  }
  async createProduct(req, res) {
      const {title, description, code, price, stock, category} = req.body;
      try{
        if(!title || !description || !code || !price || !stock || !category) {
          req.logger.error("Faltan datos obligatorios");
          return res.status(400).json({ status: "error", message: "Faltan datos obligatorios" });
        }
        const thumbnails = req.files.map(file => file.path);
        const product = {
          title,
          description, 
          code, 
          price, 
          stock, 
          category, 
          thumbnails
        };
        const result = await productService.createProduct(product);
        res.send({status: "success", payload: result});
      }catch(error){
        req.logger.error("Error al crear el producto");
        res.status(500).json({ status: "error", message: "Error al crear el producto" });
      }
    }
  async updateProduct(req, res) {
    const updateProductBody = req.body;
    const productId = req.params.id;
    const result = await productService.updateProduct(productId, updateProductBody);
    res.send({status: "success", payload: result});
  }
  async deleteProduct(req, res) {
      const productId = req.params.id;
      const result = await productService.deleteProduct(productId);
      res.send({status: "success", payload: result});
  } 
}

export const productController = new ProductController();