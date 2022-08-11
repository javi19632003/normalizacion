import { modeloMysql }    from './src/modelo/modelomysql.js';
import { modeloSqLite }  from './src/modelo/modelosqlite.js'


    try {
    //   modeloMysql()
    modeloSqLite()

    } catch (err) {
        console.log('salgo por error de crear datos')
        console.log(err)
    } 
