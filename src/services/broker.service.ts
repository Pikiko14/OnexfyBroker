
import { ResponseHandler } from "../utils/responseHandler";
import messageBroker from "../utils/message.broker";
import configuration from "../configuration/configuration";

export class BrokerService {
    constructor() { 
    }

    /**
     * send broker message to chatox
     */
    public async sendMessage(req: any, res: any, body: any) {
        try {
            // add autorization tu body
            body.authorization = req.headers.authorizationchatox || null;

            // send message to broker
            const message = await messageBroker.publishMessage(
                configuration.get('BROKER_CHANNEL') || "chatox_onexfy",
                body
            );

            // return 
            return ResponseHandler.createdResponse(
                res,
                { body, broker_status: message},
                "Message sent successfylly"
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}