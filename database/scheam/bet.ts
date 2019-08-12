import { Schema, model } from 'mongoose';
import { ObjectID } from 'bson';

export const BetSchema = new Schema({
  name: String,
  intro: String,
  initiator: ObjectID, // 主人
  viewPoints: [ObjectID], // 观点
  winViewPoint: ObjectID, // 胜利观点
  date: {
    type: Date,
    default: new Date(),
  },
  status: Number, // 0：关闭状态 1：开启状态
  level: { type: Number, default: 1 }, // 级别，1：蓝色，2：绿色，3：紫色，4：橙色，5：红色
});

export default model('bet', BetSchema, 'bet');
