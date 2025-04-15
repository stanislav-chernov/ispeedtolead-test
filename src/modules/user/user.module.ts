import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from '@/modules/user/models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '@/modules/user/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
