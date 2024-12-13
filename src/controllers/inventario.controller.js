
const Inventario = require('../models/Inventario')
const { generaHATEOAS } = require('../utils/inventario.hateos')


const listar = async (req, res, next) => {

    try {
        const { limits, page, order_by } = req.query
        console.log('iniciando consulta de datos')

        const response = await Inventario.inventarioListar(limits, page, order_by)
        console.log(response)

        console.log('iniciando HATEOS')
        
        const HATEOAS = await generaHATEOAS(response)
        console.log(HATEOAS)
        
        res.json(HATEOAS);

        //res.json(response)

    } catch (error) {
        next(error)
    }
}

const filtrar = async (req, res, next) => {

    try {
        const { precio_max, precio_min, categoria, metal } = req.query
        const response = await Inventario.inventarioFiltro(precio_max, precio_min, categoria, metal)

        res.json(response)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    listar, filtrar
}