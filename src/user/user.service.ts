import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO  } from './create-user.dto';
import  {User}  from './user.entity';
import { Topic } from '../topics/topic.entity';
import {TopicsService} from '../topics/topics.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private topicService: TopicsService
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where :{
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where :{
        email,
      },
    });
  }

  async findById(id:string): Promise<User>{
    return this.userRepository.findOne({
      where:{
        id,
      }
    });
  }

  async findAll():Promise<User[]>{
    return this.userRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    const topic = new Topic;
    user.name = createUserDTO.name;
    user.userDescription = createUserDTO.userDescription;
    user.role = createUserDTO.role;
    user.avatar = createUserDTO.avatar;
    user.email = createUserDTO.email;
    user.password = createUserDTO.password;
    user.isActive = createUserDTO.isActive;
    user.quarantineNum = createUserDTO.quarentineNum;

    /**Topic has a user,
     * but topic table
     * doesn't need to has
     * its knowledge
     */
    //const topic_id = createUserDTO.topic_id;
    //user.topic = await this.topicService.findOne(topic_id);

    const com = await this.userRepository.create(user)
     this.userRepository.save(com);
     console.log('User created!')
     return user;
  }

  async update(id: string, data: CreateUserDTO ):
  Promise<User> {

      await this.userRepository.update(id, data);
      return this.userRepository.findOne(id);
  }

}