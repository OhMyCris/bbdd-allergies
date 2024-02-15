const Food = require('../models/food.model')

const getFoods = async(req, res) => {
    try {
        const allFoods = await Food.find();
        return res.status(200).json(allFoods)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postFoods = async(req, res) => {
    try {
        // console.log(req.body)
        const newFood = new Food(req.body);
        // console.log(newFood)
        const createdFood = await newFood.save() //save sirve para guardar un elemento en la BBDD
        return res.status(201).json(createdFood)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const putFoods = async(req, res) => {
    try {
        //recoge el parametro de la url que se va a atacar y modificar
            const {id} = req.params;
        //Le mandamos al modelo a validar lo que le pasamos
            const putFoods = new Food(req.body);
        //Actualizamos el _id que genera mongo automaticamente por id para poder trabajar mejor
            putFoods._id=id; 
        //Mandamos el id para que sepa cual actualizar
            const updatedFood = await Food.findByIdAndUpdate(id, putFoods, {new:true});
        //Por si alguien escribe mal el id
            if (!updatedFood) {
                return res.status(404).json({message:"no tenemos ese food con ese ID"});
            }
            return res.status(200).json(updatedFood);

        } catch (error) {
            return res.status(500).json(error);
        }

}

const deleteFoods = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteFoods = await Food.findByIdAndDelete(id);
        if (!deleteFoods) {
            return res.status(404).json({message:"no tenemos ese food con ese ID"});
        }
        return res.status(200).json(deleteFoods);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getFoodByQr = async (req, res) => {
    try {
        const itemQr = req.params.qr
        const food = await Food.findOne({"QR": itemQr})
        console.log(itemQr)
        return res.status(200).json(food)
    } catch (error) {
        return res.status(500).json({message: `Food with QR ${itemQr} not found`})
    }
}

const getFoodByBarcode = async (req, res) => {
    try {
        const itemBarcode = req.params.barcode
        const food = await Food.findOne({"barcode": itemBarcode})
        return res.status(200).json(food)
    } catch (error) {
        return res.status(500).json({message: `Food with Barcode ${itemBarcode} not found`})
    }
}


module.exports = {
    getFoods, postFoods, putFoods, deleteFoods, getFoodByQr, getFoodByBarcode
}