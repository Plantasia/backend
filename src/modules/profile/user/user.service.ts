import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './create-user.dto';
import { User } from '@entities/user.entity';
import { FilesService } from '../../image/imageS3.service';
import { PaginatedUsersDTO } from '../paginated-users.dto';
import { String } from 'aws-sdk/clients/appstream';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private filesService: FilesService,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async checkIfAlreadyExists(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
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

  async findAll(page): Promise<PaginatedUsersDTO> {
    const take = 10;
    const skip = 10 * (page - 1);

    if (!page) {
      page = 1;
    } else page = parseInt(page);

    const [result, total] = await this.userRepository.findAndCount({
      take: take,
      skip: skip,
    });

    const allUsers = result.map(({ id, name, bio, avatar }) => {
      const user = new CreateUserDTO();
      user.id = id;
      user.name = name;
      user.bio = bio;
      user.avatar = avatar;
      return user;
    });

    return {
      users: allUsers,
      currentPage: page,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: total > skip + take ? page + 1 : null,
      perPage: take,
      totalRegisters: total,
    };
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async adminFindAll() {
    return this.userRepository.find({
      select: [
        'name',
        'id',
        'avatar',
        'bio',
        'isAdmin',
        'created_at',
        'updated_at',
        'deleted_at',
      ],
    });
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

    const { name, password, email, bio } = newUser;

    return {
      name,
      password,
      email,
      bio,
    };
  }

  async update(id: string, data: any): Promise<User> {
    await this.userRepository.update(id, data);

    return this.userRepository.findOne(id);
  }

  async passwordLogout(
    id: string,
    passwordLogout: CreateUserDTO,
  ): Promise<User> {
    await this.userRepository.update(id, passwordLogout);
    return this.userRepository.findOne(id);
  }

  async passwordLogoutByEmail(
    userEmail: string,
    passwordLogout: CreateUserDTO,
  ): Promise<Partial<User>> {
    const userToUpdate = (
      await this.userRepository.findOne({
        where: {
          email: userEmail,
        },
      })
    ).id;
    const resp = await this.userRepository.update(userToUpdate, passwordLogout);
    const user = await this.findByEmail(userEmail);

    return user;
  }

  async findByToken(token: string): Promise<User> {
    const userToCheck = await this.userRepository.findOne({
      where: {
        tokenLogout: token,
      },
    });

    if (!userToCheck) {
      throw new UnauthorizedException({ error: 'Unauthorized' });
    }

    return userToCheck;
  }

  async authorizationCheck(tokenRequest: string) {
    const userToCheck = await this.findByToken(tokenRequest);
    if (userToCheck.tokenLogout === tokenRequest || userToCheck) {
      return {
        Message: 'Valid token ',
      };
    } else {
      throw new UnauthorizedException({
        error: 'Unauthorized, your credentials is invalid',
      });
    }
  }
  async changePassword(id: string, password: CreateUserDTO) {
    const user = await this.findOne(id);
    console.log(user);
    const newPassword = await this.userRepository.update(id, password);
    console.log(newPassword);

    return newPassword;
  }

  async findByRecoverToken(recoverToken: string) {
    const idUser = await this.userRepository.findOne({
      where: {
        recoverToken: recoverToken,
      },
    });
    return idUser;
  }

  async addAvatar(userId:String, imageBuffer: Buffer, filename: string) {
    const avatarS3 = await this.filesService.uploadPublicFile(imageBuffer, filename);
    const user = await this.findById(userId);
    await this.userRepository.update(userId, {
      ...user,
      avatarS3
    });
    return avatarS3;
  }
}
