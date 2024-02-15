const express = require("express");

const {
	getFoods,
	postFoods,
	putFoods,
	deleteFoods,
	getFoodByQr,
	getFoodByBarcode,
} = require("../controllers/food.controllers");

const foodRoutes = express.Router();
foodRoutes.get("/", getFoods);
foodRoutes.post("/", postFoods);
foodRoutes.put("/:id", putFoods);
foodRoutes.delete("/:id", deleteFoods);
foodRoutes.get("/qr/:qr", getFoodByQr);
foodRoutes.get("/barcode/:barcode", getFoodByBarcode);

module.exports = foodRoutes;
