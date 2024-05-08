export enum TypeMessage {
  BUTTON = "button",
}

export interface MessageInterface {
  type_response: "button";
  message: { payload: string; text: string };
  context: {
    trigger: string;
    model_id: number;
    onexfy_user_id: number;
    whatsapp_id: string;
    template: { [key: string]: any }[]; // Array de objetos con cualquier tipo de clave y valor
  };
}

export interface MessageSenderInterface {
  sendMessage(message: MessageInterface): Promise<void>;
}
