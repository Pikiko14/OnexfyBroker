import path from 'path';
import RoutesIndex from './routes';
import cors, { CorsOptions } from 'cors';
import express, { Application } from 'express';
import messageBroker from './utils/message.broker';
import configuration from './configuration/configuration';
import { MessageBrokerInterface } from './interfaces/broker.interface';

/**
 * Clase encargada de consumir mensajes del broker de RabbitMQ
 */
class OnexfyBroker {
  /** The Express application */
  private app: Application;
  /** The port the server should run on */
  private readonly PORT: number | string;
  /** The path to the route directory */
  private readonly routeDirectoryPath: string;

  /**
   * Creates a new instance of the server
   */
  constructor() {
    this.app = express();
    this.connectToRabbitMQ();
    this.PORT = parseInt(configuration.get('PORT')) || 3000; // Default port
    this.routeDirectoryPath = path.join(__dirname, './routes'); // Path to your routes directory
  }
  
  /**
   * Configures the middleware for the Express application
   */
  private configureMiddleware(): void {
    const corsOptions: CorsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
    };
    this.app.use(express.json());
    this.loadRoutes();
    this.app.use(cors(corsOptions));
  }

  /**
   * Loads the routes for the application
   */
  private loadRoutes(): void {
    // Use the router
    const routes = new RoutesIndex();
    routes.loadRoutes();
    this.app.use(routes.getRouter());
  }

  /**
   * Conecta al broker y se suscribe a la cola de notificaciones
   */
  async connectToRabbitMQ(): Promise<void> {
    await messageBroker.connect();
    setTimeout(async () => {
      await this.startConsuming();
    }, 1500);
  }

  /**
   * Inicia el consumo de mensajes de la cola de notificaciones
   */
  async startConsuming(): Promise<void> {
  }

  /**
   * Starts the server
   */
  private async startServer(): Promise<void> {
    this.app.listen(this.PORT, () => console.log(`Running on port ${this.PORT}`));
  }

  /**
   * Starts the server
   */
  public async start(): Promise<void> {
    this.configureMiddleware();
    await this.startServer();
  }
}

// Inicia el consumidor de notificaciones
const broker = new OnexfyBroker();
broker.start();
