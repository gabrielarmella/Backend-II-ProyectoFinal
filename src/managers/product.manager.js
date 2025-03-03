import mongoose from "mongoose";
import paths from "../utils/paths.js";
import Product from "../daos/mongodb/models/product.model.js";
import { isValidID } from "../config/mongoose.config.js";
import { deleteFile } from "../utils/fileSystem.js";
import { convertToBoolean } from "../utils/converter.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

export default class ProductManager {
    #product;

    constructor() {
        this.#product = Product;
    }
    #handleError = (error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new Error(Object.values(error.errors)[0].message);
        }

        throw new Error(error.message);
    };

    #validateId = (id) => {
        if (!isValidID(id)) throw new Error(ERROR_INVALID_ID);
    };

    #findOneById = async (id) => {
        this.#validateId(id);

        const productFound = await this.#product.findOne({ _id: id });
        if (!productFound) throw new Error(ERROR_NOT_FOUND_ID);

        return productFound;
    };

    getAll = async (paramFilters) => {
        try {
            const $and = [];

            if (paramFilters?.title) $and.push({ title: { $regex: paramFilters.title, $options: "i" } });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                lean: true,
            };

            const productsFound = await this.#product.paginate(filters, paginationOptions);
            return productsFound;
        } catch (error) {
            this.#handleError(error);
        }
    };
    getOneById = async (id) => {
        try {
            const productFound = await this.#findOneById(id);
            return productFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    insertOne = async (data, filename) => {
        try {
            const product = new Product({
                ...data,
                status: convertToBoolean(data.status),
                thumbnail: filename ?? null,
            });

            await product.save();
            return product.toObject();
        } catch (error) {
            if (filename) await deleteFile(paths.images, filename);
            this.#handleError(error);
        }
    };

    updateOneById = async (id, data, filename) => {
        try {
            const productFound = await this.#findOneById(id);
            const currentThumbnail = productFound.thumbnail;
            const newThumbnail = filename;

            const newValues = {
                ...data,
                status: convertToBoolean(data.status),
                thumbnail: newThumbnail ?? currentThumbnail,
            };

            productFound.set(newValues);
            await productFound.save();

            if (filename && newThumbnail !== currentThumbnail) {
                await deleteFile(paths.images, currentThumbnail);
            }

            return productFound.toObject();
        } catch (error) {
            if (filename) await deleteFile(paths.images, filename);
            this.#handleError(error);
        }
    };

    deleteOneById = async (id) => {
        try {
            const productFound = await this.#findOneById(id);

            if (productFound.thumbnail) {
                await deleteFile(paths.images, productFound.thumbnail);
            }

            await this.#product.deleteOne({ _id: productFound._id });
            return productFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };
}