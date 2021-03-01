import 'reflect-metadata';
import { createConnection, Connection} from 'typeorm';
import {User } from '@entities/user.entity';
import {createUsersCRUD} from './src/database/factories/create-user-crud'
const path = require('path');
 
/*export async function crudGenerator(connection: Connection){

  await connection.synchronize(true);
  await createUsersCRUD(connection)
}*/

