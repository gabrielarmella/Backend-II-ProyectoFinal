
import BaseRouter from "../base.router.js";
import TicketController from "../../controllers/ticket.controller.js";
import { ADMIN } from "../../constants/roles.constant.js";

export default class TicketRouter extends BaseRouter {
    #ticketController;

    constructor() {
        super();
        this.#ticketController = new TicketController();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [ADMIN], (req, res) => this.#ticketController.getAll(req, res));
        this.addGetRoute("/:id", [ADMIN], (req, res) => this.#ticketController.getById(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}