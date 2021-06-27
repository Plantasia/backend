export default class UserModel {
  name:string;
  email:string;
  bio?:string;
  id: string;
  password?: string;
  avatar?: string;
  isAdmin?: boolean;
  created_at?: Date | null;
  deleted_at?: Date | null;
  updated_at?: Date | null;
}