import TicketRepository from "../repositories/ticket.repository.js";

export default class TicketService {
    #ticketRepository;

    constructor() {
        this.#ticketRepository = new TicketRepository();
    }

    // Obtener tickets aplicando filtros
    async findAll(params) {
        return await this.#ticketRepository.findAll(params);
    }

    // Obtener un ticket por su ID
    async findOneById(id) {
        return await this.#ticketRepository.findOneById(id);
    }

    // Crear un ticket
    async insertOne(data) {
        return await this.#ticketRepository.save(data);
    }

    // Actualizar un ticket existente
    async updateOneById(id, data) {
        const ticket = await this.findOneById(id);
        const ticketUpdated = await this.#ticketRepository.save({
            ...ticket,
            ...data,
        });

        return ticketUpdated;
    }

    // Eliminar un ticket por su ID
    async deleteOneById(id) {
        return await this.#ticketRepository.deleteOneById(id);
    }
}