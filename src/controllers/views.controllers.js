import { productService } from "../services/index.service.js";
import { cartService } from "../services/index.service.js";

class ViewsController {
  async renderHome(req, res) {
    const isSession = req.session && req.session.user ? true : false;
    res.render("index", {
      title: "Inicio",
      isSession,
      user: req.session ? req.session.user : null
    });
  }

  async renderLogin(req, res) {
    const isSession = req.session && req.session.user ? true : false;
    if (isSession) {
      return res.redirect("/");
    }
    res.render("login", { title: "Login" });
  }

  async renderRegister(req, res) {
    const isSession = req.session && req.session.user ? true : false;
    if (isSession) {
      return res.redirect("/");
    }
    res.render("register", { title: "Register" });
  }

  async renderProfile(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.render("profile", { title: "Profile", user: req.user });
  }

  async renderProducts(req, res) {
    const products = await productService.getAllProducts(req.query);
    res.render("index", {
      title: "Productos",
      style: "index.css",
      products: JSON.parse(JSON.stringify(products.docs)),
      prevLink: {
        exist: products.prevLink ? true : false,
        link: products.prevLink
      },
      nextLink: {
        exist: products.nextLink ? true : false,
        link: products.nextLink
      }
    });
  }

  async renderRealTimeProducts(req, res) {
    const products = await productService.getAllProducts(req.query);
    res.render("realTimeProducts", {
      title: "Productos",
      style: "index.css",
      products: JSON.parse(JSON.stringify(products.docs))
    });
  }

  async renderCart(req, res) {
    const response = await cartService.getProductsFromCartByID(req.params.cid);
    if (response.status === "error") {
      return res.render("notFound", {
        title: "Not Found",
        style: "index.css"
      });
    }
    res.render("cart", {
      title: "Carrito",
      style: "index.css",
      products: JSON.parse(JSON.stringify(response.products))
    });
  }
}

export const viewsController = new ViewsController();