import { S3 } from 'aws-sdk';
export class S3Helper {
  AWS_PUBLIC_BUCKET_NAME: string;
  client: S3;
  constructor() {
    const { AWS_PUBLIC_BUCKET_NAME, AWS_REGION } = process.env;
    this.AWS_PUBLIC_BUCKET_NAME = AWS_PUBLIC_BUCKET_NAME;

    this.client = new S3({ region: AWS_REGION });
  }

  async upload(path: string, buffer: Buffer): Promise<void> {
    await this.client
      .upload({
        Bucket: this.AWS_PUBLIC_BUCKET_NAME,
        Body: buffer,
        Key: path,
      })
      .promise();
  }
  async getUrl(path: string, seconds: number = 60 * 60 * 24): Promise<string> {
    return this.client.getSignedUrl('getObject', {
      Bucket: this.AWS_PUBLIC_BUCKET_NAME,
      Key: path,
      Expires: seconds,
    });
  }
}
