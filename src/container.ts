import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMysqlRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMysqlRepository } from './services/repositories/impl/mysql/balance.repository';
import { MovementService } from './services/movement.service';

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    //* repositories
    subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),
    movementRepository: asClass(MovementMySQLRepository).scoped(),
    balanceRepository: asClass(BalanceMysqlRepository).scoped(),

    //* services
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
  });

  app.use(scopePerRequest(container));
};
