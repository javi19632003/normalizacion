import express  from "express";
import cors from "cors";

import { Server as HttpServer } from "http";
import { createServer } from "http";

import { Server as  IOServer }  from "socket.io";

import { productsController } from "../controladores/ControladorProductos.js";
import { messagesController } from "../controladores/controladorMensajes.js";

import { router } from  "../rutas/products.js"

//export {ContenedorMongo}

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
//    this.server = require("http").createServer(this.app);
    this.server = createServer(this.app);
    this.httpServer = new HttpServer(this.app);
    this.io = new IOServer(this.httpServer);
    // middleware
    this.middleware();

    // routes
    this.routes();

    // socket
    this.socket();
  }

  middleware() {
    // Directorio publico
    this.app.use(express.static("public"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/", router);
  }

  socket() {
    this.io.on("connection", (socket) => {
      socket.emit("socketConnected");

      socket.on("productListRequest", async () => {
        const allProducts = await productsController.getAllProducts();
        socket.emit("updateProductList", allProducts);
      });

      socket.on("chatMessagesRequest", async () => {
        const allMessages = await messagesController.getAllMessages();
        socket.emit("updateChatRoom", allMessages);
      });

      socket.on("addNewProduct", async (newProduct) => {
        await productsController.addNewProduct(newProduct);
        const allProducts = await productsController.getAllProducts();
        socket.emit("updateProductList", allProducts);
      });

      socket.on("addNewMessage", async (newMessage) => {
        await messagesController.addNewMessage(newMessage);
        const allMessages = await messagesController.getAllMessages();
        socket.emit("updateChatRoom", allMessages);
      });
    });
  }

  listen() {
    const server = this.httpServer.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
    server.on("error", (err) => console.error(err));
  }
}

export { Server } ;
