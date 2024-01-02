const { S3 } = require("../../factories/s3");

module.exports.main = async (event) => {

  const allBuckets = await S3.listBuckets().promise()
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        allBuckets
      },
      null,
      2
    ),
  };
};
