import mongoose from "mongoose";
import { productos } from "../modelos/schemas/productos.js";

if (process.env.SELECTED_DB == "mongo"){
    try {
        mongoose.connect( 
            process.env.MONGO_DB_URI,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
           
        )  
        console.log("conectado")  
    } catch (error) {
        throw new Error(error)        
    }
}

class ContenedorMongo {
    constructor(nombreColeccion){
        this.coleccion = nombreColeccion
    }


    async mostrarTodos() {
        try {
            console.log(this.coleccion)
            const resultado = await productos.find()
            return resultado
        } catch (error) {
            throw new Error(error)        
        }
    }

    async guardarElemento(nuevoElemento){
        try {
            const nuevo = new productos(nuevoElemento)
            nuevo.save( function(err, prod){
                if (err) return console.error(err);
                    console.log(prod);
                    
            })
            return {"OK":"OK"} 
        } catch (error) {
            throw new Error(error)
        }
    }

    async mostrarPorId(id){
        try {
            const resultado = await productos.findOne({id: id})
            return resultado
        } catch (error) {
            return error
        }
    }

    async actualizar(id, nuevaData){
        try {
            const elementoActualizado = productos.findOneAndUpdate({id:id}, {$set: nuevaData})
            return elementoActualizado
        } catch (error) {
            throw new Error(error)
        }
    }

    async eliminarPorId(id){
        try {
            const elementoeliminado = await productos.deleteOne({id: id})
            return elementoeliminado
            
        } catch (error) {
            throw new Error(error)
        }
    }
}

export {ContenedorMongo}