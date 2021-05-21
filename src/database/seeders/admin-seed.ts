import { User } from '../../entities/user.entity';
import { internet, name, random } from 'faker';
import { createConnection, getConnection, getRepository } from 'typeorm';
import UserSeed from './user-seed';

export default async function AdminSeed(verifyRun: boolean): Promise<boolean> {
  let resp = true;
  verifyRun ? (resp = true) : (resp = false);

  if (!resp) return resp;

  const admins = [];
  const userRepository = await getRepository(User);
  for (let i = 0; i <= 10; i++) {
    const user = new User();
    const image = new Image();
    (user.name = name.firstName()),
      (user.avatar = random.image()),
      (user.isAdmin = true);
    (user.bio = "I'm a Admin"),
      (user.email = 'admin@admin.com'),
      (user.password = '123');
    const newAdmin = await userRepository.create(user);
    admins.push(user);
  }

  const usersInserted = await userRepository.save(admins);

  let exitStatus = false;
  usersInserted ? (exitStatus = true) : (exitStatus = false);
  return exitStatus;
}
