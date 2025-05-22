import express from 'express'
import { criarGenero, listarGeneros } from '../controllers/generoController.js'

const router = express.Router()

/**
 * @swagger
 * /generos:
 *   post:
 *     summary: Cria um novo gênero
 *     tags: [Gêneros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
 */
router.post('/', criarGenero)

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Gêneros]
 *     responses:
 *       200:
 *         description: Lista de gêneros
 */
router.get('/', listarGeneros)

export default router
