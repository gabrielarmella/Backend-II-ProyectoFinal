import UserRepository from "../repositories/user.repository.js";

export default class UserService {
    #userRepository;

    constructor() {
        this.#userRepository = new UserRepository();
    }

    // Obtener usuarios aplicando filtros
    async findAll(params) {
        return await this.#userRepository.findAll(params);
    }

    // Obtener un usuario por su ID
    async findOneById(id) {
        return await this.#userRepository.findOneById(id);
    }

    // Obtener un usuario por su email y contraseña
    async findOneByEmailAndPassword(email, password) {
        return await this.#userRepository.findOneByEmailAndPassword(email, password);
    }

    // Crear un usuario
    async insertOne(data) {
        return await this.#userRepository.save(data);
    }

    // Actualizar un usuario existente
    async updateOneById(id, data) {
        const user = await this.findOneById(id);
        const newValues = { ...user, ...data };
        return await this.#userRepository.save(newValues);
    }

    // Eliminar un usuario por su ID
    async deleteOneById(id) {
        return await this.#userRepository.deleteOneById(id);
    }
}