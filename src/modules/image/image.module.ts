import { Module } from '@nestjs/common';
import { FilesService } from 'src/modules/image/imageS3.service';
@Module({
  imports: [],
  providers: [FilesService],
  controllers: [],
  exports: [FilesService],
})
export class ImageModule {}
