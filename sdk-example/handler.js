'use strict';

const AWS = require('aws-sdk');

const lambda = new AWS.Lambda();

const hello = async (event, context) => {
  const result = await lambda
    .listFunctions({ MaxItems: 10 })
    .promise();

  // immediately return lambda result
  return result;
};

module.exports = {
  hello
};
