import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/modules/image/imageS3.service';
import Image from '@entities/image.entity';




//import {} falta o user service

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  //por causa do topic ele pede o category
  providers: [FilesService ],
  controllers: [],
  exports: [FilesService, TypeOrmModule.forFeature([Image])],
})
export class ImageModule {}
