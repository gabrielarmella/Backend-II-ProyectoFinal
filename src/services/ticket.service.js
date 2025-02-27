import TicketRepository from "../repositories/ticket.repository.js";

export default class TicketService {
    #ticketRepository;

    constructor() {
        this.#ticketRepository = new TicketRepository();
    }

    async findAll(params) {
        return await this.#ticketRepository.findAll(params);
    }


    async findOneById(id) {
        return await this.#ticketRepository.findOneById(id);
    }

    async insertOne(data) {
        return await this.#ticketRepository.save(data);
    }

    async updateOneById(id, data) {
        const ticket = await this.findOneById(id);
        const ticketUpdated = await this.#ticketRepository.save({
            ...ticket,
            ...data,
        });

        return ticketUpdated;
    }

    async deleteOneById(id) {
        return await this.#ticketRepository.deleteOneById(id);
    }
}