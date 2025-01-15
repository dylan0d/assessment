import express from 'express';
import mysql from 'mysql2/promise';

import {createRoutes} from './routes';
import BusinessService from './business.service';

export default class App {
  public server: any;
  public businessService: BusinessService
   
  constructor(connection: mysql.Connection) {
    this.businessService = new BusinessService(connection);
      
    this.server = express();
    this.middlewares();
    this.routes();
  };

  async setup(connection: mysql.Connection) {

  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(createRoutes(this.businessService));
  }
}

