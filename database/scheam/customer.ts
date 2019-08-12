import { Schema, model, Document } from 'mongoose';
export interface ICustomer extends Document {
  name: string;
  pass: string;
  isAuthor: boolean;
  openId: string;
  unionID: string;
  phone: string;
  email: string;
  avatar: string;
  address: string;
  createDate: Date;
}
export const CustomerSchema = new Schema({
  name: String,
  pass: String,
  isAuthor: Boolean,
  openId: String,
  unionID: String,
  phone: String,
  email: String,
  avatar: String,
  address: String,
  createDate: {
    type: Date,
    default: new Date(),
  },
});

export default model<ICustomer>('customer', CustomerSchema, 'customer');
