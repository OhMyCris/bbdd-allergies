const Diario = require('../models/diario.model')

const getDiario = async(req, res) => {
    try {
        const allDiarios = await Diario.find();
        return res.status(200).json(allDiarios)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postDiario = async(req, res) => {
    try {
        // console.log(req.body)
        const newDiario = new Diario(req.body);
        // console.log(newDiario)
        const createdDiario = await newDiario.save() //save sirve para guardar un elemento en la BBDD
        return res.status(201).json(createdDiario)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const putDiario = async(req, res) => {
    try {
        //recoge el parametro de la url que se va a atacar y modificar
            const {id} = req.params;
        //Le mandamos al modelo a validar lo que le pasamos
            const putDiarios = new Diario(req.body);
        //Actualizamos el _id que genera mongo automaticamente por id para poder trabajar mejor
            putDiarios._id=id; 
        //Mandamos el id para que sepa cual actualizar
            const updatedDiario = await Diario.findByIdAndUpdate(id, putDiarios, {new:true});
        //Por si alguien escribe mal el id
            if (!updatedDiario) {
                return res.status(404).json({message:"no tenemos ese diario con ese ID"});
            }
            return res.status(200).json(updatedDiario);

        } catch (error) {
            return res.status(500).json(error);
        }

}

const deleteDiario = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteDiarios = await Diario.findByIdAndDelete(id);
        if (!deleteDiarios) {
            return res.status(404).json({message:"no tenemos ese diario con ese ID"});
        }
        return res.status(200).json(deleteDiarios);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    getDiario, postDiario, putDiario, deleteDiario
}