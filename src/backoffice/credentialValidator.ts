import { User } from '../entities/user.entity'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../modules/profile/user/user.service';

export const adminCredentialValidator = {
  useFactory: (userService: UserService) => {
    // You can now return a function to validate the credentials
    return async function validateCredentials(email: string, password: string) {
      const user: User | null = await userService.findByEmail(email)
      // Note: here we're assuming the password is in plaintext in the database.
      // Never do that in a real app! You should hash your password and compare hashes
      if (user && user.isAdmin && password === user.password) {
        console.log(user)
        return user
      }
      return null // The credentials do not identify an administor
    }
  },
  inject: [getRepositoryToken(User)],
}