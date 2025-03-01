import BaseRouter from "../base.router.js";
import UserManager from "../../managers/user.manager.js";
import { ADMIN, USER } from "../../constants/roles.constant.js";

export default class UserRouter extends BaseRouter {
    #userManager;

    constructor() {
        super();
        this.#userManager = new UserManager();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [USER], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [USER], (req, res) => this.#getById(req, res));
        this.addGetRoute("/:id", [USER], (req, res) => this.#getOneByEmailAndPassword(req, res));
        this.addPostRoute("/", [], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [ADMIN], (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#delete(req, res));
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
    async #getAll(req, res) {
        try {
            const usersFound = await this.#userManager.getAll(req.query);
            res.sendSuccess200(usersFound);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #getById(req, res) {
        try {
            const userFound = await this.#userManager.getOneById(req.params.id);
            res.sendSuccess200(userFound);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #getOneByEmailAndPassword (email, password){
        try {
            const userFound = await this.#userManager.getOneByEmailAndPassword(email, password);
            return userFound;
        } catch (error) {
            throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
        }
    };
    async #create(req, res) {
        try {
            const userCreated = await this.#userManager.insertOne(req.body);
            res.sendSuccess201(userCreated);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #update(req, res) {
        try {
            const userUpdated = await this.#userManager.updateOneById(req.params.id, req.body);
            res.sendSuccess200(userUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }
    async #delete(req, res) {
        try {
            const userDeleted = await this.#userManager.deleteOneById(req.params.id);
            res.sendSuccess200(userDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}