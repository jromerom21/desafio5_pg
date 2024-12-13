
const generaHATEOAS = (joyas) => {
   
    let totalStock = 0;

    const results = joyas.map((m) => {
        totalStock += m.stock
        return {
            name: m.nombre,
            href: `/joyas/joya/${m.id}`,
        }
    })

    const totalJoyas = joyas.length

    const HATEOAS = {
        totalJoyas,
        totalStock,
        results
    }
    return HATEOAS
}

module.exports = { generaHATEOAS }