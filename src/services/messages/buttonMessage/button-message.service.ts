import { HandlerRequest } from "../../../utils/handler.request";
import { MessageInterface } from "../../../interfaces/message.interface";

/**
 * button message class
 */
export class ButtonMessage {
  private confirmationAssert: string[];

  constructor() {
    this.confirmationAssert = [
      "Si",
      "si",
      "Confirmar",
      "Validar",
      "Aprobar",
      "Proceder",
      'Si confirmo',
      'Acceder'
    ];
  }

  /**
   * Send message
   * @param message
   */
  public async sendMessage(message: any) {
    try {
      // get payload and text
      const { payload, text } = message.message[message.message.type];
      if (payload === text) {
        const { context } = message;
        const urlBase: string = `${process.env.ONEXFY_API_URL}/api/v2`;
        // validamos el contexto
        if (
          context.trigger === "new_pre_invoice" &&
          context.model_id &&
          context.onexfy_user_id
        ) {
          if (this.confirmationAssert.includes(text)) {
            const handlerRequest = new HandlerRequest(`${urlBase}`, message.message);
            const response = await handlerRequest.doRequest(
              `/metawebhook/${context.onexfy_user_id}`,
              "POST",
              {
                "Custom-Auth-Token": "J0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
              },
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
