
const brachesControllers = {};

import branchesModels from '../models/Branches.js';


brachesControllers.getBranch = async (req, res) => {
    const branches = await branchesModels.find();

    res.json(branches);
}

brachesControllers.insertBranch = async (req, res) => {
    const { name, address, phone, email, openHours, isAvailable } = req.body;
    const newBranch = new branchesModels({ name, address, phone, email, openHours, isAvailable });
    await newBranch.save();
}

brachesControllers.deleteBranch = async (req, res) => {
    await branchesModels.findByIdAndDelete(req.params.id);
    res.json({ message: 'Branch deleted' });
}
brachesControllers.updateBranch = async (req, res) => {
    const { name, address, telephone, schedule}  = req.body;
    const updateEmployee = await branchesModels.findByIdAndUpdate(req.params.id, 
        { name, address, telephone, schedule}, { new: true });

        res.json({message: "branches updated"});
}

export default brachesControllers;