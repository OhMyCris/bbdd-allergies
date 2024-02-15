const express = require('express')

const {getEmergencys, postEmergencys, putEmergencys, deleteEmergencys} = require('../controllers/emergency.controllers')

const emergencyRoutes = express.Router();
emergencyRoutes.get('/', getEmergencys)
emergencyRoutes.post('/', postEmergencys)
emergencyRoutes.put('/:id', putEmergencys)
emergencyRoutes.delete('/:id', deleteEmergencys)



module.exports = emergencyRoutes;