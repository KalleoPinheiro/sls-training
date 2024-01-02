const {
  afterAll, beforeAll, describe, it, expect
} = require('@jest/globals')
const { S3 } = require('../../src/factories/s3')
const { main } = require('../../src/functions/hello')

describe('Testing AWS services offline with LocalStack', () => {
  const bucketConfig = {
    Bucket: 'test'
  }

  beforeAll(async () => {
    S3.api.globalEndpoint = 'localhost'
    await S3.createBucket(bucketConfig).promise()
  })

  afterAll(async () => {
    S3.api.globalEndpoint = 'localhost'
    await S3.deleteBucket(bucketConfig).promise()
  })

  it('it should return an array with available buckets', async () => {
    const nameExpected = bucketConfig.Bucket
    const response = await main()

    const { allBuckets: { Buckets } } = JSON.parse(response.body)
    const { Name } = Buckets.find(({ Name }) => Name === nameExpected)

    expect(Name).toStrictEqual(nameExpected)
  })
})