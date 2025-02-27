import { engine } from 'express-handlebars';
import paths from "../utils/paths.js";

export const config = (server) => {
    server.engine("hbs", engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: `${paths.views}/layouts`,
        partialsDir: `${paths.views}/partials`,

        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    }));
    server.set("views", paths.views);

    server.set("view engine", "hbs");
};