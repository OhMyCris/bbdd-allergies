const express = require('express')

const {getAllergies, postAllergies, putAllergies, deleteAllergies} = require('../controllers/allergies.controllers')

const allergiesRoutes = express.Router();
allergiesRoutes.get('/', getAllergies)
allergiesRoutes.post('/', postAllergies)
allergiesRoutes.put('/:id', putAllergies)
allergiesRoutes.delete('/:id', deleteAllergies)



module.exports = allergiesRoutes;