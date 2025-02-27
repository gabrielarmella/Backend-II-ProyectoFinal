import BaseRouter from "./base.router.js";

export default class HomeViewRouter extends BaseRouter {

    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#getTemplateHome(req, res));
        this.addGetRoute("/login", [], (req, res) => this.#getTemplateLogin(req, res));
        this.addGetRoute("/register", [], (req, res) => this.#getTemplateRegister(req, res));
        this.addGetRoute("current", [], (req, res) => this.#getTemplateHome(req, res));


        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

    
    #getTemplateHome(req, res) {
        res.status(200).render("home", { title: "Inicio" });
    }
        
    #getTemplateLogin(req, res) {
        res.status(200).render("login", { title: "Login" });
    }

    
    #getTemplateRegister(req, res) {
        res.status(200).render("register", { title: "Register" });
    }
}