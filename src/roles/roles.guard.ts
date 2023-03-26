import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // const request = context.switchToHttp().getRequest();

    console.log(roles);

    // if (request?.user) {
    //   const { id } = request.user;
    //   const user = await this.userService.getUserById(id);
    //   return roles.includes(user.role);
    // }

    return false;
  }
}
