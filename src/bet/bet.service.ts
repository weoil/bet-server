import { BetError } from './../utils/error';
import { CustomerModel, ICustomer } from './../../database/scheam/customer';
import { Injectable } from '@nestjs/common';
import BetModel, { IBet } from '../../database/scheam/bet';
import RecordModel, { IRecord } from '../../database/scheam/record';
import ViewPointModel, { IViewPoint } from '../../database/scheam/viewPoint';
import { ObjectId } from 'bson';

const hideUsers = (prefix: string) => {
  const obj = {};
  [
    'pass',
    'openId',
    'email',
    'phone',
    'address',
    'isAuthor',
    'unionId',
    'createDate',
  ].forEach(val => {
    obj[`${prefix}.${val}`] = 0;
  });
  return obj;
};

@Injectable()
export class BetService {
  async createBet(bet: IBet) {
    const viewPonits = bet.viewPoints;
    const vrs = await ViewPointModel.insertMany(
      viewPonits.map(viewPonit => {
        return {
          name: viewPonit.name,
        };
      }),
    );
    console.log(bet);
    bet.viewPoints = vrs.map(vr => vr._id);
    const r = await BetModel.create(bet);
    const { initiator, _id } = r;
    await RecordModel.create({
      betId: _id,
      createDate: bet.date,
      userId: initiator,
      player: [],
      type: 'master',
      date: bet.date,
    });
    return _id;
  }
  async participateInBet(userId: string, betId: string, viewPointId: string) {
    const betInfo = await BetModel.findOne({ _id: betId });
    const isPlayer = betInfo.player.some(play => {
      return play.customerId.equals(userId);
    });
    const isMaster = betInfo.initiator.equals(userId);
    if (isPlayer) {
      throw new BetError(103, '请求重复');
    }
    // return await BetModel.findOne({
    //   _id: betId,
    // });
    await BetModel.updateOne(
      {
        _id: betId,
      },
      {
        $push: {
          player: {
            date: new Date(),
            customerId: new ObjectId(userId),
            viewPointId: new ObjectId(viewPointId),
          },
        },
      },
    );
    if (isMaster) {
      return;
    }
    await RecordModel.create({
      userId,
      betId,
      viewPointId,
      type: 'player',
      date: new Date(),
    });
  }
  async findBetInfo(betId: string) {
    let result: any = await BetModel.aggregate([
      {
        $match: {
          _id: new ObjectId(betId),
        },
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'initiator',
          foreignField: '_id',
          as: 'initiator',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$$ROOT',
              { initiator: { $arrayElemAt: ['$initiator', 0] } },
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'viewPoint',
          localField: 'viewPoints',
          foreignField: '_id',
          as: 'viewPoints',
        },
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'player.customerId',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $project: {
          ...hideUsers('initiator'),
          ...hideUsers('users'),
        },
      },
    ]);
    if (!result.length) {
      throw new BetError(250, '没找到东西~');
    }
    result = result[0];
    const userMap = result.users.reduce((obj: any, item: ICustomer) => {
      obj[item._id] = item;
      return obj;
    }, {});
    result.player.forEach((play: any) => {
      play.user = userMap[play.customerId];
    });
    // delete result.users;
    return result;
  }
  async findUserAllBets(userId: string, page: number = 1, count: number = 20) {
    const skip = (page - 1) * count;
    const records = await RecordModel.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $sort: {
          createDate: -1,
        },
      },
      {
        $limit: Number(count),
      },
      {
        $skip: skip,
      },
      {
        $lookup: {
          from: 'bet',
          localField: 'betId',
          foreignField: '_id',
          as: 'bet',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$$ROOT', { $arrayElemAt: ['$bet', 0] }],
          },
        },
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'initiator',
          foreignField: '_id',
          as: 'initiator',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$$ROOT',
              { initiator: { $arrayElemAt: ['$initiator', 0] } },
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'viewPoint',
          localField: 'viewPoints',
          foreignField: '_id',
          as: 'viewPoints',
        },
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'player.customerId',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $project: {
          ...hideUsers('initiator'),
          ...hideUsers('users'),
          bet: 0,
          viewPoints: 0,
        },
      },
    ]);
    const result = records;
    return result;
  }
  async kingViewPoint(betId: string, viewPointId: string) {
    await BetModel.updateOne(
      { _id: betId },
      {
        winViewPoint: viewPointId,
        status: 0,
      },
    );
  }
}
