import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Drug } from './drug.schema';

@Schema()
export class Shop {
  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  products: { drug: Drug; quantity: number }[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
