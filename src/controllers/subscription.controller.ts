import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { SubscriptionService } from '../services/subscription.service';
import { BaseController } from '../common/controllers/base.controller';
import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from '../dtos/subscription.dto';

@route('/subscriptions')
export class SubscriptionController extends BaseController {
  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      res.send(await this.subscriptionService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  // Ex: subscriptions/1
  @route('/:id')
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const result = await this.subscriptionService.find(id);

      if (!result) {
        res.status(404);
        res.send();
      }

      res.send(result);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response) {
    try {
      await this.subscriptionService.store({
        user_id: req.body.user_id,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as ISubscriptionCreateDto);

      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await this.subscriptionService.update(id, {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as ISubscriptionUpdateDto);

      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await this.subscriptionService.remove(id);

      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
