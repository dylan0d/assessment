import { Request, Response, Router } from 'express';
import BusinessService from './business.service';
import { isFloat, isInt } from 'validator';
interface DiscoveryRequestQuery {
  lat: string;
  long: string;
  limit: string;
  type: string;
}

const middlewares = {
  discovery: (req: Request<{}, {}, {}, DiscoveryRequestQuery>, res: Response, next: any) => {
    const {long, lat, limit} = req.query;
    let passedValidation = true
    if (!lat || !long) {
      res.status(400).send("long and lat are required parameters");
      passedValidation = false
    }
    if (passedValidation && !isFloat(long) || !isFloat(lat)) {
      res.status(400).send("long and lat must be integers");
      passedValidation = false
    }
    if (passedValidation && limit) {
      if (!isInt(limit) || parseFloat(limit) < 1) {
        res.status(400).send("limit must be a positive integer");
        passedValidation = false
      }
    }

    if(passedValidation) {
      next();
    }
  }
}

export function createRoutes(businessService: BusinessService) {
  const routes = Router();

  routes.get('/', async (req, res) => {
    const result = await businessService.listTable('businesses')
    console.log(result)
    res.send({result})
  });

  routes.get('/discovery', middlewares.discovery, async (
    req: Request<{}, {}, {}, DiscoveryRequestQuery>,
    res: Response
  ) => {
    const {long, lat, limit, type} = req.query;
    const result = await businessService.getByDistance(long, lat, limit, type);
    res.send({businesses: result})
  })

  return routes
}


