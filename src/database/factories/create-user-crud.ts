import { Connection} from 'typeorm'
import {name,internet,random,date,lorem } from 'faker'
import { UserFactory } from '@entities/factories/user.factory';



const createUsersCRUD = async ()=>{
  for (const iterator of Array.from({length:20})) {

    const username = name.firstName();
    const bio =  lorem.text();
    const email = internet.email();
    const password = internet.password();
    
  
    const user = new UserFactory(username,bio,email,password)

    //await con.manager.save(user)
  }

}

export {createUsersCRUD}