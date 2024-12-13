const { DB } = require("../config/db")
const format = require('pg-format')

const inventarioListar = async (limit = 25, page = 1, order_by = 'stock_ASC') => {
    try {
        const [campo, direccion] = order_by.split("_") //id_ASC  =>  ['id', 'ASC']
        const offset = Math.abs((page - 1) * limit)

        console.log(offset)
        const SQLQUERY = format(`
            SELECT * FROM inventario
            ORDER BY %s %s
            LIMIT %s
            OFFSET %s`,
            campo,
            direccion,
            limit,
            offset
        );

        const { rows } = await DB.query(SQLQUERY)
        console.log('envio de datos desde DB');

        return rows

    } catch (error) {
        throw error
    }
}

const inventarioFiltro = async (precio_max, precio_min, categoria, metal) => {
    try {
        const SQLQUERY = consultaFiltro(precio_max, precio_min, categoria, metal)
        const { rows, rowCount } = await DB.query(SQLQUERY)

        return rows

    } catch (error) {
        throw error
    }
}


const consultaFiltro = (precio_max='', precio_min='', categoria='', metal='') => {
    let filtros = [];

    if (precio_min) {
        filtros.push(`precio >= ${precio_min}`);
        console.log('agrega filtro mayor igual que precio min');
    }

    if (precio_max) {
        filtros.push(`precio <= ${precio_max}`);
        console.log('agrega filtro menor igual que precio max');
    }

    if (categoria) {
        filtros.push(`categoria = '${categoria}'`);
        console.log('agrega filtro de categoria');
    }

    if (metal) {
        filtros.push(`metal = '${metal}'`);
        console.log('agrega filtro de metal');
    }

    let consulta = "SELECT * FROM inventario";

    if (filtros.length > 0) {
        consulta += ` WHERE ${filtros.join(" AND ")}`;
    }

    return consulta;
}


module.exports = {
    inventarioListar,
    inventarioFiltro
}