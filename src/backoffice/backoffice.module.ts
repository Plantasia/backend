import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { AdminCoreModuleFactory, AdminAuthModuleFactory } from 'nestjs-admin'
import { adminCredentialValidator } from './credentialValidator'
import { User } from '../entities/user.entity';

const CoreModule = AdminCoreModuleFactory.createAdminCoreModule({})
const AuthModule = AdminAuthModuleFactory.createAdminAuthModule({
    adminCoreModule: CoreModule, // what admin module are you configuring authentication for
    credentialValidator: adminCredentialValidator, // how do you validate credentials
    imports: [TypeOrmModule.forFeature([User])], // what modules export the dependencies of the credentialValidator available
    providers: [], // additional providers that will be instanciated and exported by the AdminAuthModuleFactory
  })


@Module({
  imports: [CoreModule, AuthModule],
})
export class BackofficeModule {}