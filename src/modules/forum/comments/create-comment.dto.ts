import { IsNotEmpty } from 'class-validator';
import { Topic } from '../../../entities/topic.entity';
import { User } from '@entities/user.entity';

export class CreateCommentDTO {
  @IsNotEmpty()
  public readonly text: string;
  public readonly reaction: string;
  public readonly disable: boolean;
  public readonly hasParenteComment: boolean;
  public readonly idParentComment: string;
  public readonly indexOrder: number;
  public topic_id: string;
  public user_id: string;
}
