import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '@/modules/user/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(login: string, password: string): Promise<UserDocument> {
    const newUser = new this.userModel({
      login,
      password: await bcrypt.hash(password, 10),
    });
    return newUser.save();
  }

  async findByLogin(login: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ login }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }
}
