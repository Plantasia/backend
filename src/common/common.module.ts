import { Module } from '@nestjs/common';
import { MappingRegistryService } from './mapping-registry-service';

@Module({
  imports:[],
  providers:[MappingRegistryService],
  controllers:[],
  exports:[MappingRegistryService]
})
export class CommonModule {}
