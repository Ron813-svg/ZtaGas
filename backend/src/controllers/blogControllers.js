import blogModel from "../models/blog.js"
import {v2 as cloudinary} from 'cloudinary'
import { config } from "../config.js"

const blogController = {}

cloudinary.config({
    cloud_name:  config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

blogController.get = async(req,res) =>{
    const blog = await blogModel.find()
    res.json(blog)
}

blogController.post = async(req,res) => {
    try {
        const { title, content } = req.body
        let imgUrl = ""

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats:['jpg', 'png', 'jpeg']})
            imgUrl = result.secure_url
        }

        const newBlog = new blogModel({title, content, image: imgUrl})
        newBlog.save()

        res.json({message: "Blog saved"})


    } catch (error) {
        console.log('error'+ error)
    }
}  

export default blogController