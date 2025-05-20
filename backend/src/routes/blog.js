import express from 'express'
import blogController from '../controllers/blogControllers.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({dest: 'public/'})
router.route('/').get(blogController.get).post(upload.single('image'),blogController.post)

export default router