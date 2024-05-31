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
exports.BrokerController = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const broker_service_1 = require("../services/broker.service");
class BrokerController {
    constructor() {
        /**
         * Register new user
         * @param req Express request
         * @param res Express response
         * @returns Promise<void>
         */
        this.sendMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.service.sendMessage(req, res, req.body);
            }
            catch (error) {
                responseHandler_1.ResponseHandler.handleInternalError(res, error, error.message);
            }
        });
        /**
         * Register new user
         * @param req Express request
         * @param res Express response
         * @returns Promise<void>
         */
        this.liveServerMethods = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send("Hello World");
            }
            catch (error) {
                responseHandler_1.ResponseHandler.handleInternalError(res, error, error.message);
            }
        });
        this.service = new broker_service_1.BrokerService();
    }
}
exports.BrokerController = BrokerController;
