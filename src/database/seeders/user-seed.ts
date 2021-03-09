import {User} from '@entities/user.entity'
import {internet,name,random} from 'faker'


export  default function UserSeed():User[]{
 const users =[]

  for( let i=0; i<=30; i++){
    const user = new User()
    const now = new Date()
    
    user.name = name.firstName(),
    user.avatar = random.image(),
    user.bio = random.words(),
    user.email = internet.email(),
    user.created_at = now
    user.updated_at = now
    user.password = "123"
    users.push(user)
  }
  return users
}
