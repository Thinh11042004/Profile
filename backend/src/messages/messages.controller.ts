import { Controller, Post, Get, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post()
    create(@Body() messageData: Partial<Message>) {
        return this.messagesService.create(messageData);
    }

    @Get()
    findAll() {
        return this.messagesService.findAll();
    }
}
