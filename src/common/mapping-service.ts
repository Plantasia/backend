import {MappingRegistryService} from './mapping-registry-service';
import {Injectable} from '@nestjs/common';

@Injectable()
export abstract class MappingService {

constructor(
             mappingRegistryService:
             MappingRegistryService){
  mappingRegistryService.registerMappingService(this);
             }


public abstract addMapping():void;

}