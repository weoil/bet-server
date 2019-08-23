import { Schema, model } from 'mongoose';
import { ObjectID } from 'bson';
export interface IRecord {
  userId: Schema.Types.ObjectId;
  betId: Schema.Types.ObjectId;
  type: 'master' | 'player';
  date: Date;
}
export const RecordSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    betId: Schema.Types.ObjectId,
    type: String,
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  },
);

export default model('record', RecordSchema, 'record');
