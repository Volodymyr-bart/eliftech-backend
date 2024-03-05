import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Drug extends Document {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const DrugSchema = SchemaFactory.createForClass(Drug);
