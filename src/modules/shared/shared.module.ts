import { Module } from '@nestjs/common';
import { FilesService } from 'src/modules/image/imageS3.service';
import { ImageModule } from '../image/image.module';




//import {} falta o user service

@Module({
  imports: [ImageModule],
  //por causa do topic ele pede o category
  providers: [FilesService],
  controllers: [],
  exports: [ImageModule],
})
export class SharedModule {}
