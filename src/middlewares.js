// Data REGEX: https://www.regextester.com/99555

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!/[A-z0-9._]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
    return res.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
      ); 
  }
  return next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
      );
    }
 return next();
}

function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
 return next();
}

function validateAge(req, res, next) {
 const { age } = req.body;
 if (!age || age === '') {
  return res.status(400).json({ message: 'O campo "age" é obrigatório' });
 }
 if (Number(age) < 18) {
  return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
 }
 return next();
}

function validateWatch(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dataRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
}

function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  return next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || talk === '') {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
}

module.exports = {
  validateEmail,
  validatePassword,
  validateAuth,
  validateName,
  validateAge,
  validateTalk,
  validateWatch,
  validateRate,
};