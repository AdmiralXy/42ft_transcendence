import { Injectable } from '@nestjs/common';
import { CreateToodDto } from './dto/create-tood.dto';
import { UpdateToodDto } from './dto/update-tood.dto';

@Injectable()
export class ToodsService {
  create(createToodDto: CreateToodDto) {
    return 'This action adds a new tood';
  }

  findAll() {
    return `This action returns all toods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tood`;
  }

  update(id: number, updateToodDto: UpdateToodDto) {
    return `This action updates a #${id} tood`;
  }

  remove(id: number) {
    return `This action removes a #${id} tood`;
  }
}
