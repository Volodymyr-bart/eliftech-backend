import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Shop } from './shop.schema';

@Schema()
export class Drug extends Document {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Shop' }] })
  shops: Shop[];
}

export const DrugSchema = SchemaFactory.createForClass(Drug);
