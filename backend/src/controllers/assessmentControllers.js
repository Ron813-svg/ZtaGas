
const assessmentControllers = {};

import assessmentModels from "../models/Assessment.js";

assessmentControllers.getAssessments = async (req, res) => {
    const assessments = await assessmentModels.find().populate("idProduct")
    res.json(assessments)
}

assessmentControllers.insertAssessment = async (req, res) => {
    const {  comments, grade , role, idEmployee } = req.body;
    const newAssessment = new assessmentModels({ comments, grade, role, idEmployee });
    await newAssessment.save()
    res.json({ message: "Assessment added" });
}

assessmentControllers.updateAssessment = async (req, res) => {
    const { comments, grade, role, idEmployee } = req.body;
    const updateAssessment = await assessmentModels.findByIdAndUpdate(req.params.id, { comments, grade, role, idEmployee }, { new: true });
    res.json({ message: "Assessment updated" });
}

assessmentControllers.deleteAssessment = async (req, res) => {
    await assessmentModels.findByIdAndDelete(req.params.id);
    res.json({ message: "Assessment deleted" });
}

export default assessmentControllers;