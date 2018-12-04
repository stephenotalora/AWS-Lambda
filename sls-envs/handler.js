'use strict';

const testEnv = async (event, context) => {
  return process.env.NODE_ENV
};

module.exports = {
  testEnv
};
