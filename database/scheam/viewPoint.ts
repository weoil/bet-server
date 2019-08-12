import { ObjectID } from 'bson';
import { Schema, model } from 'mongoose';

export const ViewPointSchema = new Schema({
  name: String,
  participate: [ObjectID], // 参与者们
});

export default model('viewPoint', ViewPointSchema, 'viewPoint');
