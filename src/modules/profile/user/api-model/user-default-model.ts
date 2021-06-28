export default class UserModel {
  name:string;
  email:string;
  bio?:string;
  id: string;
  password?: string;
  avatar?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  created_at?: Date ;
  deleted_at?: Date ;
  updated_at?: Date ;
}