import { BetService } from './bet.service';
import { Controller, Post, Body, Query, Get, Param } from '@nestjs/common';
import { IBet } from '../../database/scheam/bet';

@Controller('bet')
export class BetController {
  constructor(private betService: BetService) {}
  @Post()
  async createBet(
    @Body('name') name: string,
    @Body('intro') intro: string,
    @Body('viewPoints') viewPoints: string[],
    @Body('level') level: number = 1,
    @Body('user') user: Bet.RequestInUser,
  ) {
    const bet: IBet = {
      name,
      intro,
      viewPoints,
      level,
      status: 1,
      date: new Date(),
      winViewPoint: null,
      initiator: user.id,
    };
    const id = await this.betService.createBet(bet);
    return id;
  }
  @Get()
  async getBets(
    @Body('user') user: Bet.RequestInUser,
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
  ) {
    const result = await this.betService.findUserAllBets(user.id, page, size);
    return result;
  }
  @Post('participate')
  async participateInBet(
    @Body('user') user: Bet.RequestInUser,
    @Body('id') id: string,
  ) {
    return await this.betService.participateInBet(user.id, id);
  }
  @Get(':id')
  async getBet(@Param('id') id: string) {
    const r = await this.betService.findBetInfo(id);
    return r;
  }
  @Post('win')
  async win(
    @Body('betId') betId: string,
    @Body('viewPointId') viewPointId: string,
  ) {
    await this.betService.kingViewPoint(betId, viewPointId);
    return '成功';
  }
}
