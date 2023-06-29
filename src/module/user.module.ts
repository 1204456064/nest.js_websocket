import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sys_user } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([sys_user])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
