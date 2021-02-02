import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('*****', req);
    //Request...metodo de verificar se tokenLogout for igual ao constLogout.constant, a request não pode ser feita
    next();
  }
}
