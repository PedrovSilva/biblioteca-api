import mongoose from 'mongoose';
import Livro from '../models/Livro.js';
import { GridFSBucket } from 'mongodb';

// Função para criar livro com upload de capa e PDF
export const criarLivro = async (req, res) => {
  try {
    // Pegando os arquivos de capa e pdf como buffers
    const capaBuffer = req.files['capa'][0].buffer;
    const pdfBuffer = req.files['pdf'][0].buffer;

    // Cria o livro com os buffers dos arquivos
    const livro = new Livro({
      titulo: req.body.titulo,
      autor: req.body.autor,
      ano: req.body.ano,
      genero: req.body.genero,
      capa: capaBuffer,  // Salva o Buffer da capa
      pdf: pdfBuffer,    // Salva o Buffer do PDF
    });

    // Salva o livro no banco de dados
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
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

    const pdfBuffer = livro.pdf; // Recupera o Buffer do PDF

    if (!pdfBuffer) {
      return res.status(404).json({ erro: 'Arquivo PDF não encontrado' });
    }

    // Define o tipo MIME como 'application/pdf'
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer); // Envia o buffer como resposta
  } catch (err) {
    console.error('Erro ao baixar PDF:', err);
    res.status(500).json({ erro: err.message });
  }
};

// Função para exibir a capa do livro
export const exibirCapa = async (req, res) => {
  const livroId = req.params.id; // Recebe o ID do livro

  try {
    const livro = await Livro.findById(livroId); // Encontra o livro no banco
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    const capaBuffer = livro.capa; // Recupera o Buffer da capa

    if (!capaBuffer) {
      return res.status(404).json({ erro: 'Capa não encontrada' });
    }

    // Define o tipo MIME como 'image/jpeg' (ou outro tipo de imagem conforme necessário)
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(capaBuffer); // Envia a imagem diretamente como resposta
  } catch (err) {
    console.error('Erro ao exibir a capa:', err);
    res.status(500).json({ erro: err.message });
  }
};

export const listarLivros = async (req, res) => {
  try {
    // Buscar todos os livros com título, id e capa
    const livros = await Livro.find({}, 'titulo _id capa'); // Busca apenas título, ID e capa

    if (!livros || livros.length === 0) {
      return res.status(404).json({ erro: 'Nenhum livro encontrado' });
    }

    // Mapear os livros e retornar a capa como buffer
    const livrosComCapas = livros.map((livro) => {
      return {
        _id: livro._id,
        titulo: livro.titulo,
        capa: livro.capa ? livro.capa.toString('base64') : null, // Convertendo o buffer da capa para base64
      };
    });

    // Retornar os livros com as informações necessárias (incluindo o buffer da capa)
    res.status(200).json(livrosComCapas);
  } catch (err) {
    console.error('Erro ao listar livros:', err);
    res.status(500).json({ erro: err.message });
  }
};

export const obterLivro = async (req, res) => {
  const livroId = req.params.id;

  try {
    // Busca o livro pelo ID, excluindo o campo PDF
    const livro = await Livro.findById(livroId, { pdf: 0 });

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    // Converte a capa para base64, se existir
    const livroObj = livro.toObject();
    if (livroObj.capa) {
      livroObj.capa = livroObj.capa.toString('base64');
    }

    res.status(200).json(livroObj);
  } catch (err) {
    console.error('Erro ao obter livro:', err);
    res.status(500).json({ erro: err.message });
  }
};
