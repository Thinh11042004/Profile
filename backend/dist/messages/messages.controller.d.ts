import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(messageData: Partial<Message>): Promise<Message>;
    findAll(): Promise<Message[]>;
}
