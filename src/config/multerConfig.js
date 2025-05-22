import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'

dotenv.config()

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.originalname}`

      // Retornar as informações do arquivo para o MongoDB, incluindo buffer
      resolve({
        filename,
        bucketName: file.fieldname === 'pdf' ? 'pdfs' : 'capas', // Definindo o bucket com base no campo
        metadata: { fieldname: file.fieldname }, // Adicionando metadata opcional
      })
    })
  }
})

const upload = multer({
  storage,
  // Usando `memoryStorage` para armazenar os arquivos como buffers na memória
  storage: multer.memoryStorage(),
})

export default upload
