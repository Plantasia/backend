import { Module } from '@nestjs/common';
import { FilesService } from 'src/modules/image/imageS3.service';




//import {} falta o user service

@Module({
  imports: [],
  //por causa do topic ele pede o category
  providers: [FilesService ],
  controllers: [],
  exports: [FilesService],
})
export class ImageModule {}
