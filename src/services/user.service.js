import UserRepository from "../repositories/user.repository.js";

export default class UserService {
    #userRepository;

    constructor() {
        this.#userRepository = new UserRepository();
    }

    async findAll(params) {
        return await this.#userRepository.findAll(params);
    }

    async findOneById(id) {
        return await this.#userRepository.findOneById(id);
    }

    async findOneByEmailAndPassword(email, password) {
        return await this.#userRepository.findOneByEmailAndPassword(email, password);
    }

    async insertOne(data) {
        return await this.#userRepository.save(data);
    }
    async updateOneById(id, data) {
        const user = await this.findOneById(id);
        const newValues = { ...user, ...data };
        return await this.#userRepository.save(newValues);
    }


    async deleteOneById(id) {
        return await this.#userRepository.deleteOneById(id);
    }
}