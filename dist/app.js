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
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const message_broker_1 = __importDefault(require("./utils/message.broker"));
const message_service_1 = require("./services/messages/message.service");
const configuration_1 = __importDefault(require("./configuration/configuration"));
/**
 * Clase encargada de consumir mensajes del broker de RabbitMQ
 */
class OnexfyBroker {
    /**
     * Creates a new instance of the server
     */
    constructor() {
        this.app = (0, express_1.default)();
        this.connectToRabbitMQ();
        this.messageService = new message_service_1.MessageServices();
        this.PORT = parseInt(configuration_1.default.get('PORT')) || 3000; // Default port
        this.routeDirectoryPath = path_1.default.join(__dirname, './routes'); // Path to your routes directory
    }
    /**
     * Configures the middleware for the Express application
     */
    configureMiddleware() {
        const corsOptions = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            optionsSuccessStatus: 204,
        };
        this.app.use(express_1.default.json());
        this.loadRoutes();
        this.app.use((0, cors_1.default)(corsOptions));
    }
    /**
     * Loads the routes for the application
     */
    loadRoutes() {
        // Use the router
        const routes = new routes_1.default();
        routes.loadRoutes();
        this.app.use(routes.getRouter());
    }
    /**
     * Conecta al broker y se suscribe a la cola de notificaciones
     */
    connectToRabbitMQ() {
        return __awaiter(this, void 0, void 0, function* () {
            yield message_broker_1.default.connect();
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield this.startConsuming();
            }), 1500);
        });
    }
    /**
     * Inicia el consumo de mensajes de la cola de notificaciones
     */
    startConsuming() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Consuming messages...");
            message_broker_1.default.consumeMessage("onexfy_chatox", (message) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.messageService.sendMessage(message);
                    // get message data
                }
                catch (error) {
                    // Manejar el error según sea necesario
                }
            }));
        });
    }
    /**
     * Starts the server
     */
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.listen(this.PORT, () => console.log(`Running on port ${this.PORT}`));
        });
    }
    /**
     * Starts the server
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configureMiddleware();
            yield this.startServer();
        });
    }
}
// Inicia el consumidor de notificaciones
const broker = new OnexfyBroker();
broker.start();
