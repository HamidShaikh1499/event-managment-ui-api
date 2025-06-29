/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/models/events.model';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
        ]),
    ],
    controllers: [EventsController],
    providers: [EventsService]
})
export class EventModule { }
