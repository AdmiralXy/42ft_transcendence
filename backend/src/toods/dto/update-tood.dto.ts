import { PartialType } from '@nestjs/swagger';
import { CreateToodDto } from './create-tood.dto';

export class UpdateToodDto extends PartialType(CreateToodDto) {}
