import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String], default: [] }) // Store image URLs or paths
    images: string[];

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true })
    location: string;

    @Prop()
    totalGuests?: number;

    @Prop()
    category?: string;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean
}

export const EventSchema = SchemaFactory.createForClass(Event);
