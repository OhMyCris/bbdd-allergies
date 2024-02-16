const express = require('express')

const {getDiario, postDiario, putDiario, deleteDiario} = require('../controllers/diario.controllers')

const diarioRoutes = express.Router();
diarioRoutes.get('/', getDiario)
diarioRoutes.post('/', postDiario)
diarioRoutes.put('/:id', putDiario)
diarioRoutes.delete('/:id', deleteDiario)



module.exports = diarioRoutes;