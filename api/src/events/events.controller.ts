import { Body, Controller, Delete, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { map } from 'lodash';
import { multerConfig } from 'src/helper/configs/multer.config';
import enums from 'src/helper/enums';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/event-filter-.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { JwtGuard } from 'src/helper/guard/jwt.guard';

@Controller(enums.routes.event)
@UseGuards(JwtGuard)
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post('/')
    @UseInterceptors(FilesInterceptor('files', 100, multerConfig))
    async createEvent(@UploadedFiles() files: Express.Multer.File[], @Body(new ValidationPipe({ transform: true })) createEventDto: CreateEventDto): Promise<Response> {
        createEventDto.images = map(files, 'destination');
        return this.eventsService.createEvent(createEventDto);
    }

    @Put('/')
    @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
    async updateEvent(@UploadedFiles() files: Express.Multer.File[], @Body() updateEventDto: UpdateEventDto): Promise<Response> {
        updateEventDto.images = map(files, 'destination');
        return this.eventsService.updateEvent(updateEventDto);
    }

    @Delete('/:id')
    async deleteEvent(@Param('id') id: string): Promise<Response> {
        return this.eventsService.deleteEvent(id);
    }

    @Post('/list/filter')
    async getEventsByFilter(@Body() eventFilterDto: EventFilterDto): Promise<Response> {
        return this.eventsService.getEventsByFilter(eventFilterDto);
    }
}