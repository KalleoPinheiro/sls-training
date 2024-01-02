const AWS = require('aws-sdk')

const s3Config = {
  region: 'us-east-1',
  s3ForcePathStyle: true
}

const host = process.env.LOCALSTACK_HOST || "localhost"
s3Config.endpoint = new AWS.Endpoint(`http://${host}:4566`)


const S3 = new AWS.S3(s3Config)
S3.api.globalEndpoint = 'localhost'

module.exports = {
  S3
}