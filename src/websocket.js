import { productDBManager } from './dao/productDBManager.js';
const ProductService = new productDBManager();

export default (io) => {
    io.on("connection", (socket) => {
        console.log('New client connected');

        socket.on("createProduct", async (data) => {
            try {
                await ProductService.createProduct(data);
                const products = await ProductService.getAllProducts({});
                socket.emit("publishProducts", products.docs);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("deleteProduct", async (data) => {
            try {
                const result = await ProductService.deleteProduct(data.pid);
                const products = await ProductService.getAllProducts({});
                socket.emit("publishProducts", products.docs);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("updateProduct", async (data) => {
            try {
                await ProductService.updateProduct(data.pid, data.product);
                const products = await ProductService.getAllProducts({});
                socket.emit("publishProducts", products.docs);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};