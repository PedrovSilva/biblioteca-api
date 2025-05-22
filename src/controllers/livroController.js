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
      capaUrl: req.files['capa'][0]._id,  // Armazena o _id da capa no GridFS
      pdfUrl: req.files['pdf'][0]._id    // Armazena o _id do PDF no GridFS
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

    // Verifica se o pdfId é válido
    const pdfId = livro.pdfUrl; // O _id do PDF
    if (!mongoose.Types.ObjectId.isValid(pdfId)) {
      return res.status(404).json({ erro: 'Arquivo PDF não encontrado' });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

    // Abre o stream para o arquivo PDF
    const stream = bucket.openDownloadStream(pdfId);

    stream.on('error', (err) => {
      console.error('Erro ao abrir stream do PDF:', err); // Para depuração
      res.status(404).send('Arquivo PDF não encontrado');
    });

    // Pipe o conteúdo do PDF para a resposta
    stream.pipe(res);
  } catch (err) {
    console.error('Erro ao baixar PDF:', err); // Para depuração
    res.status(500).json({ erro: err.message });
  }
};

export const exibirCapa = async (req, res) => {
  const livroId = req.params.id; // Recebe o ID do livro
  try {
    const livro = await Livro.findById(livroId); // Encontra o livro no banco
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    // O campo capaUrl armazena o _id do arquivo no GridFS
    const capaId = livro.capaUrl; // Aqui você já tem o _id do arquivo no GridFS
    if (!capaId) {
      return res.status(404).json({ erro: 'Capa não encontrada' });
    }

    console.log('ID do arquivo da capa:', capaId); // Para depuração

    const db = mongoose.connection.db; // Conexão com o banco de dados
    const bucket = new GridFSBucket(db, { bucketName: 'capas' }); // Cria o bucket para a coleção de capas

    const stream = bucket.openDownloadStream(capaId); // Usando o _id do GridFS para acessar o arquivo

    stream.on('error', (err) => {
      console.error('Erro ao abrir stream:', err); // Para depuração
      res.status(404).send('Arquivo da capa não encontrado');
    });

    stream.pipe(res); // Envia a imagem diretamente para a resposta HTTP
  } catch (err) {
    console.error('Erro ao baixar a capa:', err); // Para depuração
    res.status(500).json({ erro: err.message });
  }
};
