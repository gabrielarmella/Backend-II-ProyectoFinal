import { Router } from 'express';
import passport from 'passport';
import { productDBManager } from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';

const  viewsRouter = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

viewsRouter.get("/", (req, res) => {
    const isSession = req.session && req.session.user ? true : false;
    res.render("index", {
      title: "Inicio",
      isSession,
      user: req.session ? req.session.user : null
    });
  });
  
  viewsRouter.get("/login", (req, res) => {
    const isSession = req.session && req.session.user ? true : false;
  
    if (isSession) {
      return res.redirect("/");
    }
  
    res.render("login", { title: "Login" });
  });
  
  viewsRouter.get("/register", (req, res) => {
    const isSession = req.session && req.session.user ? true : false;
  
    if (isSession) {
      return res.redirect("/");
    }
  
    res.render("register", { title: "Register" });
  });
  
  viewsRouter.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.render('profile', { title: 'Profile', user: req.user });
  });

viewsRouter.get('/products', async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);

    res.render(
        'index',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs)),
            prevLink: {
                exist: products.prevLink ? true : false,
                link: products.prevLink
            },
            nextLink: {
                exist: products.nextLink ? true : false,
                link: products.nextLink
            }
        }
    )
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);
    res.render(
        'realTimeProducts',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs))
        }
    )
});

viewsRouter.get('/cart/:cid', async (req, res) => {
    const response = await CartService.getProductsFromCartByID(req.params.cid);

    if (response.status === 'error') {
        return res.render(
            'notFound',
            {
                title: 'Not Found',
                style: 'index.css'
            }
        );
    }

    res.render(
        'cart',
        {
            title: 'Carrito',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(response.products))
        }
    )
});

export default viewsRouter;