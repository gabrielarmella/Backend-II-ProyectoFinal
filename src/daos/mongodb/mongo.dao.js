export default class MongoDAO {
    #model;

    constructor(model) {
        this.#model = model;
    }
    async findAll(filters, params) {
        const sort = {
            asc: { title: 1 },
            desc: { title: -1 },
        };

        const paginationOptions = {
            limit: params?.limit ?? 10,
            page: params?.page ?? 1,
            sort: sort[params?.sort] ?? {},
            populate: params?.populate ?? "",
            lean: true,
        };
        return await this.#model.paginate(filters, paginationOptions);
    }

    async findOneById(id) {
        return await this.#model.findOne({ _id: id });
    }

    async findOneByCriteria(criteria) {
        return await this.#model.findOne(criteria);
    }

    async save(data) {
        let object;

        if (data.id) {
            object = await this.#model.findById(data.id);
            object.set(data);

        } else {
            object = new this.#model(data);
        }

        return object.save();
    }

    async deleteOneById(id) {
        return await this.#model.deleteOne({ _id: id });
    }
}