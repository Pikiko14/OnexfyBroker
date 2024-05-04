import { Request, Response } from "express";
import { ResponseHandler } from "../utils/responseHandler";
import { BrokerService } from "../services/broker.service";

export class BrokerController {
  private service: BrokerService;

  constructor() {
    this.service = new BrokerService();
  }

  /**
   * Register new user
   * @param req Express request
   * @param res Express response
   * @returns Promise<void>
   */
  sendMessage = async (
    req: Request,
    res: Response
  ): Promise<void | null> => {
    try {
      return await this.service.sendMessage(req, res, req.body);
    } catch (error: any) {
      ResponseHandler.handleInternalError(res, error, error.message);
    }
  };

  
  /**
   * Register new user
   * @param req Express request
   * @param res Express response
   * @returns Promise<void>
   */
  liveServerMethods = async (
    req: Request,
    res: Response
  ): Promise<void | null> => {
    try {
      res.status(200).send("Hello World");
    } catch (error: any) {
      ResponseHandler.handleInternalError(res, error, error.message);
    }
  };
}
