
import BaseRouter from "../base.router.js";
import TicketController from "../../controllers/ticket.controller.js";
import { USER } from "../../constants/roles.constant.js";

export default class TicketRouter extends BaseRouter {
    #ticketController;

    constructor() {
        super();
        this.#ticketController = new TicketController();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [USER], (req, res) => this.#ticketController.getAll(req, res));
        this.addGetRoute("/:id", [USER], (req, res) => this.#ticketController.getById(req, res));


        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}