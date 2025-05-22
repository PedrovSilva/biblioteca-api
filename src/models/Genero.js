import mongoose from 'mongoose'

const generoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }
})

export default mongoose.model('Genero',  generoSchema)
