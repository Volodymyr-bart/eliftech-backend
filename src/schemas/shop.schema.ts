import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Drug } from './drug.schema';
import { Order } from './orders.schema';

@Schema()
export class Shop {
  @Prop()
  title: string;

  @Prop()
  address: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Drug' }] })
  drugs: Drug[];

  @Prop({ type: [{ type: 'ObjectId', ref: 'Order' }] })
  orders: Order[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
