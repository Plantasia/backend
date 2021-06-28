import { LogsSeeding } from '../../entities/logsSeeding.entity';
import { User } from '../../entities/user.entity';
import { getRepository } from 'typeorm';
import { name, random, internet, lorem } from 'faker';
import { Category } from '@entities/category.entity';
import { Topic } from '@entities/topic.entity';
import { S3Helper } from '@src/utils/S3Helper';

export async function CallingSeeders() {
  const logSeedingRepository = await getRepository(LogsSeeding);
  const seedingAlreadyRunned = await logSeedingRepository.findOne();
  if (seedingAlreadyRunned) return;

  const normalUser = getRepository(User).create({
    name: name.findName(),
    bio: name.jobDescriptor(),
    email: internet.email(),
    password: '123abc@',
  });
  const adminUser = getRepository(User).create({
    name: name.findName(),
    bio: name.jobDescriptor(),
    email: 'admin@admin.com.br',
    password: '123abc@',
    isAdmin: true,
  });
  const users = await getRepository(User).save([normalUser, adminUser]);

  const payloadCategories: Partial<Category>[] = [];

  payloadCategories.push({
    name: 'Suculentas',
    description:
      'Essa categoria é destinada às plantas suculentas de todas espécie',
    authorId: users[0].id,
    authorEmail: users[0].email,
    imageStorage: await new S3Helper().getUrl('default-category-image.jpeg'),
  });
  payloadCategories.push({
    name: 'Cactáceas',
    description:
      'Essa categoria é destinada às plantas cactáceas de todas espécie',
    authorId: users[0].id,
    authorEmail: users[0].email,
    imageStorage: await new S3Helper().getUrl('default-category-image.jpeg'),
  });
  payloadCategories.push({
    name: 'Flores',
    description: 'Essa categoria é destinada às flores de todas espécie',
    authorId: users[0].id,
    authorEmail: users[0].email,
    imageStorage: await new S3Helper().getUrl('default-category-image.jpeg'),
  });

  const Categories = await getRepository(Category).save(payloadCategories);

  const payloadTopics = Categories.map(({ id }) => {
    return getRepository(Topic).create({
      category: { id },
      textBody: lorem.paragraphs(3),
      name: random.words(3),
      user: { id: users[0].id },
      imageStorage: 'default-category-image.jpeg',
    });
  });
  const Topics = getRepository(Topic).save(payloadTopics);

  const newLog = new LogsSeeding(true);
  logSeedingRepository.save(logSeedingRepository.create(newLog));
}
