import BaseRouter from "../base.router.js";
import SessionController from "../../controllers/session.controller.js";
import { generateToken } from "../../middlewares/auth.middlewares.js";
import { USER } from "../../constants/roles.constant.js";

export default class SessionRouter extends BaseRouter {
    #sessionController;

    constructor() {
        super();
        this.#sessionController = new SessionController();
    }

    initialize() {
        const router = this.getRouter();

      
        this.addPostRoute("/login", [], generateToken, (req, res) => this.#sessionController.login(req, res));
        this.addGetRoute("/current", [USER], (req, res) => this.#sessionController.getCurrentUser(req, res));


        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}