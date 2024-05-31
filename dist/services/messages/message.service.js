"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageServices = void 0;
const message_factory_1 = require("./message.factory");
/**
 * Message service class
 */
class MessageServices {
    // send message to onexfy
    sendMessage(message) {
        try {
            const { type_response } = message;
            const sender = message_factory_1.MessageSenderFactory.createSender(type_response);
            sender.sendMessage(message);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.MessageServices = MessageServices;
