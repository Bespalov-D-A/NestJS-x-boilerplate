import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/users.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Role } from '../../entities/roles.entity';
import { RolesModule } from '../roles/roles.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService ],
  exports: [UsersService],
})
export class UsersModule {}
