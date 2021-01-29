import { AdminEntity } from 'nestjs-admin'
import { User } from '../../../entities/user.entity'

export class UserAdmin extends AdminEntity {
  entity = User
  listDisplay = ['firstname', 'lastname']
}