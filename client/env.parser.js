// eslint-disable-next-line @typescript-eslint/no-var-requires
const DotEnv = require('dotenv');

const parsedEnv = DotEnv.config().parsed;

/**
 * NOT MORE NECCESARY parse to JSON.stringify with Quasar 2
 */
module.exports = function () {
  // for (const key in parsedEnv) {
  //   if (typeof parsedEnv[key] === 'string') {
  //     // eslint-disable-next-line no-self-assign
  //     parsedEnv[key] = JSON.stringify(parsedEnv[key]);
  //   }
  // }
  return parsedEnv;
};
