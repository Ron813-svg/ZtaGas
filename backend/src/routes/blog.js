import express from 'express'
import blogController from '../controllers/blogControllers.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({dest: 'public/'})
router.route('/').get(blogController.get).post(upload.single('image'),blogController.post)

router.put('/:id', upload.single('image'), blogController.put)
router.delete('/:id', blogController.delete)

export default router