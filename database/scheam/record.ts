import { Schema, model } from 'mongoose';
import { ObjectID } from 'bson';
export interface IRecord {
  name: string;
  intro: string;
  initiator: string; // 主人
  viewPoints: string[]; // 观点
  winViewPoint: string[]; // 胜利观点
  date: Date;
  status: number; // 0：关闭状态 1：开启状态
  level: number;
}
export const RecordSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    betId: Schema.Types.ObjectId,
    createDate: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  },
);

export default model('record', RecordSchema, 'record');
