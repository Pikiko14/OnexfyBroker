import { MessageSenderFactory } from "./message.factory";

/**
 * Message service class
 */
export class MessageServices {
    // send message to onexfy
    public sendMessage(message: any) {
        try {
            const { type_response } = message;
            const sender = MessageSenderFactory.createSender(type_response);
            sender.sendMessage(message);
        } catch (error) {
            console.log(error);
        }
    }
}
