const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { tokenGenerator } = require('./token');
const {
  validateEmail,
  validatePassword,
  validateAuth,
  validateName,
  validateAge,

  validateWatch,
  validateRate,
  validateTalk,
} = require('./middlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkersPath = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

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

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = tokenGenerator(16);
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
validateAuth,
validateName,
validateAge,
validateTalk,
validateWatch,
validateRate,
 async (req, res) => {
   const talkers = JSON.parse(await fs.readFile(talkersPath));
   const newTalker = ({ id: talkers.length + 1, ...req.body });
  talkers.push(newTalker);
  await fs.writeFile(talkersPath, JSON.stringify(talkers));
  res.status(201).json(newTalker);
});

app.put('/talker/:id',
validateAuth,
validateName,
validateAge,
validateTalk,
validateWatch,
validateRate,
async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(talkersPath));
  const index = talkers.findIndex((t) => t.id === Number(id));
  talkers[index] = { ...talkers[index], ...req.body };
  await fs.writeFile(talkersPath, JSON.stringify(talkers));
  res.status(HTTP_OK_STATUS).json(talkers[index]);
});

app.delete('/talker/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(talkersPath));
  const newList = talkers.filter((t) => t.id !== Number(id));
  await fs.writeFile(talkersPath, JSON.stringify(newList));
  res.status(204).json(newList);
});

app.get('/talker/search', validateAuth, async (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(await fs.readFile(talkersPath));
  const filter = talkers.filter((t) => talkers.name.includes(q));
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }
  res.status(HTTP_OK_STATUS).json(filter);
});

app.listen(PORT, () => {
  console.log('Online');
});