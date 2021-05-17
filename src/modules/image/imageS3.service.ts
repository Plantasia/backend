import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Image from '../../entities/image.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
 
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Image)
    private publicFilesRepository: Repository<Image>,
   
  ) {}
 
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const AWS_S3_BUCKET_NAME = process.env.AWS_PUBLIC_BUCKET_NAME;
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: AWS_S3_BUCKET_NAME,
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }
}