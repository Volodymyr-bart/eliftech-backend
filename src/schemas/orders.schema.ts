import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Shop } from './shop.schema';
import { Drug } from './drug.schema';

@Schema()
export class Order extends Document {
  @Prop({ type: 'ObjectId', ref: 'Shop' })
  shop: Shop;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({
    type: [{ drug: { type: 'ObjectId', ref: 'Drug' }, quantity: Number }],
  })
  products: { drug: Drug; quantity: number }[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
