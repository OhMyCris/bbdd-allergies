const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connect = async()=> {
    try {
        const db = await mongoose.connect(DB_URL);
        const {name, host} = db.connection; // Te devuelve el nombre y el host de tu base de datos por si haces copypaste y se te ha olvidado cambiar la url, esto te lo recuerda.
        console.log(`conectado a base de datos de ${name} db en el host ${host}`)
    } catch (error) {
        console.error('Hemos tenido un error al conectar a la BBDD', error)
    }
    
}

module.exports = {connect};