import Genero from '../models/Genero.js'

export const criarGenero = async (req, res) => {
  try {
    const genero = new Genero(req.body)
    await genero.save()
    res.status(201).json(genero)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}

export const listarGeneros = async (req, res) => {
  const generos = await Genero.find()
  res.json(generos)
}
