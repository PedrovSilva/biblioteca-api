import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { GridFSBucket } from 'mongodb'
import connectDB from './config/db.js'
import Genero from './models/Genero.js'
import Livro from './models/Livro.js'

dotenv.config()

await connectDB()

const uploadFileToGridFS = async (filePath, bucketName) => {
  return new Promise((resolve, reject) => {
    const conn = mongoose.connection
    const bucket = new GridFSBucket(conn.db, { bucketName })

    const filename = `${Date.now()}-${path.basename(filePath)}`
    const uploadStream = bucket.openUploadStream(filename)
    const fileStream = fs.createReadStream(filePath)

    fileStream.pipe(uploadStream)
      .on('error', (err) => reject(err))
      .on('finish', () => resolve(uploadStream.id.toString(), filename))
  })
}

const seedData = async () => {
  await Genero.deleteMany()
  await Livro.deleteMany()

  const generos = await Genero.insertMany([
    { nome: 'Ficção Científica' },
    { nome: 'Fantasia' },
    { nome: 'Mistério' },
    { nome: 'Romance' },
    { nome: 'História' },
  ])

  console.log('Gêneros criados:', generos)

  const livrosData = [
    {
      titulo: 'Fundação',
      autor: 'Isaac Asimov',
      ano: 1951,
      genero: generos[0]._id,
      capa: './uploads/capas/fundacao-capa.jpg',
      pdf: './uploads/pdfs/fundacao.pdf',
    },
    {
      titulo: 'Harry Potter e a Pedra Filosofal',
      autor: 'J.K. Rowling',
      ano: 1997,
      genero: generos[1]._id,
      capa: './uploads/capas/harry-potter-capa.jpg',
      pdf: './uploads/pdfs/harry-potter.pdf',
    },
    {
      titulo: 'O Caso dos Dez Negrinhos',
      autor: 'Agatha Christie',
      ano: 1939,
      genero: generos[2]._id,
      capa: './uploads/capas/dez-negrinhos-capa.jpg',
      pdf: './uploads/pdfs/dez-negrinhos.pdf',
    },
  ]

  for (const livro of livrosData) {
    try {
      const capaFilename = `${Date.now()}-${path.basename(livro.capa)}`
      const pdfFilename = `${Date.now()}-${path.basename(livro.pdf)}`

      await uploadFileToGridFS(livro.capa, 'capas')
      await uploadFileToGridFS(livro.pdf, 'pdfs')

      await Livro.create({
        titulo: livro.titulo,
        autor: livro.autor,
        ano: livro.ano,
        genero: livro.genero,
        capaUrl: `/capas/${capaFilename}`,
        pdfUrl: `/pdfs/${pdfFilename}`,
      })

      console.log(`Livro "${livro.titulo}" criado com arquivos.`)
    } catch (err) {
      console.error(`Erro ao criar livro "${livro.titulo}":`, err.message)
    }
  }

  mongoose.connection.close()
}

seedData().catch(err => console.error('Erro ao rodar seed:', err))
