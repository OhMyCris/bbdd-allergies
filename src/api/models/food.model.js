const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema(
    {
        "name":{type: String, required: true, trim: true},
        "barcode":{type: String, required: true, trim: true},
        "QR":{type: String, required: true, trim: true},
        "ingredientes":[{type: String, required: false, trim: true}],
        "descripcion":{type: String, required: true, trim: true},
        "marca":{type:String, required:true, trim:true}
    }, {
        timestamps:true //te genera la fecha de creacion y modificacion del objeto
    }
)

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;