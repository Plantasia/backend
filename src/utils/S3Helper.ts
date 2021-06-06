import { S3 } from 'aws-sdk';
export class S3Helper {
  AWS_S3_BUCKET_NAME = process.env.AWS_PUBLIC_BUCKET_NAME;
  client: S3 = new S3();

  async upload(path: string, buffer: Buffer): Promise<void> {
    await this.client
      .upload({
        Bucket: this.AWS_S3_BUCKET_NAME,
        Body: buffer,
        Key: path,
      })
      .promise();
  }
  async getUrl(path: string, seconds: number = 60 * 60 * 24): Promise<string> {
    return this.client.getSignedUrl('getObject', {
      Bucket: this.AWS_S3_BUCKET_NAME,
      Key: path,
      Expires: seconds,
    });
  }
}
