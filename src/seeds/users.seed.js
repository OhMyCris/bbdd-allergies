const mongoose = require("mongoose");

const User = require("../api/models/user.model");

const DB_URL = process.env.DB_URL;
const arrayUsers = [
  {
    "fullname": "David Apellido Apellido",
    "email": "prueba@gmail.com",
    "password": "1234",
    "alergies": [
      "Cacahuete",
      "Leche"
    ],
    "favorites":{}
   
  }
];

mongoose.connect(DB_URL).then(async ()=> {
    const allUsers = await User.find();
    if (allUsers.length > 0) {
        await User.collection.drop();
        console.log("Users borrados");
    }
}).catch((error) => console.log("error borrando users", error)).then(async () => {
    const userMap = arrayUsers.map((user) => new User(user))
    await User.insertMany(userMap);
    console.log("Users insertados correctamente");
}).catch((error) => console.log("error insertando users", error)).finally(() => mongoose.disconnect())
  