const mongoose = require("mongoose");
require('dotenv').config();

const Diario = require("../api/models/diario.model");

const DB_URL = process.env.DB_URL;
const arrayDiarios = [
  {
    diaFecha: "1 de febrero de 2024",
    producto: "Producto 1",
    imagen: "https://images.pexels.com/photos/17425856/pexels-photo-17425856/free-photo-of-blanco-y-negro-paisaje-campo-colina.jpeg",
    notas: "Notas del producto 1",
},
{
    diaFecha: "5 de febrero de 2024",
    producto: "Producto 2",
    imagen: "https://images.pexels.com/photos/20187789/pexels-photo-20187789/free-photo-of-blanco-y-negro-naturaleza-nubes-rocas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    notas: "Notas del producto 2",
},
{
    diaFecha: "10 de febrero de 2024",
    producto: "Producto 3",
    imagen: "https://images.pexels.com/photos/19806430/pexels-photo-19806430/free-photo-of-blanco-y-negro-punto-de-referencia-campo-construccion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    notas: "Notas del producto 3",
},
{
    diaFecha: "15 de febrero de 2024",
    producto: "Producto 4",
    imagen: "https://images.pexels.com/photos/20135107/pexels-photo-20135107/free-photo-of-resfriado-nieve-amanecer-paisaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    notas: "Notas del producto 4",
},
{
    diaFecha: "20 de febrero de 2024",
    producto: "Producto 5",
    imagen: "https://images.pexels.com/photos/2402891/pexels-photo-2402891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    notas: "Notas del producto 5",
}
];

mongoose.connect(DB_URL).then(async ()=> {
    const allDiarios = await Diario.find();
    if (allDiarios.length > 0) {
        await Diario.collection.drop();
        console.log("Diarios borrados");
    }
}).catch((error) => console.log("error borrando diarios", error)).then(async () => {
    const diarioMap = arrayDiarios.map((diario) => new Diario(diario))
    await Diario.insertMany(diarioMap);
    console.log("Diarios insertados correctamente");
}).catch((error) => console.log("error insertando diarios", error)).finally(() => mongoose.disconnect())
  