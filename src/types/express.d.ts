import { AdminDocument } from '../models/admin-model';

declare global {
  declare namespace Express {
    export interface Request {
      tokenData?: {
        username: string,
        token: string,
      },
      authAdmin?: AdminDocument
    }
  }
}
export { };
