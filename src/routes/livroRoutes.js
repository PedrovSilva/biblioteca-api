import express from 'express';
import upload from '../config/multerConfig.js';
import { criarLivro, listarLivros, baixarPdf, exibirCapa, obterLivro } from '../controllers/livroController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Operações relacionadas a livros
 */

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro com upload de capa e PDF
 *     tags: [Livros]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               genero:
 *                 type: string
 *                 description: ID do gênero (ObjectId)
 *               capa:
 *                 type: string
 *                 format: binary
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post(
  '/',
  upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  criarLivro
);

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros com título, ID e capa em base64
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros com título, ID e capa em base64
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID do livro
 *                   titulo:
 *                     type: string
 *                     description: Título do livro
 *                   capa:
 *                     type: string
 *                     format: base64
 *                     description: Capa do livro codificada em base64
 *       404:
 *         description: Nenhum livro encontrado
 *       500:
 *         description: Erro interno no servidor
 */

router.get('/', listarLivros);

/**
 * @swagger
 * /livros/{id}/pdf:
 *   get:
 *     summary: Baixar o PDF do livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: PDF do livro retornado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Livro ou arquivo PDF não encontrado
 */
router.get('/:id/pdf', baixarPdf);

/**
 * @swagger
 * /livros/{id}/capa:
 *   get:
 *     summary: Exibe a capa do livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A capa do livro
 *       404:
 *         description: Livro ou capa não encontrados
 */
router.get('/:id/capa', exibirCapa);

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Retorna os dados de um livro (exceto o PDF)
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do livro retornado com sucesso
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', obterLivro);


export default router;
