import ProductRepository from "../repositories/product.repository.js";
import { convertToBoolean } from "../utils/converter.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class ProductService {
    #productRepository;

    constructor() {
        this.#productRepository = new ProductRepository();
    }

    // Obtener productos aplicando filtros
    async findAll(params) {
        return await this.#productRepository.findAll(params);
    }

    // Obtener un producto por su ID
    async findOneById(id) {
        return await this.#productRepository.findOneById(id);
    }

    // Crear un producto
    async insertOne(data, filename) {
        return await this.#productRepository.save({
            ...data,
            status: convertToBoolean(data.status),
            thumbnail: filename ?? null,
        });
    }

    // Actualizar un producto existente
    async updateOneById(id, data, filename) {
        const product = await this.findOneById(id);
        const currentThumbnail = product.thumbnail;
        const newThumbnail = filename;

        const productUpdated = await this.#productRepository.save({
            ...product,
            ...data,
            status: convertToBoolean(data.status),
            thumbnail: newThumbnail ?? currentThumbnail,
        });

        if (filename && newThumbnail !== currentThumbnail) {
            await deleteFile(paths.images, currentThumbnail);
        }

        return productUpdated;
    }

    // Eliminar un producto por su ID
    async deleteOneById(id) {
        const product = await this.findOneById(id);

        if (product.thumbnail) {
            await deleteFile(paths.images, product.thumbnail);
        }

        return await this.#productRepository.deleteOneById(id);
    }
}