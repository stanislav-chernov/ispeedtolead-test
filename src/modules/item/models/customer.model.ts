import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type CustomerDocument = Customer & Document;

@Schema({ collection: 'customers' })
export class Customer {
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  birthdate: Date;

  @Prop({ required: true })
  email: string;

  @Prop()
  active: boolean;

  @Prop({ type: [Number] })
  accounts: number[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Account' }],
  })
  accountsRefs: Types.ObjectId[];

  @Prop({ type: Map, of: Object })
  tier_and_details: Map<string, TierAndDetails>;
}

export class TierAndDetails {
  @Prop()
  id: string;

  @Prop()
  tier: string;

  @Prop()
  benefits: string[];

  @Prop()
  active: boolean;
}

const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.plugin(mongoosePaginate);
export { CustomerSchema };
