import registerModel from '../models/Employees.js';
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from '../config.js';

const registerController = {};

registerController.Register = async (req, res) => {
    const {name, lastName, birthday, email, hireDate, password, telephone, dui, isssNumber, isVerified } = req.body;
    try{
        const existeEmployee = await registerModel.findOne({email})
        if(existeEmployee){
            return res.status(400).json({message: "El email ya se encuentra registrado"})
        }

        const passwordHash = await bcryptjs.hash(password,10)

        const newEmployee = await registerModel({name, lastName, birthday, email, hireDate, password: passwordHash, telephone, dui, isssNumber, isVerified })

        await newEmployee.save()

        jsonwebtoken.sign(
            {id: newEmployee._id},
            
            config.JWT.secret,

            {expiresIn: config.JWT.expiresIn},

            (err, token) => {
                if(err) console.log({message: "Hubo un error en el token: " + err.message})
                res.cookie("authtoken", token)
            res.json({message: "El empleado se ha registrado correctamente"})
            }

        )
        
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Hubo un error en el registro"})
    }
}
export default registerController;