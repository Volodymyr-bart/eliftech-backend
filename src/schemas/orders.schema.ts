import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Shop } from './shop.schema';

@Schema()
export class Order extends Document {
  @Prop({ type: 'ObjectId', ref: 'Shop' })
  shop: Shop;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  drugs: {
    _id: string;
    title: string;
    image: string;
    price: number;
    description: string;
    createdAt: Date;
    quantity: number;
  }[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
