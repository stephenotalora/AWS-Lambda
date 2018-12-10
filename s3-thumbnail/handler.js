'use strict';

const sharp = require('sharp');
const { getS3Object, getS3Record, putS3Object } = require('./utils/s3-utils');

const { THUMBNAIL_SIZE } = process.env;
const PREFIX_LENGTH = 4;

/**
 * getThumbnailName
 * @param {Object} s3Object     - the s3 record containing infromation about the object in the bucket
 * @param {String} s3Object.key - the s3 record object key
 * @returns {String} the thumbnail name
 */
const getThumbnailName = ({ key = '' }) => {
  const name = key.substring(0, key.length - PREFIX_LENGTH);
  return `${name}_${Date.now()}_thumbnail.jpg`;
};

/**
 * convertToThumbnail
 * @param {Buffer} Body - the buffer to reszie
 * @returns {Promise} the pending promise containing the resize img
 */
const convertToThumbnail = ({ Body = Buffer.alloc() }) => sharp(Body)
  .resize(Number(THUMBNAIL_SIZE))
  .toBuffer();

const imgConverter = async (event, context) => {
  console.log('processing event: ', JSON.stringify(event, null, 2));

  const { Records = [] } = event;
  const s3Records = getS3Record(Records);

  // get images and convert to thumbnails
  const imgs = await Promise.all(s3Records.map(getS3Object));
  const imgThumbnails = await Promise.all(imgs.map(convertToThumbnail));

  // create thubmnails in s3 bucket
  const thumbnailNames = s3Records.map((record) => getThumbnailName(record.object));
  const requests = imgThumbnails.map((body, idx) => putS3Object(body, s3Records[idx], thumbnailNames[idx]));

  const results = await Promise.all(requests);
  console.log('total events processed: ', results.length);
};

module.exports = {
  imgConverter
};
