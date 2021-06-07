import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { S3Helper } from '@utils/S3Helper';

@Injectable()
export class FilesService {
  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<{ url: string; path: string }> {
    const path = `${uuid()}-${filename}`;
    const s3 = new S3Helper();

    await s3.upload(path, dataBuffer);
    const url = await s3.getUrl(path);
    return { url, path };
  }
}
