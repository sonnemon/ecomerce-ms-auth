import jwt from 'jsonwebtoken';
import config from '../config';
import { Request } from 'express';
import { ContextType } from '../types/context-type';

interface JwtUserPayload {
  id: string;
}

export class Context {
  static async build(req: Request): Promise<ContextType> {
    const bearerToken = req.headers.authorization || null;
    if (!bearerToken) {
      return {
        user: null,
      };
    }
    const token = bearerToken.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, config.jwt_key) as JwtUserPayload;
      return {
        user: {
          id: payload.id,
        },
      };
    } catch (error) {
      return {
        user: null,
      };
    }
  }
}
