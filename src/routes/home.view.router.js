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

        router.use((error, req, res, next) => {
            res.redirect("/");
        });
    }

    
    #getTemplateHome(req, res) {
        res.status(200).render("home", { title: "Inicio" });
    }

}