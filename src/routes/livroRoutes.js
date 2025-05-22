import express from 'express'
import upload from '../config/multerConfig.js'
import { criarLivro, listarLivros } from '../controllers/livroController.js'

const router = express.Router()

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
)

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros com seus respectivos gêneros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   autor:
 *                     type: string
 *                   ano:
 *                     type: integer
 *                   genero:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nome:
 *                         type: string
 *                   capaUrl:
 *                     type: string
 *                   pdfUrl:
 *                     type: string
 */
router.get('/', listarLivros)

export default router
