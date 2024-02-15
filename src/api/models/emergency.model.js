const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emergencySchema = new Schema(
    {
        fullname:{type: String, required: true, trim: true},
        email:{type: String, required: true, trim: true},
        mobile:{type: Number, required: true, trim: true},
        company:{type: String, required: false, trim: true}
    }, {
        timestamps:true //te genera la fecha de creacion y modificacion del objeto
    }
)

const Emergency = mongoose.model('Emergency', emergencySchema);

module.exports = Emergency;