import { Schema, model, Document } from 'mongoose';
export interface IViewPoint {
  name: string;
}
export interface IDocumentViewPoint extends Document, IViewPoint {}
export const ViewPointSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  },
);

export default model<IDocumentViewPoint>(
  'viewPoint',
  ViewPointSchema,
  'viewPoint',
);
