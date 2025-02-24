import { productController } from '../controllers/product.controllers.js';
import { Router } from 'express'; 
import { uploader } from '../utils/multer.utils.js';

const router = Router();

// Rutas con el controller
router.get('/', productController.getAllProducts);
router.get('/:pid', productController.getProductById);
router.post('/', uploader.array('thumbnails', 5), productController.createProduct);
router.put('/:pid', uploader.array('thumbnails', 5), productController.updateProduct);  
router.delete('/:pid', productController.deleteProduct);

export { router as productRouter };
