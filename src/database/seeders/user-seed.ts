import { User } from '../../entities/user.entity';
import { internet, name, random } from 'faker';
import { getRepository } from 'typeorm';

export default async function UserSeed(): Promise<boolean> {
  const users = [];
  const userRepository = await getRepository(User);
  for (let i = 0; i < 30; i++) {
    const user = new User();
    const now = new Date();
    const image = new Image();
    (user.name = name.firstName()),
      (user.avatar = random.image()),
      (user.bio = random.words()),
      (user.email = internet.email()),
      (user.password = '123');
    const newUser = await userRepository.create(user);
    users.push(newUser);
  }
  const usersInserted = await userRepository.save(users);
  let exitStatus = false;
  usersInserted ? (exitStatus = true) : (exitStatus = false);
  return exitStatus;
}
