// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

const rand = () => Math.random(0).toString(36).substr(2);

function tokenGenerator(n) {
  return (rand() + rand() + rand() + rand()).substr(0, n);
}

module.exports = {
  tokenGenerator,
};
