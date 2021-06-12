import { FindAllModel } from './api-model/find-all-model';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@entities/user.entity';
import { FilesService } from '../../image/imageS3.service';
import UserModel from './api-model/user-default-model';
import { UserDTO } from './dto/default-user-dto';
import { NewPasswordDto } from '@src/auth/newPassworDTO';

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

  async checkIfAlreadyExists(email: string): Promise<void> {
    if (this.userRepository.findOne({ where: { email } }))
      throw new ForbiddenException({
        error: `O email : ${email} já esta sendo usado!`,
      });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<UserModel> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(page): Promise<FindAllModel> {
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
      const user = new User();
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

  async adminFindAll(): Promise<User[]> {
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
      where: [{ isAdmin: true }],
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(data: CreateUserDTO): Promise<UserModel> {
    const user = new User();
    user.name = data.name;
    user.bio = data.bio;
    user.role = data.role;
    user.email = data.email;
    user.password = data.password;
    user.quarentineNum = data.quarentineNum;
    user.tokenLogout = data.tokenLogout;

    const newUser = await this.userRepository.create(user);
    console.log('User created!');
    this.userRepository.save(newUser);

    const { id, name, email, bio } = newUser;

    return {
      id,
      name,
      email,
      bio,
    };
  }

  async update(
    id: string,
    data: { bio: string; name: string; avatar?: string },
  ): Promise<UserModel> {
    const { avatar, bio, name } = data;
    const user = new User();

    if (avatar) user.avatar = avatar;
    user.bio = bio;
    user.name = name;
    await this.userRepository.update(id, data);
    return this.userRepository.findOne(id);
  }

  async passwordLogout(id: string, userData: UserDTO): Promise<UserModel> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne(id);
  }

  async passwordLogoutByEmail(
    userEmail: string,
    userData: UserDTO,
  ): Promise<UserModel> {
    const userToUpdate = (
      await this.userRepository.findOne({
        where: {
          email: userEmail,
        },
      })
    ).id;
    const resp = await this.userRepository.update(userToUpdate, userData);
    const user = await this.findByEmail(userEmail);

    return user;
  }

  async findByToken(token: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        tokenLogout: token,
      },
    });

    if (!user) {
      throw new UnauthorizedException({ error: 'Unauthorized' });
    }
    return user;
  }
  async findMe(token: string) {
    const {
      bio,
      email,
      id,
      created_at,
      name,
      avatarUrl,
    } = await this.findByToken(token);

    return { bio, email, id, created_at, name, avatarUrl };
  }

  async authorizationCheck(tokenRequest: string): Promise<void> {
    const user = await this.findByToken(tokenRequest);
    if (!(user && (user.tokenLogout === tokenRequest || user.isAdmin)))
      throw new UnauthorizedException({
        error: 'Não autorizado, seu token esta inválido',
      });
  }
  async changePassword(id: string, password: NewPasswordDto): Promise<string> {
    await this.userRepository.update(id, password);
    const user = await this.findOne(id);
    console.log(user);
    return user.password;
  }

  async findByRecoverToken(recoverToken: string): Promise<UserModel> {
    const idUser = await this.userRepository.findOne({
      where: {
        recoverToken: recoverToken,
      },
    });
    return idUser;
  }

  async addAvatar(
    userId: string,
    imageBuffer: Buffer,
    filename: string,
  ): Promise<string> {
    const { path: avatar, url } = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.findById(userId);
    await this.userRepository.update(userId, {
      ...user,
      avatar,
    });
    return url;
  }
}
