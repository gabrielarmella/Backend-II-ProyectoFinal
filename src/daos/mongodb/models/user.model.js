import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { USER, ROLES } from "../../../constants/roles.constant.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 20, "El nombre debe tener como máximo 20 caracteres" ],
    },
    surname: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El apellido debe tener al menos 3 caracteres" ],
        maxLength: [ 20, "El nombre debe tener como máximo 20 caracteres" ],
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: async function (email) {
                const countDocuments = await this.model("users").countDocuments({
                    _id: { $ne: this._id },
                    email, 
                });
                return countDocuments === 0;
            },
            message: "El email ya está registrado",
        },
    },
    age: {
        type: Number,
        required: [ true, "La edad es obligatoria" ],
        min: [ 18, "La edad mínima es 18 años" ],
        max: [ 99, "La edad máxima es 99 años" ],
    },
    password: {
        type: String,
        required: [ true, "La contraseña es obligatoria" ],
    },
    roles: {
        type: [String],
        uppercase: true,
        enum: {
            values: ROLES,
            message: "Rol no válido",
        },
        default: [USER], 
    },
}, {
    timestamps: true,
    versionKey: false, 
});


userSchema.plugin(paginate);

const User = model("users", userSchema);

export default User;