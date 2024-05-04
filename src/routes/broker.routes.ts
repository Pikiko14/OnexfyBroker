import  { Router} from "express";
import { BrokerController } from "../controllers/broker.controller";

// init router
const router = Router();

// instance controller
const controller = new BrokerController();

/**
 * Do register user
 */
router.post(
    '/send-message',
    controller.sendMessage
);

/**
 * Do register user
 */
router.get(
    '/',
    controller.liveServerMethods
);

// export router
export { router };
