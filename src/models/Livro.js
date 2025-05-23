import mongoose from 'mongoose'

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true },
  capa: { type: Buffer, required: true }, // Armazena o conteúdo da capa como buffer
  pdf: { type: Buffer, required: true },   // Armazena o conteúdo do PDF como buffer
});

export default mongoose.model('Livro', livroSchema)
