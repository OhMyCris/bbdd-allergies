const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allergiesSchema = new Schema(
    {
        A:[{type: String, required: true, trim: true}],
        B:[{type: String, required: true, trim: true}],
        C:[{type: String, required: true, trim: true}],
        E:[{type: String, required: true, trim: true}],
        F:[{type: String, required: true, trim: true}],
        G:[{type: String, required: true, trim: true}],
        H:[{type: String, required: true, trim: true}],
        K:[{type: String, required: true, trim: true}],
        L:[{type: String, required: true, trim: true}],
        M:[{type: String, required: true, trim: true}],
        N:[{type: String, required: true, trim: true}],
        P:[{type: String, required: true, trim: true}],
        S:[{type: String, required: true, trim: true}],
        T:[{type: String, required: true, trim: true}]
    }, {
        timestamps:true //te genera la fecha de creacion y modificacion del objeto
    }
)

const Allergies = mongoose.model('allergies', allergiesSchema);

module.exports = Allergies;