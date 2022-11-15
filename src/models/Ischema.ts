import { Model } from 'mongoose';

export interface SchemaInterface {
  getCollection: () => Model<any>;
}
