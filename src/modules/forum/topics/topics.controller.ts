import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from '../../../entities/topic.entity';
import { CreateTopicDTO } from './create-topic.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from '../../profile/user/user.service';

@ApiTags("topics")
@Controller('forum/topics')
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly userService: UserService
    ) {}

 
  @ApiOkResponse({description:"topic succesfully returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Get()
  async findAll(@Query('page') page:number) {
    const{  currentPage,
            results,
            nextPage, 
            prevPage,
            totalRegisters }= await this.topicsService.findAll(page);

      /*for(let i =0; i< results.length; i++){
         const topic = new Topic
         
      }*/
      const data = results
      return {
        data, 
        currentPage,
        nextPage,
        prevPage,
        totalRegisters
      }

  }




  @UseGuards(JwtAuthGuard)
 
  @ApiOkResponse({description:"topic succesfully updated"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createTopicDTO: CreateTopicDTO,
    @Request() req,
  ): Promise<Topic> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    return this.topicsService.update(id, createTopicDTO);
  }




  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
 
  @ApiCreatedResponse({description:"topic succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Post()
  async create(@Body() createTopicDTO: CreateTopicDTO, @Request() req): Promise<Topic> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    /** This assures us integrity references into DB */

    const response = this.topicsService.create(createTopicDTO);

    const category = this.topicsService.findOne(createTopicDTO.category_id);
    const user = this.topicsService.findOne(createTopicDTO.user_id);

    if (!category && !user) {
      const errors = { Error: 'User or Category not passed into' };
      throw new HttpException({ errors }, 401);
    }
    return response;
  }


  @Get('date')
  async getTopicsByDate(){
    return this.topicsService.findWithOrderBy();
  }
/* Função para trazer os topicos sem respostas. Comentado porque ainda não tem o campo Response no banco
  @Get('responseo')
  async getTopicsWithNoResponse(){
    return this.topicsService.findNoResponse();
  }*/

  @Get('categoryId')
  async getTopicsByCategory( @Query('categoryId') categoryId: string){
    return this.topicsService.findByCategory(categoryId);
  }

  
  @ApiOkResponse({description:"topic succesfully returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.findOne(id);
  }



  @UseGuards(JwtAuthGuard)

  @ApiOkResponse({description:"topic succesfully deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    this.topicsService.findOne(id);
    return;
  }
}
