import { createHash } from "../utils/security.js";

export default class UserDTO {
    fromModel(model) {
        return {
            id: model.id,
            name: model.name,
            surname: model.surname,
            email: model.email,
            roles: model.roles,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            name: data.name,
            surname: data.surname,
            email: data.email,
            age: data.age,
            password: data.password ? createHash(data.password) : null,
            roles: data.roles,
        };
    }
}