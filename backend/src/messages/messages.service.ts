import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) { }

    create(messageData: Partial<Message>): Promise<Message> {
        const message = this.messagesRepository.create(messageData);
        return this.messagesRepository.save(message);
    }

    findAll(): Promise<Message[]> {
        return this.messagesRepository.find({ order: { createdAt: 'DESC' } });
    }
}
