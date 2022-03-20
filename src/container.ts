import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';
import { SubscriptionMongoDBRepository } from './services/repositories/impl/mongodb/subscription.repository';
import { MovementMongoDBLRepository } from './services/repositories/impl/mongodb/movement.repository';
import { BalanceMongoDBlRepository } from './services/repositories/impl/mongodb/balance.repository';

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    //* repositories
    // subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),
    // movementRepository: asClass(MovementMySQLRepository).scoped(),
    // balanceRepository: asClass(BalanceMysqlRepository).scoped(),
    subscriptionRepository: asClass(SubscriptionMongoDBRepository).scoped(),
    movementRepository: asClass(MovementMongoDBLRepository).scoped(),
    balanceRepository: asClass(BalanceMongoDBlRepository).scoped(),


    //* services
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
  });

  app.use(scopePerRequest(container));
};
