const mongoose = require("mongoose");
require('dotenv').config();

const Emergency = require("../api/models/emergency.model");

const DB_URL = process.env.DB_URL;
const arrayEmergencys = [
  {
    "fullname": "Algo Martinez",
    "email": "algo@gmail.com",
    "mobile": "654321987",
    "company": "Servicios Muy Algo S.L"
  }
];

mongoose.connect(DB_URL).then(async ()=> {
    const allEmergencys = await Emergency.find();
    if (allEmergencys.length > 0) {
        await Emergency.collection.drop();
        console.log("Emergencys borrados");
    }
}).catch((error) => console.log("error borrando emergencys", error)).then(async () => {
    const emergencyMap = arrayEmergencys.map((emergency) => new Emergency(emergency))
    await Emergency.insertMany(emergencyMap);
    console.log("Emergencys insertados correctamente");
}).catch((error) => console.log("error insertando emergencys", error)).finally(() => mongoose.disconnect())
  