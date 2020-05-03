// eslint-disable-next-line @typescript-eslint/no-var-requires
const DotEnv = require('dotenv');

const parsedEnv = DotEnv.config().parsed;

module.exports = function () {
  for (const key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }
  return parsedEnv;
};
