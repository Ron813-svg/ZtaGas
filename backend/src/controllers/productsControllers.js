/*Este archivo tiene los metodos del crud (Select, insert, uodate y delete)*/

//Creo un array de funciones


const productsController = {};

//Igual, mandamos a llamar el esquema desde models, el products.js, no se te olvide el .js
import productsModel from "../models/Products.js";

//Select
productsController.getProducts =  async (req, res) => {
    const products = await productsModel.find()

    res.json(products)
}

//Insert
productsController.insertProducts = async (req, res) =>{
    const { name, description, price, stock } = req.body;
    const newProduct = new productsModel({ name,description,price,stock })
    await newProduct.save()
}

//Delete
productsController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Product Delete"})
}

//Update
productsController.updateProducts = async (req, res) => {
    const { name, description, price, stock} = req.body;
    const updateProducts = await productsModel.findByIdAndUpdate(req.params.id, 
        {name, description, price, stock}, {new: true})


        res.json({message: "product updated successfully"});
}

export default productsController;