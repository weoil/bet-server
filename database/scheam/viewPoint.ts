import { Schema, model, Document } from 'mongoose';
export interface IViewPoint {
  name: string;
  participate: string[]; // 参与者们
}
interface IDocumentViewPoint extends Document, IViewPoint {}
export const ViewPointSchema = new Schema(
  {
    name: String,
    participate: [Schema.Types.ObjectId], // 参与者们
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
