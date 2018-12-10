'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/**
 * getS3Record
 * @param {Array} records - S3 records
 * @returns {Array} a list of S3 objects holding bucket and object information
 */
const getS3Record = (records = []) => records.map(({ s3 }) => s3);

/**
 * getS3Img
 * @param {Object} s3Record         - the corresponding s3 record
 * @param {Object} s3Record.bucket  - s3 bucket information
 * @returns {Promise} pending s3 object promise
 */
const getS3Object = ({ bucket, object }) => {
  const params = {
    Key: object.key || '',
    Bucket: bucket.name
  };

  return s3.getObject(params).promise();
};

/**
 * putS3Img
 * @param {*} Body     - the img buffer
 * @param {*} s3Record - the s3 record
 * @param {*} key      - the file name to put into the specific s3 bucket
 */
const putS3Object = (Body, s3Record, key) => {
  const { name: Bucket } = s3Record.bucket;
  return s3.putObject({ Body, Bucket, Key: key }).promise();
};

module.exports = {
  getS3Record,
  getS3Object,
  putS3Object
};
