import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { Event } from 'src/models/events.model';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/event-filter-.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
    ) { }

    async createEvent(createEventDto: CreateEventDto): Promise<any> {
        const _event = await this.eventModel.findOne({ name: createEventDto.name });
        if (_event) {
            throw new BadRequestException(`Event is already existed: ${_event.name}`);
        }

        const eventDetails = new this.eventModel({
            name: createEventDto.name,
            description: createEventDto.description,
            images: createEventDto.images,
            startDate: createEventDto.startDate,
            endDate: createEventDto.endDate,
            location: createEventDto.location,
            totalGuests: createEventDto.totalGuests,
            category: createEventDto.category
        });

        await eventDetails.save();
        return {
            id: eventDetails._id
        };
    }

    async updateEvent(updateEventDto: UpdateEventDto): Promise<any> {
        const storedEvent = await this.eventModel.findOne({ _id: updateEventDto.id });
        if (!storedEvent) {
            throw new NotFoundException(`Event not found: ${updateEventDto.id}`);
        }

        const _event = await this.eventModel.findOne({ name: updateEventDto.name, _id: { $ne: storedEvent._id } });
        if (_event) {
            throw new BadRequestException(`Event is already existed: ${_event.name}`);
        }

        await this.eventModel.findByIdAndUpdate(updateEventDto.id, {
            name: updateEventDto.name,
            description: updateEventDto.description,
            images: updateEventDto.images,
            startDate: updateEventDto.startDate,
            endDate: updateEventDto.endDate,
            location: updateEventDto.location,
            totalGuests: updateEventDto.totalGuests,
            category: updateEventDto.category
        }, { new: true });
        return {
            id: updateEventDto.id
        };
    }

    async getEventsByFilter(eventFilterDto: EventFilterDto): Promise<any> {
        const filter: any = { isDeleted: false };

        if (eventFilterDto.category) {
            filter.category = eventFilterDto.category;
        }

        if (isEmpty(eventFilterDto.search)) {
            filter.name = { $regex: eventFilterDto.search, $options: 'i' }
        }

        if (eventFilterDto.startDate || eventFilterDto.endDate) {
            filter.$and = [];
            if (eventFilterDto.startDate) {
                filter.$and.push({ startDate: { $gte: eventFilterDto.startDate } });
            }

            if (eventFilterDto.endDate) {
                filter.$and.push({ endDate: { $gte: eventFilterDto.endDate } });
            }
        }

        let sortBy: any = { createdAt: -1 };
        if (eventFilterDto.sorting) {
            sortBy = { [eventFilterDto.sorting]: -1 }
        }

        const events = await this.eventModel.find(filter).sort(sortBy).skip(eventFilterDto.offset).limit(eventFilterDto.limit);
        return {
            events
        };
    }

    async deleteEvent(id: String): Promise<any> {
        const storedEvent = await this.eventModel.findOne({ _id: id });
        if (!storedEvent) {
            throw new NotFoundException(`Event not found: ${id}`);
        }

        storedEvent.isDeleted = true;
        await storedEvent.save();

        return {
            isDeleted: true
        }
    }
}
