import {User} from '@entities/user.entity'
import {internet,name,random} from 'faker'


export  default function AdminSeed():User[]{
 const admin =[]

  for( let i=0; i<=3; i++){
    const user = new User()
    user.name = name.firstName(),
    user.avatar = random.image(),
    user.bio = "I'm a Admin",
    user.email = "admin@admin.com",
    user.password = "123"
    admin.push(user)
  }
  return admin
}
