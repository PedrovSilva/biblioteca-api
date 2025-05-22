import mongoose from 'mongoose';
import Livro from '../models/Livro.js';
import { GridFSBucket } from 'mongodb';

// Função para criar livro com upload de capa e PDF
export const criarLivro = async (req, res) => {
  try {
    const livro = new Livro({
      titulo: req.body.titulo,
      autor: req.body.autor,
      ano: req.body.ano,
      genero: req.body.genero,
      capaUrl: `/capas/${req.files['capa'][0].filename}`,
      pdfUrl: `/pdfs/${req.files['pdf'][0].filename}`,
    });
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Função para listar todos os livros
export const listarLivros = async (req, res) => {
  try {
    const livros = await Livro.find().populate('genero');
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Função para baixar o arquivo PDF de um livro
export const baixarPdf = async (req, res) => {
  const livroId = req.params.id;
  try {
    const livro = await Livro.findById(livroId);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    // O nome do arquivo PDF deve ser extraído corretamente da URL armazenada
    const nomeArquivoPdf = livro.pdfUrl.split('/').pop(); // Agora pega o nome do arquivo
    console.log('Nome do arquivo PDF:', nomeArquivoPdf); // Para depuração

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

    const stream = bucket.openDownloadStreamByName(nomeArquivoPdf);

    stream.on('error', (err) => {
      console.error('Erro ao abrir stream:', err); // Para depuração
      res.status(404).send('Arquivo PDF não encontrado');
    });

    stream.pipe(res);
  } catch (err) {
    console.error('Erro ao baixar PDF:', err); // Para depuração
    res.status(500).json({ erro: err.message });
  }
};


