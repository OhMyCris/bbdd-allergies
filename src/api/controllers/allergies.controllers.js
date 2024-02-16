const Allergy = require('../models/allergies.model')

const getAllergies = async(req, res) => {
    try {
        const allAllergies = await Allergy.find()
        return res.status(200).json(allAllergies)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postAllergies = async(req, res) => {
    try {
        // console.log(req.body)
        const newAllergy = new Allergy(req.body);
        // console.log(newYokai)
        const createdAllergy = await newAllergy.save() //save sirve para guardar un elemento en la BBDD
        return res.status(201).json(createdAllergy)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const putAllergies = async(req, res) => {
    try {
        //recoge el parametro de la url que se va a atacar y modificar
            const {id} = req.params;
        //Le mandamos al modelo a validar lo que le pasamos
            const putAllergies = new Allergy(req.body);
        //Actualizamos el _id que genera mongo automaticamente por id para poder trabajar mejor
            putAllergies._id=id; 
        //Mandamos el id para que sepa cual actualizar
            const updatedAllergy = await Allergy.findByIdAndUpdate(id, putAllergy, {new:true});
        //Por si alguien escribe mal el id
            if (!updatedAllergy) {
                return res.status(404).json({message:"no tenemos esa alergia con ese ID"});
            }
            return res.status(200).json(updatedAllergy);

        } catch (error) {
            return res.status(500).json(error);
        }

}

const deleteAllergies = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteAllergies = await Allergy.findByIdAndDelete(id);
        if (!deleteAllergies) {
            return res.status(404).json({message:"no tenemos esa alergia con ese ID"});
        }
        return res.status(200).json(deleteAllergies);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    getAllergies, postAllergies, putAllergies, deleteAllergies
}