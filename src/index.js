const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const { tokenGenerator } = require('./token');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 400;
const PORT = '3000';
const PASS_MAX_LENGHT = 6;
const talkersPath = path.resolve(__dirname, './talker.json');

app.get('/talker', async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(talkersPath));
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(talkersPath));
  const filter = talkers.find((person) => person.id === Number(id));
  if (!filter) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(filter);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < PASS_MAX_LENGHT) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
      );
  }
  if (!/[A-z0-9._]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
      ); 
  }
  res.status(HTTP_OK_STATUS).json({ token: tokenGenerator(16) });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
