import { AdminEntity } from 'nestjs-admin'
import { User } from '../../../entities/user.entity'

export class UserAdmin extends AdminEntity {
  entity = User
  listDisplay = ['id', 'firstname', 'lastname', 'email']
  fields = ['firstName', 'lastName', 'createdDate', 'gender']
  searchFields = ['firstName', 'lastName', 'createdDate', 'gender']
}