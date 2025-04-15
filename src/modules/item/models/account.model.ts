import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({ collection: 'accounts' })
export class Account {
  @Prop({ required: true })
  account_id: number;

  @Prop({ required: true })
  limit: number;

  @Prop({ type: [String], required: true })
  products: string[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
