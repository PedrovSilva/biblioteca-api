import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Genero from '../src/models/Genero.js'

dotenv.config()
mongoose.connect(process.env.MONGODB_URI)

async function seedGeneros() {
  const generos = ['Romance', 'Fantasia', 'Terror', 'História']
  for (const nome of generos) {
    await Genero.updateOne({ nome }, { nome }, { upsert: true })
  }
  console.log('Gêneros inseridos.')
  mongoose.disconnect()
}

seedGeneros()sssssssssssssssssssssssssssssssssssssssssssssssss