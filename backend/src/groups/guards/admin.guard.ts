import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminGuard extends JwtAuthGuard {
  constructor(
    protected readonly reflector: Reflector,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = context.switchToHttp().getRequest().params;

    const group = await this.groupRepository.findOne({
      where: {
        id: params.id,
      },
      relations: ['admin_list'],
    });

    return (
      (await super.canActivate(context)) &&
      group &&
      (group.owner.id === request.user.id ||
        group.admin_list.some((user) => user.id === request.user.id))
    );
  }
}
