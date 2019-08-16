import { Schema, model, Document } from 'mongoose';
export interface ICustomer extends Document {
  name: string;
  pass: string;
  isAuthor: boolean;
  openId: string;
  unionId: string;
  phone: string;
  email: string;
  avatar: string;
  address: string;
  intro: string;
  createDate: Date;
  gender: number;
  city: string;
  country: string;
  province: string;
}
export const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    pass: {
      type: String,
      default: '',
    },
    isAuthor: {
      type: Boolean,
      default: false,
    },
    openId: String,
    unionId: {
      type: String,
      default: '',
    },
    intro: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    createDate: {
      type: Date,
      default: new Date(),
    },
    gender: {
      type: Number,
      default: 0, // 1男 2女
    },
    city: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    province: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
  },
);
export const CustomerModel = model<ICustomer>(
  'customer',
  CustomerSchema,
  'customer',
);
export default CustomerModel;
