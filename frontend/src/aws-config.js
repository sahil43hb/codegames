// aws-config.js
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`,
    region: `${process.env.REACT_APP_AWS_BACKET_REGION}`
});

module.exports = AWS;
