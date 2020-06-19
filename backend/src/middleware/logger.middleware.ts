import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/secret'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let token = req.body.token || req.query.token || req.headers['authorization'];
    try {
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret_key, function (err, decoded) {
          if (err) {
            throw new HttpException(err.message, 401);
          } else {
            const user = req.body;
            user.decoded = decoded.admin
            next();
          }
        });

      } else {
        // if there is no token
        // return an error
        throw new HttpException("No Token Provided", 401)
      }
    } catch (e) {
      throw new HttpException(e.message, 401);
    }
  }
}