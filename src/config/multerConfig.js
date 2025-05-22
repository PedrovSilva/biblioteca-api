import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'

dotenv.config()

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    const filename = `${Date.now()}-${file.originalname}`
    return {
      filename,
      bucketName: file.fieldname === 'pdf' ? 'pdfs' : 'capas'
    }
  }
})

const upload = multer({ storage })

export default upload
