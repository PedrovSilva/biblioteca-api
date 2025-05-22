import mongoose from 'mongoose'

const livroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  ano: Number,
  genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero' },
  capaUrl: String,
  pdfUrl: String
})

export default mongoose.model('Livro', livroSchema)
