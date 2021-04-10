import { User } from '@entities/user.entity';
import { random } from 'faker';
import { getRepository } from 'typeorm';

import { Comment } from '../../entities/comments.entity';
import { Topic } from '../../entities/topic.entity';
import { Category } from '../../entities/category.entity';

export default async function CommentsSeed(
  verifyRun: boolean,
): Promise<boolean> {
  let resp = true;
  verifyRun ? (resp = true) : (resp = false);

  if (!resp) return resp;

  const comments = [];
  let seedingId = 1;
  let topicSeedingId = 1;

  const commentsRepository = await getRepository(Comment);
  const userRepository = await getRepository(User);
  const topicRepository = await getRepository(Topic);
  const categoryRepository = await getRepository(Category);

  for (let i = 0; i <= 100; i++) {
    if (i % 20 === 0) topicSeedingId = 1;
    if (i % 30 === 0) seedingId = 1;
    const comment = new Comment();
    const ownerComment = await userRepository.findOne({ where: { seedingId } });
    const topic = await topicRepository.find({
      relations: ['category'],
      where: { seedingId: topicSeedingId },
    });

    comment.user = ownerComment;
    comment.topic = topic[0];
    comment.textBody = random.words();
    comment.category = topic[0].category;
    topicSeedingId++;
    seedingId++;

    const newComment = await commentsRepository.create(comment);
    comments.push(newComment);
  }

  const commentsInserted = await commentsRepository.save(comments);

  let exitStatus = false;
  commentsInserted ? (exitStatus = true) : (exitStatus = false);
  return exitStatus;
}
