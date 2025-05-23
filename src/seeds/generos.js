// seeds/generos.js
import Genero from '../models/Genero.js';

const generos = [
  { nome: 'Ficção Científica' },
  { nome: 'Fantasia' },
  { nome: 'Romance' },
  { nome: 'Terror' },
  { nome: 'Biografia' }
];

const seedGeneros = async () => {
  for (const genero of generos) {
    await Genero.updateOne(
      { nome: genero.nome },
      { $setOnInsert: genero },
      { upsert: true }
    );
  }
  console.log('Seed de gêneros executado');
};

export default seedGeneros;
