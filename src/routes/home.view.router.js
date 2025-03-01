import BaseRouter from "./base.router.js";
import {checkAuth} from "../middlewares/auth.middlewares.js";

export default class HomeViewRouter extends BaseRouter {

    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#getTemplateHome(req, res));
        this.addGetRoute("/home", [], (req, res) => this.#getTemplateHome(req, res));
        this.addGetRoute("/login", [], (req, res) => this.#getTemplateLogin(req, res));
        this.addGetRoute("/register", [], (req, res) => this.#getTemplateRegister(req, res));
        this.addGetRoute("/current", [], (req, res) => this.#getTemplateCurrent(req, res));


        router.use((error, req, res, next) => {
            res.redirect("/");
        });
    }

    
    #getTemplateHome(req, res) {
        res.status(200).render("home", { title: "Inicio" });
    }
    #getTemplateLogin(req, res) {
        res.status(200).render("login", { title: "Iniciar sesión" });
    }
    #getTemplateRegister(req, res) {
        res.status(200).render("register", { title: "Registro" });
    }
    #getTemplateCurrent(req, res) {
        res.status(200).render("current", { title: "Perfil de Usuario" });
    }
}