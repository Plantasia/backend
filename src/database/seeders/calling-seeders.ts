import { LogsSeeding } from '../../entities/logsSeeding.entity';
import { getRepository } from 'typeorm';
import AdminSeed from './admin-seed';
import CategorySeed from './category-seed';
import CommentsSeed from './comments-seed';
import TopicsSeed from './topics-seed';
import UserSeed from './user-seed';

export async function CallingSeeders() {
  const logSeedingRepository = await getRepository(LogsSeeding);
  const seedingAlreadyRunned = await logSeedingRepository.findOne();

  if (!seedingAlreadyRunned) {
    const exitUsersSeed = await UserSeed();

    const exitAdminsSeed = await AdminSeed(exitUsersSeed);

    const exitCategoriesSeed = await CategorySeed(exitAdminsSeed);

    const commentsSeed = await TopicsSeed(exitCategoriesSeed);

    CommentsSeed(commentsSeed);

    const newLog = new LogsSeeding(true);
    logSeedingRepository.save(logSeedingRepository.create(newLog));
  }
}
