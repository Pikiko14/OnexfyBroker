"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonMessage = void 0;
const handler_request_1 = require("../../../utils/handler.request");
/**
 * button message class
 */
class ButtonMessage {
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
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get payload and text
                const { payload, text } = message.message[message.message.type];
                if (payload === text) {
                    const { context } = message;
                    const urlBase = `${process.env.ONEXFY_API_URL}/api/v2`;
                    // validamos el contexto
                    if (context.trigger === "new_pre_invoice" &&
                        context.model_id &&
                        context.onexfy_user_id) {
                        if (this.confirmationAssert.includes(text)) {
                            const handlerRequest = new handler_request_1.HandlerRequest(`${urlBase}`, message.message);
                            const response = yield handlerRequest.doRequest(`/metawebhook/${context.onexfy_user_id}`, "POST", {
                                "Custom-Auth-Token": "J0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
                            });
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ButtonMessage = ButtonMessage;
