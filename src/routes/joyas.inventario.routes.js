

const { Router } = require('express')
const InventarioController = require('../controllers/inventario.controller')


const router = Router()

router.get('/', InventarioController.listar)
router.get('/filtros', InventarioController.filtrar)

module.exports = router;