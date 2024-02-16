const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diarioSchema = new Schema(
    {
        diaFecha:{type: String, required: true, trim: true},
        producto:{type: String, required: true, trim: true},
        imagen:{type: String, required: true, trim: true},
        notas:{type: String, required: false, trim: true}
    }
)

const Diario = mongoose.model('Diario', diarioSchema);

module.exports = Diario;