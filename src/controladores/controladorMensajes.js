import { ProductsDB }  from "../clases/productsDB.js";
import { conexion }    from '../conexiones/sqlite.js'
//const knexLite  = require('knex')(coneLite)
//console.log(coneLite)
const messagesDB = new ProductsDB(conexion, "mensa");

const messagesController = {
  getAllMessages: async () => {
    try {
     const allMessages = await messagesDB.getAllProducts();
      return allMessages;
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  },

  addNewMessage: async (message) => {
    console.log(message)
    try {
      const prevMessages = await messagesDB.getAllProducts();
      const currentDate = new Date().toLocaleString();

      const getNewId = () => {
        let lastID = 0;
        if (prevMessages.length) {
          lastID = prevMessages[prevMessages.length - 1].id;
        }
        return lastID + 1;
      };

      const newMessage = {
        id: getNewId(),
        email: message.email ? message.email : "user@email.com",
        date: currentDate,
        messageText: message.messageText
          ? message.messageText
          : "(Empty message)",
      };

      await messagesDB.createProduct(newMessage);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  },
};

export { messagesController };
