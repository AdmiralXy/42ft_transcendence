import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToodsService } from './toods.service';
import { CreateToodDto } from './dto/create-tood.dto';
import { UpdateToodDto } from './dto/update-tood.dto';

@Controller('toods')
export class ToodsController {
  constructor(private readonly toodsService: ToodsService) {}

  @Post()
  create(@Body() createToodDto: CreateToodDto) {
    return this.toodsService.create(createToodDto);
  }

  @Get()
  findAll() {
    return this.toodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToodDto: UpdateToodDto) {
    return this.toodsService.update(+id, updateToodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toodsService.remove(+id);
  }
}
