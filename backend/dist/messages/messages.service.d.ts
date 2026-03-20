import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
export declare class MessagesService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    create(messageData: Partial<Message>): Promise<Message>;
    findAll(): Promise<Message[]>;
}
