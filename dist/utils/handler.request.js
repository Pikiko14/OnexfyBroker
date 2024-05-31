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
exports.HandlerRequest = void 0;
const axios_1 = __importDefault(require("axios"));
class HandlerRequest {
    constructor(url, params) {
        /**
         * handler request
         * @param path
         * @param method
         * @param headers
         * @returns
         */
        this.doRequest = (path, method, headers) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requestConfig = {
                    method: method.toUpperCase(),
                    url: `${this.url}${path}`,
                    headers: headers || {},
                    data: this.params,
                };
                const response = yield (0, axios_1.default)(requestConfig);
                return response.data;
            }
            catch (error) {
                console.error("Error on handling external request: ", error.message);
                return error;
            }
        });
        this.url = url;
        this.params = params;
    }
}
exports.HandlerRequest = HandlerRequest;