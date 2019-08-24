import { ObjectID } from 'bson';
import { Schema, model, Document } from 'mongoose';
import { IViewPoint } from './viewPoint';
export interface IPlayer {
  customerId: ObjectID;
  viewPointId: ObjectID;
}
export interface IBet {
  name: string;
  intro: string;
  initiator: ObjectID; // 主人
  viewPoints: IViewPoint[]; // 观点
  winViewPoint: string; // 胜利观点
  date: Date;
  player: IPlayer[];
  status: number; // 0：关闭状态 1：开启状态
  level: number;
}
interface IDocumentBet extends Document, IBet {}
export const BetSchema = new Schema(
  {
    name: String,
    intro: String,
    player: [
      // 参与者
      {
        customerId:  Schema.Types.ObjectId,
        viewPointId:  Schema.Types.ObjectId,
        date: Date,
      },
    ],
    initiator: Schema.Types.ObjectId, // 主人
    viewPoints: [Schema.Types.ObjectId], // 观点
    winViewPoint: Schema.Types.ObjectId, // 胜利观点
    date: {
      type: Date,
      default: new Date(),
    },
    status: Number, // 0：关闭状态 1：开启状态
    level: { type: Number, default: 1 }, // 级别，1：蓝色，2：绿色，3：紫色，4：橙色，5：红色
  },
  {
    versionKey: false,
  },
);

export default model<IDocumentBet>('bet', BetSchema, 'bet');
