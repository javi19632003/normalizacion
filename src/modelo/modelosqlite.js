import {conexion} from '../conexiones/sqlite.js'
import miKnex     from 'knex';
const knex  = miKnex(conexion);


const modeloSqLite = ( async () => {
    try {
        if( await knex.schema.hasTable('mensa')) {
            await knex.schema.dropTable('mensa')
        }

        await knex.schema.createTable('mensa', table => {
            table.increments('id').primary()
            table.string('nombre').notNullable()
            table.string('Apellido').notNullable()
            table.string('Edad').notNullable()
            table.string('alias').notNullable()
            table.string('avatar').notNullable()
            table.string('messageText').notNullable()
            table.string('idmensa').notNullable()
            table.string('date').notNullable()
        })

        console.log('TABLA DE MENSAGES CREADA !!!!!!');

    } catch (err) {
        console.log('salgo por error sql3')
        console.log(err)
    } finally {
        knex.destroy()
    }
})

export { modeloSqLite }
