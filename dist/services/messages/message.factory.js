"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSenderFactory = void 0;
const message_interface_1 = require("../../interfaces/message.interface");
const button_message_service_1 = require("./buttonMessage/button-message.service");
/**
 * Clase que crea objetos de envío de mensajes
 */
class MessageSenderFactory {
    /**
     * Crea un objeto de envío de mensajes según el tipo de mensaje
     * @param type Tipo de mensaje (email, sms o whatsapp)
     * @returns Objeto de envío de mensajes
     */
    static createSender(type) {
        switch (type) {
            case message_interface_1.TypeMessage.BUTTON:
                return new button_message_service_1.ButtonMessage();
            default:
                throw new Error("Invalid message sender type");
        }
    }
}
exports.MessageSenderFactory = MessageSenderFactory;
