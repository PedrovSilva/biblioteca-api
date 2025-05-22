import Livro from '../models/Livro.js'

export const criarLivro = async (req, res) => {
  try {
    const livro = new Livro({
      titulo: req.body.titulo,
      autor: req.body.autor,
      ano: req.body.ano,
      genero: req.body.genero,
      capaUrl: `/capas/${req.files['capa'][0].filename}`,
      pdfUrl: `/pdfs/${req.files['pdf'][0].filename}`
    })
    await livro.save()
    res.status(201).json(livro)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}

export const listarLivros = async (req, res) => {
  const livros = await Livro.find().populate('genero')
  res.json(livros)
}
