import { Category } from "@entities/category.entity";
import { User } from "@entities/user.entity";

export class TopicModel  {
  
  id: string;
  
  name: string;
  
  textBody: string;
  
  imageStorage?: string;
  
  isActive?: boolean;
  
  user?: User;
  
  category?: Category;
  
  comments?: Comment[];
  
  created_at?: Date;
  
  updated_at?: Date;
  
  deleted_at?: Date;
  
}

  
