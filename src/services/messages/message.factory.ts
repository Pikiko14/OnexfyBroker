import { MessageSenderInterface, TypeMessage } from "../../interfaces/message.interface";
import { ButtonMessage } from "./buttonMessage/button-message.service";
/**
 * Clase que crea objetos de envío de mensajes
 */
export class MessageSenderFactory {
  /**
   * Crea un objeto de envío de mensajes según el tipo de mensaje
   * @param type Tipo de mensaje (email, sms o whatsapp)
   * @returns Objeto de envío de mensajes
   */
  static createSender(type: string): MessageSenderInterface {
    switch (type) {
      case TypeMessage.BUTTON:
        return new ButtonMessage();

    default:
        throw new Error("Invalid message sender type");
    }
  }
}
