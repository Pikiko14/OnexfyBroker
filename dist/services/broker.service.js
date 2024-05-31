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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerService = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const message_broker_1 = __importDefault(require("../utils/message.broker"));
const configuration_1 = __importDefault(require("../configuration/configuration"));
class BrokerService {
    constructor() {
    }
    /**
     * send broker message to chatox
     */
    sendMessage(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // add autorization tu body
                body.authorization = req.headers.authorizationchatox || null;
                // send message to broker
                const message = yield message_broker_1.default.publishMessage(configuration_1.default.get('BROKER_CHANNEL') || "chatox", body);
                // return 
                return responseHandler_1.ResponseHandler.createdResponse(res, { body, broker_status: message }, "Message sent successfylly");
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.BrokerService = BrokerService;
