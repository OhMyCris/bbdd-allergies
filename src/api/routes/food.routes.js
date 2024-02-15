const express = require('express')

const {getFoods, postFoods, putFoods, deleteFoods} = require('../controllers/food.controllers')

const foodRoutes = express.Router();
foodRoutes.get('/', getFoods)
foodRoutes.post('/', postFoods)
foodRoutes.put('/:id', putFoods)
foodRoutes.delete('/:id', deleteFoods)



module.exports = foodRoutes;