const User = require('../models/user.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const createUser = async (req, res, next) => {
    try {
        const user = new User();
        user.email = req.body.email;

        //proteger contraseña antes de guardarla en BD
        const salt = 10;
        user.password = await bcrypt.hash(req.body.password, salt);

        //si ya existe un email con ese email, enviar error
        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).json({
                status: 400,
                message: HTTPSTATUSCODE[400],
                data: null
            })
        }
        //sinó, guardar email
        await user.save();
        return res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: null
        });
    } catch (error) {
        next(error);
    }
}

const authenticate = async (req, res, next) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email })
        //comprueba si la contraseña que te envían coincide con la que tienes guardada de ese email
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
        // if (userInfo.password == req.body.password) {
            userInfo.password = null
            const token = jwt.sign(
                {
                    id: userInfo._id,
                    email: userInfo.email
                },
                req.app.get("secretKey"),
                { expiresIn: "1d" }
            );

            //devuelvo el token y email, con la contraseña null
            return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { user: userInfo, token: token },
            });
        } else {
            return res.json({
                status: 400,
                message: HTTPSTATUSCODE[400],
                data: null
            });
        }
    } catch (error) {
        return next(error);
    }
}

//para logout sobreescribimos su token con un null
const logout = (req, res, next) => {
    try {
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            token: null
        });
    } catch (error) {
        return next(error)
    }
}

const getUsers = async(req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json(error);
    }
}

// const postUsers = async(req, res) => {
//     try {
//         // console.log(req.body)
//         const newUser = new User(req.body);
//         // console.log(newUser)
//         const createdUser = await newUser.save() //save sirve para guardar un elemento en la BBDD
//         return res.status(201).json(createdUser)

//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

// const putUsers = async(req, res) => {
//     try {
//         //recoge el parametro de la url que se va a atacar y modificar
//             const {id} = req.params;
//         //Le mandamos al modelo a validar lo que le pasamos
//             const putUsers = new User(req.body);
//         //Actualizamos el _id que genera mongo automaticamente por id para poder trabajar mejor
//             putUsers._id=id; 
//         //Mandamos el id para que sepa cual actualizar
//             const updatedUser = await User.findByIdAndUpdate(id, putUsers, {new:true});
//         //Por si alguien escribe mal el id
//             if (!updatedUser) {
//                 return res.status(404).json({message:"no tenemos ese user con ese ID"});
//             }
//             return res.status(200).json(updatedUser);

//         } catch (error) {
//             return res.status(500).json(error);
//         }

// }

const deleteUsers = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteUsers = await User.findByIdAndDelete(id);
        if (!deleteUsers) {
            return res.status(404).json({message:"no tenemos ese user con ese ID"});
        }
        return res.status(200).json(deleteUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    createUser, authenticate, logout, getUsers, deleteUsers
}