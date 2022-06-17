import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('You can only update your own profile.');
    }
    return this.userService.update(+id, updateUserDto);
  }

  // @Patch(':id/addFriend/:friendId')
  // addFriend(
  //   @Request() req,
  //   @Param('id') id: number,
  //   @Param('friendId') friendId: number,
  // ) {
  //   if (req.user.id !== +id) {
  //     throw new UnauthorizedException('You can only update your own profile.');
  //   }
  //   return this.userService.addFriend(+id, +friendId);
  // }
  //
}
