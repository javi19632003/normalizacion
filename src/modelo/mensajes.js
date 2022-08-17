import mongoose from "mongoose";

const mensaCollection = "mensas";

const mensaSchema = new mongoose.Schema({
  author: {
  id: { type: String, required: true },
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  edad: { type: Number, required: true },
  alias: { type: String, required: true, max: 40 },
  avatar: { type: String, required: true, max: 100 }
  },
  idmensa: { type: Number, required: true },
  messageText: { type: String, required: true, max: 100 }
}, {
  versionKey: false 
});

export const mensajes = mongoose.model(
  mensaCollection,
  mensaSchema
);
