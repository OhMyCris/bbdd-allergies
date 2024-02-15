const mongoose = require("mongoose");

const Food = require("../api/models/food.model");

const DB_URL = process.env.DB_URL;
const arrayFoods = [
  {
    "name": "Algo",
    "barcode": "AAAAAAAA",
    "QR": "AAAAAA",
    "ingredientes": [],
    "descripcion": "Un algo muy algo."
},
{
    "name": "Algo2",
    "barcode": "AAAAAAAA2",
    "QR": "BBBBBB",
    "ingredientes": [],
    "descripcion": "Otro algo no tan algo."
},
{
    "name": "Leche entera",
    "barcode": "123456789",
    "qr": "https://example.com/qr/leche-entera",
    "ingredientes": [
        "leche"
    ],
    "descripcion": "Leche entera pasteurizada."
},
{
    "name": "Arroz blanco",
    "barcode": "987654321",
    "qr": "https://example.com/qr/arroz-blanco",
    "ingredientes": [
        "arroz"
    ],
    "descripcion": "Arroz blanco de grano largo."
},
{
    "name": "Pan integral",
    "barcode": "456789123",
    "qr": "https://example.com/qr/pan-integral",
    "ingredientes": [
        "harina de trigo integral",
        "levadura",
        "agua"
    ],
    "descripcion": "Pan integral hecho con harina de trigo integral."
},
{
    "name": "Yogur natural",
    "barcode": "789123456",
    "qr": "https://example.com/qr/yogur-natural",
    "ingredientes": [
        "leche",
        "cultivos lácticos"
    ],
    "descripcion": "Yogur natural sin azúcar añadido."
}
];

mongoose.connect(DB_URL).then(async ()=> {
    const allFoods = await Food.find();
    if (allFoods.length > 0) {
        await Food.collection.drop();
        console.log("Foods borrados");
    }
}).catch((error) => console.log("error borrando foods", error)).then(async () => {
    const foodMap = arrayFoods.map((food) => new Food(food))
    await Food.insertMany(foodMap);
    console.log("Foods insertados correctamente");
}).catch((error) => console.log("error insertando foods", error)).finally(() => mongoose.disconnect())
  