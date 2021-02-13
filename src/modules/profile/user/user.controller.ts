import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Request,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { User } from '@entities/user.entity';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AuthService } from '../../../auth/auth.service';
import { create } from 'domain';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Partial<User[]>> {
    console.log(req.headers.authorization)
    console.log(req.user.email);


    const thisUser = await this.userService.findByEmail(req.user.email);

    console.log(`\n\n\n:::::::This user (logged)::::::: \n`)
    console.log(thisUser)


    const check = await this.userService.authorizationCheck(req.headers.authorization)   
    const users = await this.userService.findAll();

    let usersToReturn =[]
    
    for(let i=0; i< users.length;i++){
      
      /**
       * For tests
       console.log("users.length")
       console.log(users.length)

       console.log("users[i]")
       console.log(users[0])
       * 
       **/
     
      const user = new User()

      user.id = users[i].id
      user.name = users[i].name
      user.email =users[i].email
      user.bio =users[i].bio
    

      usersToReturn.push(user)
        
    }   

    return usersToReturn;
  }

  
  @Post()
  @UsePipes(ValidationPipe)
 async create(@Body() createUserDTO: CreateUserDTO): Promise<Partial<User>> {

    const userAlreadyExists = await this.userService.checkIfAlreadyExists(createUserDTO.email)
    console.log("****User already exists?****\n")
    console.log(userAlreadyExists)
    if(userAlreadyExists === undefined || !userAlreadyExists){

      const createdUser =  await this.userService.create(createUserDTO);

      const {name,email,bio, id}= createdUser

      return {
        name,email,bio, id
      }

    }

    else{
      throw new ForbiddenException({error:`The email : ${createUserDTO.email}    is already used!`})
    }
  }


 
  @Get(':id')
 async findOne(@Param('id') idUser: string): Promise<Partial<User>> {

   const foundUser = await this.userService.findById(idUser);

   if(!foundUser){

     throw new NotFoundException(`Error: user with ID: ${idUser} not exists`)
   }

    const selectedUser = await this.userService.findOne(idUser);
    const {name,email,bio,id}= selectedUser;

    return {
      name,email,bio,id
    }
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
 async remove(@Request() req, @Param('id') id: string): Promise<void> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    console.log("thisUser\n\n")
    console.log(thisUser)
    const check = await this.userService.authorizationCheck(req.headers.authorization)
     
      console.log(req.user.email)
      console.log(req.user.id)
      
      /**
       * 
       * For authentication we 'll receive data for request
       * and confirm user's identity for allow deleting
       *  
       */
      const userRequestedToDelete =  await this.userService.findById(id);
      
      console.log(userRequestedToDelete)

      if((userRequestedToDelete.id === req.user.id) &&(userRequestedToDelete.email ===  req.user.email) ){
        return  this.userService.remove(id)
      }
      else{
        
        throw new UnauthorizedException({error:"You are not permitted to remove this user!"})
        
      }
       
   
  }

  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  
  async update(
    @Param('id') idUser: string,
    @Body() createUserDTO: CreateUserDTO,
    @Request() req ): Promise<Partial<User>> {
      const thisUser = await this.userService.findByEmail(req.user.email);
      const check = await this.userService.authorizationCheck(req.headers.authorization)
      
      console.log("\n\n\n****This User\n\n")
      console.log(thisUser)

      console.log("\n\n\n\*****req.user.email*****\n")
      console.log(req.user.email)
      console.log("\n\n\n\*****req.user.id*****\n")
      console.log(req.user.id)
      
      
      const userRequestedToUpdate =  await this.userService.findById(idUser);
      
      //***** */
      if(!userRequestedToUpdate || userRequestedToUpdate ===undefined){
        throw new NotFoundException({error:"This user does not exists"})
      }

      if((userRequestedToUpdate.id === req.user.id) &&(userRequestedToUpdate.email ===  req.user.email) ){
        
        
        userRequestedToUpdate.name = createUserDTO.name;
        userRequestedToUpdate.bio = createUserDTO.bio;
        userRequestedToUpdate. = createUserDTO
     
        console.log(userRequestedToUpdate)
        console.log("***** entrei aqui")
        if(userToUpdate.email!==req.user.email){
          
        }

        const {name,email,bio,id}= userToUpdate

        return {
          name,email,bio,id
        }

      }
      else{
        throw new UnauthorizedException({error:"You are not permitted to update this user!"})
      }
  }
}
