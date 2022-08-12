//import { ProductsDB }  from "../clases/productsDB.js";
//import { conexion }    from '../conexiones/sqlite.js'
//const knexLite  = require('knex')(coneLite)
//console.log(coneLite)
//const messagesDB = new ProductsDB(conexion, "mensa");

import mongoose from "mongoose";
import { mensajes } from "../modelo/mensajes.js";

    try {
        mongoose.connect( 
          "mongodb://localhost:27017/ecommerce",
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
           
        )  
        console.log("conectado")  
    } catch (error) {
        throw new Error(error)        
    }

const messagesController = {
  getAllMessages: async () => {
    try {
      const resultado = await mensajes.find()
      return resultado
  } catch (error) {
      throw new Error(error)        
  }

  },

  addNewMessage: async (message) => {
    try {
      console.log(message)
      const nuevo = new mensajes(message)
      console.log(nuevo)
      nuevo.save( function(err, prod){
          if (err) return console.error(err);
              console.log(prod);
      })
      return {"OK":"OK"} 
  } catch (error) {
      throw new Error(error)
  }
  },
};

export { messagesController };
