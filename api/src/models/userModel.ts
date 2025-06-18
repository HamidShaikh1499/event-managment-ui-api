import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserDetail extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  hashKey: string;
}

export const UserDetailSchema = SchemaFactory.createForClass(UserDetail);
