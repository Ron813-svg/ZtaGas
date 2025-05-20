
const employeeControllers = {};

import employeesModels from '../models/Employees.js';

employeeControllers.getEmployees = async (req, res) => {
    const employees = await employeesModels.find();

    res.json(employees);
}

employeeControllers.insertEmployee = async (req, res) => {
    const { name, lastName, birthday, email, hireDate, password, telephone, dui, isssNumber, isVerified } = req.body;
    const newEmployee = new employeesModels({ name, lastName, birthday, email, hireDate, password, telephone, dui, isssNumber, isVerified });
    await newEmployee.save();
}

employeeControllers.deleteEmployee = async (req, res) => {
    await employeesModels.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee delete' });
}

employeeControllers.updateEmployee = async (req, res) => {
    const { name, lastName, birthday, email, hireDate, password, telephone, dui, isssNumber, isss} = req.body;
    const updateEmployee = await employeeControllers.findByIdAndUpdate(req.params.id,
        {name, lastName, birthday, email, hireDate, password, telephone, dui, isssNumber, isss}, {new: true})

        res.json({message: 'Employee updated' });
}

export default employeeControllers;