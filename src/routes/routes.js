

const express = require('express')
const inventarioRoutes = require('./joyas.inventario.routes')
const registrarConsulta = require('../middlewares/registrarConsulta');

const app = express()

// Usar el middleware en todas las rutas
app.use(registrarConsulta);

app.use('/joyas', inventarioRoutes)

module.exports = app;