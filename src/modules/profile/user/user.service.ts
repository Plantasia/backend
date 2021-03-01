import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './create-user.dto';
import { User } from '@entities/user.entity';
import { Topic } from '@entities/topic.entity';
import { TopicsService } from '../../forum/topics/topics.service';
import {PaginatedUsersDTO} from '../paginated-users.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private topicService: TopicsService,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  

  async checkIfAlreadyExists(email:string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(page): Promise<PaginatedUsersDTO> {//preparamos  o metodo para receber o parametro passado pela url na controller
    
    
    const take =3
    /* used to limit registers*/

    const skip =3 * (page-1) 
    /* used to skip the already 
     *  catched up registers */

    if(!page){
      page=1
    }
    else page = parseInt(page)

    const [result, total] = await this.userRepository.findAndCount({
      take:take ,
      skip:skip 
    });    

    const allUsers =[]
    for(let i=0; i< result.length;i++){
  
      const user = new CreateUserDTO()

      user.id = result[i].id
      user.name = result[i].name
      user.email =result[i].email
      user.bio =result[i].bio
      user.avatar =result[i].avatar

      allUsers.push(user)  
    }

    return{
      users:allUsers,
      currentPage:page,      
      prevPage:  page > 1? (page-1): null,
      nextPage:  total > (skip + take) ? page+1 : null,
      perPage:take,
      totalRegisters: total
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(createUserDTO: CreateUserDTO): Promise<Partial<User>> {

    const user = new User();
    user.name = createUserDTO.name;
    user.bio = createUserDTO.bio;
    user.role = createUserDTO.role;
    user.avatar = createUserDTO.avatar;
    user.email = createUserDTO.email;
    user.password = createUserDTO.password;
    user.isAdmin = createUserDTO.isAdmin;
    user.quarentineNum = createUserDTO.quarentineNum;
    user.tokenLogout = createUserDTO.tokenLogout;
  
    const newUser = await this.userRepository.create(user);
    console.log('User created!');
    this.userRepository.save(newUser);

    
    
    const {name,password,email,bio}= newUser

    return {
      name, password,email, bio
    }
  
    
  }

  async update(id: string, data: CreateUserDTO): Promise<User> {
    
    await this.userRepository.update(id, data);

    return this.userRepository.findOne(id);
  }

  async passwordLogout(id: string, passwordLogout: CreateUserDTO): Promise<User> {
    await this.userRepository.update(id, passwordLogout);
    return this.userRepository.findOne(id);
  }

  async passwordLogoutByEmail(userEmail: string, passwordLogout: CreateUserDTO): Promise<Partial<User>> {
    const userToUpdate = (await this.userRepository.findOne(
      {
        where:{
          email:userEmail
        }
      })).id
    const resp =  await this.userRepository.update(userToUpdate, passwordLogout);
    const user = await this.findByEmail(userEmail);

    return user
  }

  async findByToken(token: string): Promise<User> {
    
     console.log("\nFindByToken :***** This is the token  ******\n")
     console.log(token)

     
    const userToCheck= (await this.userRepository.findOne(
      {
  
        where:{
          tokenLogout:token
        }
        }))

    if(!userToCheck){
          throw new UnauthorizedException({error:"Unauthorized"})
    }
    return userToCheck
  

  }

  async authorizationCheck(tokenRequest:string){
    const userToCheck = await this.findByToken(tokenRequest);
    console.log("Check",userToCheck)
    if ((userToCheck.tokenLogout === tokenRequest) || userToCheck){
      return {
        Message: "Valid token ",
      };
    }else {
     
      throw new UnauthorizedException({
        error: 'Unauthorized, your credentials is invalid'
      });
    }

  }

}
