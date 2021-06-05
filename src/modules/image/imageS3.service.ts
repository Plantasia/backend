import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor() {}

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<string> {
    const AWS_S3_BUCKET_NAME = process.env.AWS_PUBLIC_BUCKET_NAME;
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: AWS_S3_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return uploadResult.Location;
  }
}
