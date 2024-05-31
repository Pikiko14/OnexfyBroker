"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const broker_controller_1 = require("../controllers/broker.controller");
// init router
const router = (0, express_1.Router)();
exports.router = router;
// instance controller
const controller = new broker_controller_1.BrokerController();
/**
 * Do register user
 */
router.post('/send-message', controller.sendMessage);
/**
 * Do register user
 */
router.get('/', controller.liveServerMethods);
