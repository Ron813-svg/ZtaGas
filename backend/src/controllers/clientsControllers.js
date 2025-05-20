
const clientsControllers = {};

import clientsModels from '../models/Clients.js';

clientsControllers.getClients = async (req, res) => {
    const clients = await clientsModels.find();

    res.json(clients);
}

clientsControllers.insertClient = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified  } = req.body;
    const newClient = new clientsModels({ name, lastName, birthday, email, password, telephone, dui, isVerified });
    await newClient.save();
}


clientsControllers.deleteClient = async (req, res) => {
    await clientsModels.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
}

clientsControllers.updateClient = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body;
    const updateClient = await clientsModels.findByIdAndUpdate(req.params.id, 
        { name, lastName, birthday, email, password, telephone, dui, isVerified }, {new: true})

        res.json({message: "Client updated successfully"});
}

export default clientsControllers;