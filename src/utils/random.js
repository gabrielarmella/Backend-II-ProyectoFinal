import moment from "moment";
import path from "path";


export const generateNumber = (startNumber, endNumber) => {
    if (startNumber >= endNumber) {
        throw new Error("El número inicial no puede ser mayor que el número final");
    }
    return Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
};

export const generateNameForFile = (filename) => {
    if(!filename || filename.indexOf(".") === -1) {
        throw new Error("El nombre del archivo no es válido");
    }
    const randomNumber = generateNumber(1000, 9999);
    const dateTime = moment().format("DDMMYYYY-HHmmss");
    const extension = path.extname(filename);

    return `file_${randomNumber}_${dateTime}${extension}`;
};