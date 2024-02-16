const mongoose = require("mongoose");
require('dotenv').config();

const Allergy = require("../api/models/allergies.model");

const DB_URL = process.env.DB_URL;
const arrayAllergies = [
  {
    "A": [
        "Acido benzoico",
        "Aguacate",
        "Ajo",
        "Albaricoque",
        "Alforfón",
        "Almendras",
        "Altramuces",
        "Anacardo",
        "Apio",
        "Arroz",
        "Avellana",
        "Avena"
    ],
    "B": [
        "Bálsamo del Perú"
    ],
    "C": [
        "Cacahuete",
        "Carne de ave de corral",
        "Carne roja",
        "Cebada",
        "Centeno"
    ],
    "E": [
        "Espelta"
    ],
    "F": [
        "Fresa"
    ],
    "G": [
        "Garbanzos",
        "Guisantes"
    ],
    "H": [
        "Huevo"
    ],
    "K": [
        "Kamut",
        "Kiwi"
    ],
    "L": [
        "Leche",
        "Lentejas"
    ],
    "M": [
        "Mango",
        "Maiz",
        "Marisco",
        "Melocoton",
        "Melon",
        "Mostaza"
    ],
    "N": [
        "Nectarina",
        "Nuez"
    ],
    "P": [
        "Pescado",
        "Platano",
        "Polen"
    ],
    "S": [
        "Sandia",
        "Sesamo",
        "Soja",
        "Sulfitos"
    ],
    "T": [
        "Tartrazina",
        "Tomate",
        "Trigo"
    ]
}
];

mongoose.connect(DB_URL).then(async ()=> {
    const allAllergies = await Allergy.find();
    if (allAllergies.length > 0) {
        await Allergy.collection.drop();
        console.log("Allergies borrados");
    }
}).catch((error) => console.log("error borrando allergies", error)).then(async () => {
    const allergiesMap = arrayAllergies.map((allergies) => new Allergy(allergies))
    await Allergy.insertMany(allergiesMap);
    console.log("Allergies insertados correctamente");
}).catch((error) => console.log("error insertando allergies", error)).finally(() => mongoose.disconnect())
  