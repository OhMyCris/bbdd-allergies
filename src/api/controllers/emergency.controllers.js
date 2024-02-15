const Emergency = require('../models/emergency.model')

const getEmergencys = async(req, res) => {
    try {
        const allEmergencys = await Emergency.find();
        return res.status(200).json(allEmergencys)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postEmergencys = async(req, res) => {
    try {
        // console.log(req.body)
        const newEmergency = new Emergency(req.body);
        // console.log(newEmergency)
        const createdEmergency = await newEmergency.save() //save sirve para guardar un elemento en la BBDD
        return res.status(201).json(createdEmergency)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const putEmergencys = async(req, res) => {
    try {
        //recoge el parametro de la url que se va a atacar y modificar
            const {id} = req.params;
        //Le mandamos al modelo a validar lo que le pasamos
            const putEmergencys = new Emergency(req.body);
        //Actualizamos el _id que genera mongo automaticamente por id para poder trabajar mejor
            putEmergencys._id=id; 
        //Mandamos el id para que sepa cual actualizar
            const updatedEmergency = await Emergency.findByIdAndUpdate(id, putEmergencys, {new:true});
        //Por si alguien escribe mal el id
            if (!updatedEmergency) {
                return res.status(404).json({message:"no tenemos ese emergency con ese ID"});
            }
            return res.status(200).json(updatedEmergency);

        } catch (error) {
            return res.status(500).json(error);
        }

}

const deleteEmergencys = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteEmergencys = await Emergency.findByIdAndDelete(id);
        if (!deleteEmergencys) {
            return res.status(404).json({message:"no tenemos ese emergency con ese ID"});
        }
        return res.status(200).json(deleteEmergencys);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    getEmergencys, postEmergencys, putEmergencys, deleteEmergencys
}