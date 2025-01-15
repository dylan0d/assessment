import { Router } from 'express';
import BusinessService from './business.service';

export function createRoutes(businessService: BusinessService) {
  const routes = Router();

  routes.get('/', async (req, res) => {
    const result = await businessService.listTable('businesses')
    console.log(result)
    res.send({result})
  });

  return routes
}


