import blogModel from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import mongoose from "mongoose"

const blogController = {};

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

blogController.get = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error al obtener blogs:", error);
    res.status(500).json({ error: "Error al obtener blogs" });
  }
};

blogController.post = async (req, res) => {
  try {
    const { title, content } = req.body;
    let imgUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imgUrl = result.secure_url;
    }

    const newBlog = new blogModel({ title, content, image: imgUrl });
    await newBlog.save();

    res.json({ message: "Blog guardado correctamente", blog: newBlog });
  } catch (error) {
    console.error("Error al guardar el blog:", error);
    res.status(500).json({ error: "Error al guardar el blog" });
  }
};

/*blogController.put = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    let imgUrl = "";

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ error: "ID inválido" })
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imgUrl = result.secure_url;
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { title, content, image: imgUrl },
      { new: true }
    );
// 
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    res.json({ message: "Blog actualizado correctamente", blog: updatedBlog });
  } catch (error) {
    console.error("Error al actualizar el blog:", error);
    res.status(500).json({ error: "Error al actualizar el blog" });
  }
};*/

blogController.put = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    let imgUrl;

    const existingBlog = await blogModel.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "public",
          allowed_formats: ["jpg", "png", "jpeg"],
        });
        imgUrl = result.secure_url;
      } catch (error) {
        console.error("Error al subir imagen:", error);
        return res.status(500).json({ error: "Error al subir la imagen" });
      }
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { title, content, image: imgUrl || existingBlog.image },
      { new: true }
    );

    res.json({ message: "Blog actualizado correctamente", blog: updatedBlog });
  } catch (error) {
    console.error("Error al actualizar el blog:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


blogController.delete = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }
  
      const deletedBlog = await blogModel.findByIdAndDelete(id);
  
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog no encontrado" });
      }
  
      res.json({ message: "Blog eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el blog:", error);
      res.status(500).json({ error: "Error al eliminar el blog" });
    }
  }

export default blogController;
